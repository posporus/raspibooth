import { createStore, type StoreVariantTypes } from "./storage/createStore.ts";

export const file_store = createStore<string, Uint8Array>(Deno.env.get("FILE_STORAGE") as StoreVariantTypes, 'filestorage');
export const subscription_store = createStore<string, string>(Deno.env.get("SUBSCRIPTION_STORAGE") as StoreVariantTypes, 'subscriptionstorage');
