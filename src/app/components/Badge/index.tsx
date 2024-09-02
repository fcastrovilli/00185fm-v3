type Props = {
  text: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

export default function Badge({ text, size = 'md' }: Props) {
  const className = `text-${size} ${size === 'xs' || size === 'sm' ? 'px-2' : 'px-4'} py-1`
  return (
    <button
      className={`${className} border border-black border-dotted rounded-full w-fit flex items-center justify-center`}
    >
      <span className="uppercase line-clamp-1">{text}</span>
    </button>
  )
}
