type ConfigValueType = string | number | boolean;

type ConfigSchemaEntry<T extends ConfigValueType> = {
    defaultValue?: T;
    type: T extends string ? "string" : T extends number ? "number" : "boolean";
    options?: readonly T[];
};

type ConfigSchemaType = {
    [key: string]: ConfigSchemaEntry<ConfigValueType>;
};

export function defineSchema<T extends ConfigSchemaType>(schema: T): T {
    return schema;
}

type Environment = {
    get: (key: string) => string | undefined;
};

export function loadConfig<S extends ConfigSchemaType>(env: Environment, configSchema: S) {
    type ConfigType = {
        [K in keyof S]: S[K]['defaultValue'] extends undefined
            ? (S[K]['type'] extends 'string' ? string | undefined :
               S[K]['type'] extends 'number' ? number | undefined :
               S[K]['type'] extends 'boolean' ? boolean | undefined :
               never)
            : (S[K]['type'] extends 'string' ? string :
               S[K]['type'] extends 'number' ? number :
               S[K]['type'] extends 'boolean' ? boolean :
               never);
    };

    function castValue<K extends keyof ConfigType>(key: K, schemaEntry: S[K]): ConfigType[K] {

        if (typeof key !== 'string') {
            throw new Error(`Expected key to be a string, but got ${typeof key}`);
        }
        
        const envValue = env.get(key.toUpperCase());

        if (envValue === undefined) return schemaEntry.defaultValue as ConfigType[K];

        switch (schemaEntry.type) {
            case "number":
                return Number(envValue) as ConfigType[K];
            case "boolean":
                return (envValue.toLowerCase() === "true") as unknown as ConfigType[K];
            case "string":
                if (schemaEntry.options && !schemaEntry.options.includes(envValue as ConfigValueType)) {
                    throw new Error(`Invalid value for ${key}. Allowed values are: ${schemaEntry.options.join(", ")}`);
                }
                return envValue as ConfigType[K];
            default:
                throw new Error(`Unexpected type for ${key}`);
        }
    }

    const config: ConfigType = {} as ConfigType;
    for (const key in configSchema) {
        config[key as keyof ConfigType] = castValue(key as keyof ConfigType, configSchema[key as keyof ConfigType]);
    }

    return config;
}
