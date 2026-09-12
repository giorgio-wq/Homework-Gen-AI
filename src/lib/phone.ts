/**
 * Telephone check shared by the contact form and the server that receives it.
 *
 * The field is optional, so an empty value is accepted; anything else must
 * look like a real number. Formatting is left free (spaces, dots, dashes,
 * slashes, brackets and a leading +, as people actually write numbers — an
 * Italian landline is often written 080/3141746) but the digits are counted:
 * 8 covers the shortest Italian landlines, 15 is the maximum length of an
 * international number.
 */
export function isValidPhone(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return true;
  if (!/^\+?[\d\s()./-]+$/.test(trimmed)) return false;

  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}
