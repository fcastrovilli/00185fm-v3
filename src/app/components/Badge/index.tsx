type Props = {
  text: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

export default function Badge({ text, size = 'md' }: Props) {
  const className = `text-${size} ${size === 'xs' || size === 'sm' ? 'px-2' : 'px-4'} py-1`
  return (
    <button
      className={`${className} flex w-fit items-center justify-center rounded-full border border-dotted border-black`}
    >
      <span className="line-clamp-1 uppercase">{text}</span>
    </button>
  )
}
