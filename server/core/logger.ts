import * as log from "https://deno.land/std@0.200.0/log/mod.ts";

// Set up the logger configuration
await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler("DEBUG"),
  },
  loggers: {
    default: {
      level: "DEBUG",
      handlers: ["console"],
    },
  },
});

// Export the logger for use in other modules
export const logger: log.Logger = log.getLogger();