import { Suspense } from 'react'
import ReactMarkdown from 'react-markdown'
import prisma from '@/lib/prisma'

async function getPost(id: string) {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
    select: { title: true, content: true }
  })
  if (!post) throw new Error('文章未找到')
  return post
}

export async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="prose max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </div>
  )
}

// 可选：添加一个加载状态组件
function Loading() {
  return <div className="container mx-auto px-4 py-8">加载中...</div>
}

// 如果需要，可以将整个页面包裹在 Suspense 中
export default function PostPageWrapper({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<Loading />}>
      <PostPage params={params} />
    </Suspense>
  )
}
