'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Badge } from '@/components/ui/badge'

interface Post {
  id: number
  title: string
  createdAt: string
  category: {
    name: string
  }
}

export function PostList({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = useState(initialPosts)
  const searchParams = useSearchParams()

  useEffect(() => {
    const category = searchParams.get('category')
    if (category) {
      const filteredPosts = initialPosts.filter((post) => post.category.name === category)
      setPosts(filteredPosts)
    } else {
      setPosts(initialPosts)
    }
  }, [searchParams, initialPosts])

  return (
    <div className="grid gap-6">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Link key={post.id} href={`/post/${post.id}`} className="block hover:no-underline">
            <div className="bg-white shadow-md rounded-lg p-6 transition-all duration-200 hover:shadow-lg">
              <div className="flex items-center justify-start">
                <h3 className="text-xl font-semibold  hover:text-blue-800">{post.title}</h3>
                <Badge variant="secondary" className="ml-4">
                  {post.category?.name || '未分类'}
                </Badge>
              </div>
              <p className="text-gray-600 mt-2">
                发布时间: {new Date(post.createdAt).toLocaleDateString('zh-CN')}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <p>该分类下暂无文章</p>
      )}
    </div>
  )
}
