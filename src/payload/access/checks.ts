import type { Access, FieldAccess } from 'payload'

export const isAdmin: Access<any> = ({ req: { user } }) => {
  if (!user) return false
  return Boolean(user.roles.includes('admin'))
}

export const isAdminField: FieldAccess<any> = ({ req: { user } }) => {
  if (!user) return false
  return Boolean(user.roles.includes('admin'))
}

export const isAdminOrEditor: Access<any> = ({ req: { user } }) => {
  if (!user) return false
  if (user.roles.includes('admin')) return true
  return Boolean(user.roles.includes('editor'))
}

export const isAdminOrEditorField: FieldAccess<any> = ({ req: { user } }) => {
  if (!user) return false
  if (user.roles.includes('admin')) return true
  return Boolean(user.roles.includes('editor'))
}

export const isAdminOrSelf: Access<any> = ({ req: { user } }) => {
  if (!user) return false
  if (user.roles.includes('admin')) return true
  return {
    id: {
      equals: user.id,
    },
  }
}

export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user?.roles.includes('admin')) return true
  if (user?.roles.includes('editor')) return true

  return {
    _status: {
      equals: 'published',
    },
  }
}
