import { encode, decode } from "https://deno.land/std@0.114.0/encoding/base64.ts";
import { assertEquals } from "https://deno.land/std@0.114.0/testing/asserts.ts"


const test_string = 'PfCpTw43mBlcQ1zW'
Deno.test('test base64 decoding 1',()=>{
    const decodedKeyData = base64ToUint8Array(test_string);
    const reEncodedKeyData = btoa(String.fromCharCode(...new Uint8Array(decodedKeyData)));
    //reEncodedKeyData = reEncodedKeyData.replace(/=+$/, "");
    assertEquals(reEncodedKeyData, test_string)
  })
  
  Deno.test('test base64 decoding 2',()=>{
    const decodedString = atob(test_string);
    const reEncodedString = btoa(decodedString);
    assertEquals(reEncodedString, test_string)
  })
  Deno.test('test base64 decoding 3',()=>{
    const decodedData = decode(test_string);
    const reEncodedData = encode(decodedData);
    assertEquals(reEncodedData, test_string)
  })

  function base64ToUint8Array (base64String: string) {
    const binaryString = atob(base64String)
    const length = binaryString.length
    const uint8Array = new Uint8Array(length)
    for (let i = 0; i < length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i)
    }
    return uint8Array
  }
  