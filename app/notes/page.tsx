import { getCategories, getTags, getPostsByCategory, getPostsByTag, getAllPosts } from './actions'
import PostList from './components/PostList'

export const metadata = {
  title: '文章列表 - CloudMind Blog',
  description: '浏览所有文章分类和标签',
}

export default async function Notes({ searchParams }: { searchParams: { type?: string; id?: string } }) {
  const categories = await getCategories()
  const tags = await getTags()

  let posts: any = []
  if (searchParams.type && searchParams.id) {
    if (searchParams.type === 'category') {
      posts = await getPostsByCategory(parseInt(searchParams.id))
    } else if (searchParams.type === 'tag') {
      posts = await getPostsByTag(parseInt(searchParams.id))
    }
  } else {
    posts = await getAllPosts()
  }

  return (
    <div className="min-h-screen bg-[#F2F2F7]">
      <div className="h-[68px] border-b border-slate-200 bg-gradient-to-b from-[#60a5fa]/80 to-[#93c5fd]/80 backdrop-blur-md" />
      <PostList
        categories={categories}
        tags={tags}
        posts={posts}
        selectedType={searchParams.type}
        selectedId={searchParams.id}
      />
    </div>
  )
}
