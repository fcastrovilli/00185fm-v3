import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrSelf, isAdminField } from '../access/checks'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    depth: 0,
  },
  access: {
    read: isAdminOrSelf,
    create: isAdmin,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'email',
    description: 'Manage all the users.',
  },
  fields: [
    {
      name: 'roles',
      required: true,
      access: {
        create: isAdminField,
        update: isAdminField,
      },
      saveToJWT: true,
      type: 'select',
      hasMany: true,
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
      ],
      defaultValue: ['editor'],
    },
  ],
}
