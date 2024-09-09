import { OptionObject } from 'payload'
import octokit from './github'

const owner = process.env.GITHUB_ACCOUNT!
const repo = process.env.GITHUB_REPO!

export const createIssue = async (title: string, body: string, label: string) => {
  try {
    const response = await octokit.issues.create({
      owner,
      repo,
      title,
      body,
      labels: [label],
    })
    return response.data
  } catch (error) {
    console.error('Error creating issue:', error)
    throw error
  }
}

export const getLabels = async () => {
  try {
    const labels = await octokit.issues.listLabelsForRepo({ owner, repo })

    const parsedLabels: OptionObject[] = labels.data.map((label) => ({
      label: label.name,
      value: label.name,
    }))
    return parsedLabels
  } catch (e) {
    console.error(e)
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
