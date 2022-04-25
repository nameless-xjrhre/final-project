import { usePostsQuery } from '../graphql/generated'

export function Posts() {
  const [result] = usePostsQuery()
  if (result.fetching) {
    return <div>Loading...</div>
  }
  if (result.error) {
    return (
      <div>
        Error:
        {result.error.message}
      </div>
    )
  }

  return (
    <div>
      {result.data?.feed.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  )
}
