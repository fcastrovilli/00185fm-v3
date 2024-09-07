import { Skeleton } from '@/app/components/ui/skeleton'

export default function LoadingCard() {
  return (
    <div className="relative flex w-full max-w-sm flex-col items-center justify-center space-y-3 overflow-hidden rounded-lg">
      <Skeleton className="h-[65%] w-[95%] rounded-xl" />
      <div className="flex w-full flex-col items-center justify-center space-y-2">
        <Skeleton className="h-4 w-[80%]" />
        <Skeleton className="h-4 w-[60%]" />
      </div>
    </div>
  )
}
