export function NotEmptyString(value: string, error: string): string {
  if (!value) {
    throw new Error(error);
  }
  return value;
}
