// lib/githubIssues.ts
import octokit from './github'

const owner = process.env.GITHUB_ACCOUNT!
const repo = process.env.GITHUB_REPO!

export const createIssue = async (title: string, body: string) => {
  try {
    const response = await octokit.issues.create({
      owner,
      repo,
      title,
      body,
    })
    return response.data
  } catch (error) {
    console.error('Error creating issue:', error)
    throw error
  }
}

export const getIssues = async () => {
  try {
    const response = await octokit.issues.listForRepo({
      owner,
      repo,
    })
    return response.data
  } catch (error) {
    console.error('Error fetching issues:', error)
    throw error
  }
}

export const updateIssue = async (issueNumber: number, title?: string, body?: string) => {
  try {
    const response = await octokit.issues.update({
      owner,
      repo,
      issue_number: issueNumber,
      title,
      body,
    })
    return response.data
  } catch (error) {
    console.error('Error updating issue:', error)
    throw error
  }
}

export const deleteIssue = async (issueNumber: number) => {
  try {
    const response = await octokit.issues.update({
      owner,
      repo,
      issue_number: issueNumber,
      state: 'closed',
    })
    return response.data
  } catch (error) {
    console.error('Error deleting (closing) issue:', error)
    throw error
  }
}
