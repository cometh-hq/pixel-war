export function trunc(address: string | null | undefined) {
  return address ? address.slice(0, 12) + "..." + address.slice(-10) : null;
}
