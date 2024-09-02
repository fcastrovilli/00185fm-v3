import { queryTags } from '@/app/query'
import Badge from '../../Badge'
import { ScrollArea } from '../../ui/scroll-area'

export default async function Tags() {
  const tags = await queryTags()
  return (
    <ScrollArea>
      <div className="pt-2 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag.id} text={tag.name} size="xs" />
        ))}
      </div>
    </ScrollArea>
  )
}
