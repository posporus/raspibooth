import { createStore, type StoreVariantTypes } from "./storage/createStore.ts";
import { _config } from "./core/config.ts";

const config = _config()

export const file_store = createStore<string, Uint8Array>(config.file_storage as StoreVariantTypes, 'filestorage');
export const subscription_store = createStore<string, string>(config.subscription_storage as StoreVariantTypes, 'subscriptionstorage');
