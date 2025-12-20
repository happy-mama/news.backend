import {
  validateNumberValues,
  validateStringValues,
  validateType,
} from "./validators.js";

interface ENVList {
  nodeEnv: "production" | "dev";
  port: number;

  PRISMA_POSTGRESS_URL: string;

  MINIO_URL: string;
  MINIO_CREDENTIAL_KEY_ID: string;
  MINIO_CREDENTIAL_ACCESS_KEY: string;
}

class ENV {
  private store!: ENVList;

  constructor() {
    this.init();
  }

  private validationError(fieldName: string, reason: string) {
    console.error("ENV VALIDATION ERROR:", fieldName, reason);
    process.exit(1);
  }

  private init() {
    this.store = {
      nodeEnv: validateStringValues({
        allowed: ["production", "dev"] as const,
        value: process.env.nodeEnv,
        fieldName: "nodeEnv",
        onError: this.validationError,
      }),

      port: validateType({
        type: "number",
        value: Number(process.env.port),
        fieldName: "port",
        onError: this.validationError,
      }),

      PRISMA_POSTGRESS_URL: validateType({
        type: "string",
        value: process.env.PRISMA_POSTGRESS_URL,
        fieldName: "PRISMA_POSTGRESS_URL",
        onError: this.validationError,
      }),

      MINIO_URL: validateType({
        type: "string",
        value: process.env.MINIO_URL,
        fieldName: "MINIO_URL",
        onError: this.validationError,
      }),

      MINIO_CREDENTIAL_ACCESS_KEY: validateType({
        type: "string",
        value: process.env.MINIO_CREDENTIAL_ACCESS_KEY,
        fieldName: "MINIO_CREDENTIAL_ACCESS_KEY",
        onError: this.validationError,
      }),

      MINIO_CREDENTIAL_KEY_ID: validateType({
        type: "string",
        value: process.env.MINIO_CREDENTIAL_KEY_ID,
        fieldName: "MINIO_CREDENTIAL_KEY_ID",
        onError: this.validationError,
      }),
    };
  }

  get<T extends keyof typeof this.store>(fieldName: T) {
    return this.store[fieldName] as (typeof this.store)[T];
  }
}

const env = new ENV();

export default env;
