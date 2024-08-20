import type { FieldHook } from 'payload'

const format = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

const formatSlug =
  (fallback: string): FieldHook =>
  ({ data, originalDoc, value }) => {
    if (typeof value === 'string' && value.length > 0) {
      if (data?.[fallback] !== originalDoc?.[fallback] && value === originalDoc?.slug) {
        return format(data?.[fallback])
      } else {
        return format(value)
      }
    } else {
      const fallbackData = data?.[fallback] || originalDoc?.[fallback]

      if (fallbackData && typeof fallbackData === 'string') {
        return format(fallbackData)
      }
    }

    return value
  }

export default formatSlug
