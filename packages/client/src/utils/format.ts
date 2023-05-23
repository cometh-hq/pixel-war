export function trunc(address: string | null | undefined) {
  return address ? address.slice(0, 8) + "..." + address.slice(-6) : null;
}
