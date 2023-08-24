type ConfigValueType = string | number | boolean

type ConfigSchemaEntry<T extends ConfigValueType> = {
    defaultValue?: T
    type: T extends string ? "string" : T extends number ? "number" : "boolean"
    options?: readonly T[]
}

type ConfigSchemaType = {
    [key: string]: ConfigSchemaEntry<ConfigValueType>
}

export function defineSchema<T extends ConfigSchemaType> (schema: T): T {
    return schema
}

type Environment = {
    get: (key: string) => string | undefined
}

export function loadConfig<S extends ConfigSchemaType> (env: Environment, configSchema: S) {

    type ConfigType = {
        [K in keyof typeof configSchema]:
        typeof configSchema[K]['type'] extends 'string' ? string :
        typeof configSchema[K]['type'] extends 'number' ? number :
        typeof configSchema[K]['type'] extends 'boolean' ? boolean :
        never
    }

    function castValue<T extends ConfigValueType> (key: keyof ConfigType, schemaEntry: S[keyof ConfigType]): T {
        
        if (typeof key !== 'string') {
            throw new Error(`Expected key to be a string, but got ${typeof key}`);
        }

        const envValue = env.get(key.toUpperCase() as string)

        if (envValue === undefined) return schemaEntry.defaultValue as T

        switch (schemaEntry.type) {
            case "number":
                return Number(envValue) as T
            case "boolean":
                return (envValue.toLowerCase() === "true") as unknown as T
            case "string":
                if (schemaEntry.options && !schemaEntry.options.includes(envValue as ConfigValueType)) {
                    throw new Error(`Invalid value for ${key}. Allowed values are: ${schemaEntry.options.join(", ")}`)
                }
                return envValue as T
            default:
                throw new Error(`Unexpected type for ${key}`)
        }
    }

    const config: ConfigType = {} as ConfigType
    for (const key in configSchema) {
        config[key as keyof ConfigType] = castValue(key as keyof ConfigType, configSchema[key as keyof ConfigType])
    }

    return config as ConfigType
}

