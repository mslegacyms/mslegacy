export function text(value: unknown, max = 200): string {
  if (typeof value !== "string" || value.length > max) throw new Error("Please check the length of your entries.");
  return value.trim();
}
export function validateContact(input: { name: unknown; phone: unknown; email: unknown }) {
  const name = text(input.name, 150), phone = text(input.phone, 30), email = text(input.email, 254).toLowerCase();
  if (name.length < 2 || !/^[+()\d\s.-]{8,30}$/.test(phone) || phone.replace(/\D/g, "").length < 8 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Enter your name, a valid phone number and email address.");
  }
  return { name, phone, email };
}
export function code(value: unknown): string {
  const result = text(value, 80);
  if (result && !/^[a-z0-9_-]+$/.test(result)) throw new Error("Please choose a valid option.");
  return result;
}
export function isUuid(value: unknown): value is string {
  return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
