'use server'

import { createIssue } from './actions'

export async function submitIssue(formData: FormData) {
  const title = formData.get('title') as string
  const body = formData.get('body') as string
  const label = formData.get('gitlabel') as string
  if (title && body && label) {
    const issue = await createIssue(title, body, label)
    return issue
  } else {
    return 'Please provide a title and a body for your issue.'
  }
}
