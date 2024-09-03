import { queryTags } from '@/app/query'
import Badge from '../../Badge'
import { ScrollArea, ScrollBar } from '../../ui/scroll-area'

export default async function Tags() {
  const tags = await queryTags()
  return (
    <ScrollArea className="h-fit max-w-prose">
      <div className="flex flex-wrap gap-2 pt-2">
        {tags.map((tag) => (
          <Badge key={tag.id} text={tag.name} size="xs" />
        ))}
      </div>
    </ScrollArea>
  )
}
