import { queryTags } from '@/app/query'
import Badge from '../../Badge'
import { ScrollArea } from '../../ui/scroll-area'
import { Tag } from '@/payload-types'

type Props = {
  all_tags: Tag[]
}

export default async function Tags({ all_tags }: Props) {
  return (
    <ScrollArea>
      <div className="flex flex-wrap gap-2 pt-2">
        {all_tags.map((tag) => (
          <Badge key={tag.id} text={tag.name} size="xs" />
        ))}
      </div>
    </ScrollArea>
  )
}
