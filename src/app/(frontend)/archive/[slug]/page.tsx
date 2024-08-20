type Props = {
  params: {
    slug: string
  }
}

export default function Episode({ params }: Props) {
  return (
    <div className="p-4">
      <h1>Episode: {params.slug}</h1>
    </div>
  )
}
