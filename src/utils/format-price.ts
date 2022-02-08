export function formatPrice(value: number, currencyCode: string): string {
  const formatter = Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencyCode,
  })
  return formatter.format(value / 100)
}
