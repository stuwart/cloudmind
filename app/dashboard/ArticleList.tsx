'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface Article {
  id: number
  title: string
  content: string
  published: boolean
  createdAt: Date
  updatedAt: Date
  categoryId: number | null
}

export default function ArticleList({ initialArticles }: { initialArticles: Article[] }) {
  const [articles, setArticles] = useState(initialArticles)
  const router = useRouter()

  const handleEdit = (id: number) => {
    router.push(`/dashboard/edit/${id}`)
  }

  const handleDelete = async (id: number) => {
    if (confirm('确定要删除这篇文章吗？')) {
      try {
        const response = await fetch(`/api/articles/${id}`, {
          method: 'DELETE'
        })
        if (response.ok) {
          setArticles(articles.filter((article) => article.id !== id))
        } else {
          console.error('删除文章失败')
        }
      } catch (error) {
        console.error('删除文章时出错:', error)
      }
    }
  }

  return (
    <Table>
      <TableCaption>文章列表</TableCaption>
      <TableHeader>
        <TableRow className="h-[50px]">
          <TableHead className="w-[200px]">ID</TableHead>
          <TableHead className="w-[400px] text-center">标题</TableHead>
          <TableHead className="w-[300px] text-center">发布日期</TableHead>
          <TableHead className="w-[100px] text-center">操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {articles.map((article) => (
          <TableRow key={article.id} className="h-[50px]">
            <TableCell className="font-medium">{article.id}</TableCell>
            <TableCell className="text-center">{article.title}</TableCell>
            <TableCell className="text-center">
              {new Date(article.createdAt).toLocaleDateString('zh-CN')}
            </TableCell>
            <TableCell className="text-center">
              <Button variant="outline" className="mr-2" onClick={() => handleEdit(article.id)}>
                编辑
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(article.id)}>
                删除
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
