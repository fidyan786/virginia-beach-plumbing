/** US-style phone: 10 digits, or 11 starting with 1. */
export function phoneDigits(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) return digits.slice(1);
  return digits;
}

export function isValidPhone(value: string): boolean {
  return phoneDigits(value).length === 10;
}

export function formatPhone(value: string): string {
  const d = phoneDigits(value);
  if (d.length !== 10) return value.trim();
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export function isNonEmptyName(value: string): boolean {
  const name = value.replace(/\s+/g, ' ').trim();
  if (name.length < 2) return false;
  if (!/[a-zA-Z]/.test(name)) return false;
  return name.length <= 80;
}

export function isNonEmptyText(value: string, min = 3): boolean {
  return value.replace(/\s+/g, ' ').trim().length >= min;
}

export function isValidZip(value: string): boolean {
  return /^\d{5}$/.test(value.replace(/\s+/g, '').trim());
}

/** Public USPS/city ZIPs commonly associated with Virginia Beach, VA. Not a coverage guarantee. */
const VIRGINIA_BEACH_ZIPS = new Set([
  '23450',
  '23451',
  '23452',
  '23453',
  '23454',
  '23455',
  '23456',
  '23457',
  '23459',
  '23460',
  '23461',
  '23462',
  '23464',
  '23465',
  '23466',
  '23467',
  '23471',
  '23479',
]);

export function looksLikeVirginiaBeachZip(value: string): boolean {
  return VIRGINIA_BEACH_ZIPS.has(value.replace(/\D/g, ''));
}
