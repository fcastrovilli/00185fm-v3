import React from 'react'
import GitHubIssues from '../Github/all_issues'

const AfterDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2>GitHub Issues</h2>
        <p>Here you can track known issues. Please report any bug you find 🪳</p>
      </div>
      <GitHubIssues />
    </div>
  )
}

export default AfterDashboard
