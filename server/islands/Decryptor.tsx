import { useState, useEffect, useMemo, useCallback, StateUpdater } from 'preact/hooks';
import { isClient } from "../utils/isClient.ts";
import { generateCryptoKeyFromPassword } from "../utils/generateCryptoKeyFromPassword.ts";
import { decrypt_buffer } from "../utils/decrypt_buffer.ts";
import { fetchFile } from '../utils/fetchFile.ts';
import { useClient } from '../utils/client.ts';

import Canvas from './Canvas.tsx';

interface DecryptorProps {
  fileId: string;
}

export default function Decryptor(props: DecryptorProps) {
  const [decryptedData, setDecryptedData] = useState<Uint8Array | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Use useMemo for the password state
  const password = useMemo(() => getPasswordFromUrl(), []);

  const [encryptedData, setEncryptedData] = useState<Uint8Array | null>(null);
  const [client] = useClient();

  // Additional States
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Memoize the decryptProcedure function using useCallback
  const memoizedDecryptProcedure = useCallback(
    async (data: Uint8Array, password: string, fileId: string) => {
      try {
        const cryptoKey = await generateCryptoKeyFromPassword(password, fileId);
        const decrypted = await decrypt_buffer(data, cryptoKey);
        setDecryptedData(decrypted);
      } catch (error) {
        throw error;
      }
    },
    []
  );

  useEffect(() => {
    if (!client || !props.fileId) return;

    setIsLoading(true);

    (async () => {
      try {
        const data = await fetchFile(props.fileId);
        setEncryptedData(data);
      } catch (error) {
        console.error(error);
        setIsError(true);
        setError(`Error fetching file ${props.fileId}: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [client, props.fileId]);

  useEffect(() => {
    if (!encryptedData || !password) return;

    setIsLoading(true);
    setIsError(false);

    memoizedDecryptProcedure(encryptedData, password, props.fileId)
      .catch((error) => {
        console.error(error);
        setIsError(true);
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [encryptedData, password, props.fileId, memoizedDecryptProcedure]);

  return (
    <div>
      Decryptor {props.fileId}
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error}</p>}
      {decryptedData && <Canvas videoData={decryptedData}></Canvas>}
    </div>
  );
}

const getPasswordFromUrl = (): string => (isClient() ? decodeURIComponent(self.location.hash.substring(1)) : '');
