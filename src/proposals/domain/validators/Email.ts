export function Email(email: string, error: string) {
  function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  if (!isValidEmail(email)) {
    throw new Error(`${error} - ${email} has not a valid format`);
  }

  return email;
}
