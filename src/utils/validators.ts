export function validateStringValues<T extends readonly string[]>({
  allowed,
  value,
  isMultiple = false,
  fieldName,
  onError = () => {},
}: {
  allowed: T;
  value: string | undefined;
  isMultiple?: boolean;
  fieldName?: string;
  onError?: (fieldName: string, reason: string) => void;
}) {
  if (!value) {
    onError(fieldName || "NOT_PROVIDED", "value is not provided");
    return "" as T[number];
  }

  if (typeof value != "string") {
    onError(fieldName || "NOT_PROVIDED", "value is not string");
    return "" as T[number];
  }

  if (isMultiple) {
    const result = value
      .split(",")
      .filter((v) => !allowed.includes(v))
      .join(",");

    if (!result) {
      onError(fieldName || "NOT_PROVIDED", "value is not allowed");
      return "" as T[number];
    } else {
      return result as T[number];
    }
  } else {
    if (allowed.includes(value)) {
      return value as T[number];
    } else {
      onError(fieldName || "NOT_PROVIDED", "value is not allowed");
      return "" as T[number];
    }
  }
}

export function validateNumberValues<T extends number[]>({
  allowed,
  value,
  fieldName,
  onError = () => {},
}: {
  allowed: T;
  value: number | undefined;
  fieldName?: string;
  onError?: (fieldName: string, reason: string) => void;
}) {
  if (typeof value != "number") {
    onError(fieldName || "NOT_PROVIDED", "value is not number");
    return 0;
  }

  if (isNaN(value)) {
    onError(fieldName || "NOT_PROVIDED", "value is NaN");
    return 0;
  }

  if (allowed.includes(value)) {
    return value;
  } else {
    onError(fieldName || "NOT_PROVIDED", "value is not allowed");
    return 0;
  }
}

export function validateType({
  type,
  value,
  fieldName,
  onError = () => {},
}: {
  type:
    | "string"
    | "number"
    | "bigint"
    | "boolean"
    | "symbol"
    | "undefined"
    | "object"
    | "function";
  value: any;
  fieldName?: string;
  onError?: (fieldName: string, reason: string) => void;
}) {
  if (typeof value != type) {
    onError(
      fieldName || "NOT_PROVIDED",
      `typeof value is not '${typeof value}'`,
    );
    return undefined;
  }

  return value;
}
