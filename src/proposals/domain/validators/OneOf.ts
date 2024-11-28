export function OneOf<T>(value: T, validValues: T[], errorMessage: string): T {
  validValues.map((validValue) => {
    if (typeof validValue !== typeof value) {
      throw new Error(`${value} not the same type as ${validValue}`);
    }
  });

  if (!validValues.includes(value)) {
    throw new Error(
      `${errorMessage}: ${value} not in ${validValues.toString()}`,
    );
  }

  return value;
}
