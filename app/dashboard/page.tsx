'use client'
import { useEffect, useState } from 'react'
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

// 定义文章类型
interface Article {
  id: string
  title: string
  createdAt: string
}

export default function DashboardPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const router = useRouter()
  useEffect(() => {
    // 从数据库获取文章列表
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      setArticles(data)
    } catch (error) {
      console.error('获取文章列表失败:', error)
    }
  }
  const handleEdit = (id: string) => {
    router.push(`/post/${id}/edit`)
  }
  return (
    <div className="container mx-auto px-4 py-8">
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
                <Button variant="destructive">删除</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
