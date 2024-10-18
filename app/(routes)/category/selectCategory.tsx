'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface Category {
  id: number
  name: string
}

export function SelectCategory({ categories }: { categories: Category[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value === 'all') {
      params.delete('category')
    } else {
      params.set('category', value)
    }
    router.push(`/category?${params.toString()}`)
  }

  const currentCategory = searchParams.get('category') || 'all'

  return (
    <ul className="space-y-2 w-2/3 ">
      <li>
        <Button
          variant={currentCategory === 'all' ? 'default' : 'outline'}
          onClick={() => handleCategoryChange('all')}
          className="w-full justify-start h-10"
        >
          全部分类
        </Button>
      </li>
      {categories.map((category) => (
        <li key={category.id}>
          <Button
            variant={
              currentCategory === (category.name || `category-${category.id}`)
                ? 'default'
                : 'outline'
            }
            onClick={() => handleCategoryChange(category.name || `category-${category.id}`)}
            className="w-full justify-start h-10"
          >
            {category.name || `分类 ${category.id}`}
          </Button>
        </li>
      ))}
    </ul>
  )
}
