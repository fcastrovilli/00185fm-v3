import type { Field } from 'payload'

import deepMerge from '../utils/deepMerge'
import formatSlug from '../utils/formatSlug'

type Slug = (fieldToUse?: string, overrides?: Partial<Field>) => Field

export const slugField: Slug = (fieldToUse = 'title', overrides = {}) =>
  deepMerge<Field, Partial<Field>>(
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: `Leave blank to generate automatically from the ${fieldToUse} field.`,
      },
      hooks: {
        beforeValidate: [formatSlug(fieldToUse)],
      },
      index: true,
      label: 'Slug',
      required: true,
    },
    overrides,
  )
