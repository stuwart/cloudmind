'use client'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { MagicCard } from '@/components/ui/magic-card'

interface Post {
  id: number;
  title: string;
  createdAt: string;
  category?: { name: string };
}

interface Category {
  id: number;
  name: string;
  _count: { posts: number };
}

interface Tag {
  id: number;
  name: string;
  _count: { posts: number };
}

interface PostListProps {
  categories: Category[];
  tags: Tag[];
  posts: Post[];
  selectedType?: string;
  selectedId?: string;
}

export default function PostList({ categories, tags, posts, selectedType, selectedId }: PostListProps) {
  const router = useRouter()

  const handleCategoryClick = (categoryId: number) => {
    router.push(`/notes?type=category&id=${categoryId}`)
  }

  const handleTagClick = (tagId: number) => {
    router.push(`/notes?type=tag&id=${tagId}`)
  }

  const handleAllClick = () => {
    router.push('/notes')
  }

  return (
    <div className="container mx-auto flex">
      <div className="w-[440px] min-h-screen shrink-0 px-6 py-4">
        <div className="m-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">文章</h2>
          <div className="space-y-2">
            <div
              onClick={handleAllClick}
              className={`flex items-center justify-between px-4 py-3 bg-white rounded-xl shadow-sm cursor-pointer transition-all duration-200 ${
                !selectedType ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
              }`}
            >
              <span className="text-gray-700">全部文章</span>
              <div className="flex items-center space-x-2">
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="m-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">类别</h2>
          <div className="space-y-2">
            {categories.map(category => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`flex items-center justify-between px-4 py-3 bg-white rounded-xl shadow-sm cursor-pointer transition-all duration-200 ${
                  selectedType === 'category' && selectedId === String(category.id)
                    ? 'bg-blue-50 border-blue-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <span className="text-gray-700">{category.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{category._count.posts}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="m-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">标签</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <div
                key={tag.id}
                onClick={() => handleTagClick(tag.id)}
                className={`inline-flex items-center px-3 py-1.5 bg-white rounded-full shadow-sm cursor-pointer transition-all duration-200 ${
                  selectedType === 'tag' && selectedId === String(tag.id)
                    ? 'bg-blue-50 border-blue-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <span className="text-sm text-gray-700">{tag.name}</span>
                <span className="ml-1 text-xs text-gray-500">({tag._count.posts})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 p-8">
        <div className="space-y-3">
          {posts.map(post => (
            <Link
              key={post.id}
              href={`/notes/${post.id}`}
              className="block transition-all duration-200 hover:scale-[1.01]"
            >
              <MagicCard
                gradientSize={150}
                gradientColor="rgba(120, 120, 128, 0.2)"
                gradientOpacity={0.3}
                className="backdrop-blur-xl bg-white/80 border-0 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-5">
                  <h3 className="text-[17px] font-medium text-gray-900 mb-2 line-clamp-1">{post.title}</h3>
                  <div className="flex items-center text-[13px] text-gray-500">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                      {post.category?.name || '未分类'}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{new Date(post.createdAt).toLocaleDateString('zh-CN')}</span>
                  </div>
                </div>
              </MagicCard>
            </Link>
          ))}
        </div>
        {posts.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-500 text-[15px]">暂无文章</div>
        )}
      </div>
    </div>
  )
}
