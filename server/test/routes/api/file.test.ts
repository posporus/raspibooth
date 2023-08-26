import { createHandler, ServeHandlerInfo } from "$fresh/server.ts";
import manifest from "../../../fresh.gen.ts";
import { assertEquals } from "$std/testing/asserts.ts";
import { _config } from "../../../core/config.ts";
import { calculateChecksum } from "../../../utils/calculateChecksum.ts";

const my_apikey = "mySuperN1c3EnvTest4uThk3y"
Deno.env.set('AUTHKEY',my_apikey)

const config = _config()

if(!config.authkey) {
  throw Error('no AUTHKEY in .env')
}

const CONN_INFO: ServeHandlerInfo = {
  remoteAddr: { hostname: "localhost", port: 53496, transport: "tcp" },
};

Deno.test("File upload route test.", async (t) => {
    const testHandler = await createHandler(manifest);

    // POST with valid API key and fileId
    await t.step("POST with valid API key and fileId", async () => {
      const testData = new Uint8Array([1, 2, 3, 4, 5]);
      const checksum = await calculateChecksum(testData);
      const req = new Request("http://localhost/api/file", {
        method: "POST",
        headers: {
          "X-API-Key": my_apikey,
          "X-File-Id": "testFileId",
          "X-Checksum": checksum
        },
        body: testData
      });
      const resp = await testHandler(req, CONN_INFO);
      assertEquals(resp.status, 200);
    });
  
    // POST with invalid API key
    await t.step("POST with invalid API key", async () => {
      const testData = new Uint8Array([1, 2, 3, 4, 5]);
      const checksum = await calculateChecksum(testData);
      const req = new Request("http://localhost/api/file", {
        method: "POST",
        headers: {
          "X-API-Key": 'invalid_key',
          "X-File-Id": "testFileId",
          "X-Checksum": checksum
        },
        body: testData
      });
      const resp = await testHandler(req, CONN_INFO);
      assertEquals(resp.status, 403);
    });
  
    // POST without fileId
    await t.step("POST without fileId", async () => {
      const testData = new Uint8Array([1, 2, 3, 4, 5]);
      const checksum = await calculateChecksum(testData);
      const req = new Request("http://localhost/api/file", {
        method: "POST",
        headers: {
          "X-API-Key": my_apikey,
          "X-Checksum": checksum
        },
        body: testData
      });
      const resp = await testHandler(req, CONN_INFO);
      assertEquals(resp.status, 400);
    });
  
    // POST with a valid API key but without data
    await t.step("POST with valid API key but without data", async () => {
      const req = new Request("http://localhost/api/file", {
        method: "POST",
        headers: {
          "X-API-Key": my_apikey,
          "X-File-Id": "testFileId"
        }
      });
      const resp = await testHandler(req, CONN_INFO);
      assertEquals(resp.status, 400);
    });
  
});

Deno.test("File upload route - Valid File Format", async (t) => {
    const testHandler = await createHandler(manifest);

    // Valid file ID
    await t.step("POST with valid file ID format", async () => {
      const testData = new Uint8Array([1, 2, 3]);
      const checksum = await calculateChecksum(testData);
      const fileId = "Valid57890"; // Assuming this matches the config.file_id_length
      const req = new Request("http://localhost/api/file", {
        method: "POST",
        headers: {
          "X-API-Key": my_apikey,
          "X-File-Id": fileId,
          "X-Checksum": checksum
        },
        body: testData
      });
      const resp = await testHandler(req, CONN_INFO);
      assertEquals(resp.status, 200);
    });

    // Invalid file ID
    await t.step("POST with invalid file ID format", async () => {
      const testData = new Uint8Array([1, 2, 3]);
      const checksum = await calculateChecksum(testData);
      const fileId = "Invalid*FileID";
      const req = new Request("http://localhost/api/file", {
        method: "POST",
        headers: {
          "X-API-Key": my_apikey,
          "X-File-Id": fileId,
          "X-Checksum": checksum
        },
        body: testData
      });
      const resp = await testHandler(req, CONN_INFO);
      assertEquals(resp.status, 400);
    });
});

Deno.test("File upload route - File Size Limit", async (t) => {
    const testHandler = await createHandler(manifest);

    // File within allowed size
    await t.step("POST with file within allowed size", async () => {
      const testData = new Uint8Array(config.max_file_upload_size);
      const checksum = await calculateChecksum(testData);
      const fileId = "testFileId";
      const req = new Request("http://localhost/api/file", {
        method: "POST",
        headers: {
          "X-API-Key": my_apikey,
          "X-File-Id": fileId,
          "X-Checksum": checksum
        },
        body: testData
      });
      const resp = await testHandler(req, CONN_INFO);
      assertEquals(resp.status, 200);
    });

    // File exceeding allowed size
    await t.step("POST with file exceeding allowed size", async () => {
      const testData = new Uint8Array(config.max_file_upload_size + 1);
      const checksum = await calculateChecksum(testData);
      const fileId = "TestFile45";
      const req = new Request("http://localhost/api/file", {
        method: "POST",
        headers: {
          "X-API-Key": my_apikey,
          "X-File-Id": fileId,
          "X-Checksum": checksum
        },
        body: testData
      });
      const resp = await testHandler(req, CONN_INFO);
      assertEquals(resp.status, 413);
    });
});

Deno.test("File upload route - Checksum Verification", async (t) => {
  const testHandler = await createHandler(manifest);

  // Valid Checksum
  await t.step("POST with valid checksum", async () => {
    const testData = new Uint8Array([1, 2, 3, 4, 5]);
    const checksum = await calculateChecksum(testData);
    const req = new Request("http://localhost/api/file", {
      method: "POST",
      headers: {
        "X-API-Key": my_apikey,
        "X-File-Id": "testFileId",
        "X-Checksum": checksum
      },
      body: testData
    });
    const resp = await testHandler(req, CONN_INFO);
    assertEquals(resp.status, 200);
  });

  // Invalid Checksum
  await t.step("POST with invalid checksum", async () => {
    const testData = new Uint8Array([1, 2, 3, 4, 5]);
    const invalidChecksum = "invalidchecksum123456"; // Intentionally incorrect
    const req = new Request("http://localhost/api/file", {
      method: "POST",
      headers: {
        "X-API-Key": my_apikey,
        "X-File-Id": "testFileId",
        "X-Checksum": invalidChecksum
      },
      body: testData
    });
    const resp = await testHandler(req, CONN_INFO);
    assertEquals(resp.status, 422);
  });

  // Missing Checksum
  await t.step("POST without checksum", async () => {
    const testData = new Uint8Array([1, 2, 3, 4, 5]);
    const req = new Request("http://localhost/api/file", {
      method: "POST",
      headers: {
        "X-API-Key": my_apikey,
        "X-File-Id": "testFileId"
      },
      body: testData
    });
    const resp = await testHandler(req, CONN_INFO);
    assertEquals(resp.status, 422);
  });
});
