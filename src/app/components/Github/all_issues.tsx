import { getIssues } from './issues'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import Markdown from 'markdown-to-jsx'

async function GitHubIssues() {
  const issues = await getIssues()
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {issues.map((issue) => (
        <Card
          key={issue.number}
          className="rounded-[var(--style-radius-m)] bg-[var(--theme-elevation-50)] outline outline-1 outline-[var(--theme-border-color)]"
        >
          <CardHeader>
            <CardTitle>{issue.title}</CardTitle>
            <CardDescription className="flex flex-row gap-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={issue.user?.avatar_url}
                alt={`${issue.user?.login} avatar`}
                width={15}
                height={15}
                className="rounded-full"
              />
              <span className="text-sm text-gray-500">{issue.user?.login}</span>
              {' • '}
              {issue.state === 'open' ? 'Open ✅' : 'Closed 🎯'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Markdown>{issue.body as string}</Markdown>
          </CardContent>
          <CardFooter>
            <a
              href={`https://github.com/${process.env.GITHUB_ACCOUNT}/${process.env.GITHUB_REPO}/issues/${issue.number}`}
              target="_blank"
              rel="noreferrer"
              className="flex flex-row items-center gap-1"
            >
              <GitHubLogoIcon />
              View on GitHub
            </a>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default GitHubIssues
