export function formatPrice(
  value: number,
  currencyCode: string,
  locale?: string
): string {
  const formatter = Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  })
  return formatter.format(value / 100)
}
