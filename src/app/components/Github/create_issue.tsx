'use client'

import { TextInput, TextareaInput, Button, Collapsible, toast, SelectInput } from '@payloadcms/ui'
import { submitIssue } from './form'
import { ChangeEvent, useRef, useState } from 'react'
import Markdown from 'markdown-to-jsx'
import { useRouter } from 'next/navigation'
import { OptionObject } from 'payload'

type Props = {
  labels: OptionObject[] | undefined
}

function GitHubCreateIssue({ labels }: Props) {
  const bug = labels?.find((label) => label.label === 'bug') || { label: '', value: '' }
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [collapse, setCollapse] = useState(true)
  const [labelValue, setLabelValue] = useState<OptionObject>({ label: bug.label, value: bug.value })

  const form = useRef<HTMLFormElement>(null)

  return (
    <div>
      <Collapsible
        onToggle={() => setCollapse(!collapse)}
        isCollapsed={collapse}
        header={'🐛 Report Bug 👾'}
        initCollapsed={true}
      >
        <form
          ref={form}
          action={async (formData) => {
            toast.loading('Creating issue...')
            const res = await submitIssue(formData)
            toast.dismiss()
            if (typeof res === 'string') {
              toast.error(res)
            } else {
              toast.success(`Issue #${res.number} created! 🎉`)
              setCollapse(true)
              setLabelValue({ label: bug.label, value: bug.value })
              setTitle('')
              setBody('')
              router.refresh()
            }
          }}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <TextInput
                label={'Title'}
                path="title"
                placeholder={'Provide a descriptive but concise title for your issue.'}
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              />
              <TextareaInput
                label={'Content'}
                className="prose prose-sm max-w-none"
                path="body"
                value={body}
                placeholder="Provide as much detail as possible. You can use Markdown syntax and preview the result here on the right. If you need more functionality, please visit the GitHub repository and create an issue there."
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)}
              />
              <SelectInput
                options={labels}
                label={'Tag'}
                value={labelValue.value}
                name="git_label"
                path="git_label"
                hasMany={false}
                onChange={(e) => setLabelValue(e as OptionObject)}
              />
              <input
                type="text"
                hidden
                name="gitlabel"
                value={labelValue.value}
                onChange={(e) => {
                  setLabelValue({ label: e.target.value, value: e.target.value })
                }}
              />
            </div>
            <div>
              <h5 className="pb-3">Preview 👀</h5>
              <div className="prose prose-sm min-h-[100px] max-w-none rounded-[var(--style-radius-m)] bg-[var(--theme-elevation-50)] outline outline-1 outline-[var(--theme-border-color)]">
                <Markdown>{body}</Markdown>
              </div>
            </div>
          </div>
          <Button type="submit">Submit Issue</Button>
        </form>
      </Collapsible>
    </div>
  )
}

export default GitHubCreateIssue
