import { Octokit } from '@octokit/rest'

// Initialize Octokit with your personal access token
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN, // You can use environment variables for security
})

export default octokit
