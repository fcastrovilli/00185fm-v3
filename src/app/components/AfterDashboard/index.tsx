import React from 'react'
import GitHubReadIssues from '../Github/read_issues'
import GitHubCreateIssue from '../Github/create_issue'
import { getLabels } from '../Github/actions'

const AfterDashboard: React.FC = async () => {
  const labels = await getLabels()
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2>GitHub Issues</h2>
        <p>Here you can track known issues. Please report any bug you find 🪳</p>
      </div>
      <GitHubCreateIssue labels={labels} />
      <GitHubReadIssues />
    </div>
  )
}

export default AfterDashboard
