'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import MarkdownIt from 'markdown-it'
import 'react-markdown-editor-lite/lib/index.css'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), { ssr: false })
const md = new MarkdownIt()

const formSchema = z.object({
  title: z.string().min(1, '标题不能为空'),
  content: z.string().min(1, '内容不能为空'),
  published: z.boolean(),
  category: z.string().min(1, '请输入分类'),
  tags: z.string()
})

export default function EditPost({ params }: { params: { id: string } }) {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([])
  const [filteredCategories, setFilteredCategories] = useState<string[]>([])
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      published: false,
      category: '',
      tags: ''
    }
  })

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/posts/${params.id}`)
      if (response.ok) {
        const post = await response.json()
        form.reset({
          title: post.title,
          content: post.content,
          published: post.published,
          category: post.category?.name || '',
          tags: post.tags.map((tag: { name: string }) => tag.name).join(' ')
        })
      }
    }

    const fetchCategories = async () => {
      const response = await fetch('/api/category')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    }

    fetchPost()
    fetchCategories()
  }, [params.id, form])

  const handleCategoryChange = (value: string) => {
    form.setValue('category', value)
    if (value) {
      const filtered = categories
        .filter((cat) => cat.name.toLowerCase().includes(value.toLowerCase()))
        .map((cat) => cat.name)
      setFilteredCategories(filtered)
    } else {
      setFilteredCategories([])
    }
  }

  const handleTagChange = (value: string) => {
    form.setValue('tags', value)
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const categoryResponse = await fetch('/api/category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: values.category })
      })
      const categoryData = await categoryResponse.json()

      if (!categoryResponse.ok) {
        throw new Error(categoryData.error || '更新分类失败')
      }

      const tagNames = values.tags.split(/\s+/).filter((tag) => tag.trim() !== '')
      const tagResponse = await fetch('/api/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ names: tagNames })
      })
      if (!tagResponse.ok) {
        throw new Error('处理标签失败')
      }
      const tagResults = await tagResponse.json()

      const postResponse = await fetch(`/api/posts/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          categoryId: categoryData.id,
          tagIds: tagResults.map((tag: { id: number }) => tag.id)
        })
      })

      if (postResponse.ok) {
        router.push('/dashboard')
      } else {
        throw new Error('更新文章失败')
      }
    } catch (error) {
      console.error('更新文章时出错:', error)
    }
  }

  return (
    <div className="w-3/5 mx-auto mt-12">
      <h1 className="text-2xl font-bold mb-4">编辑文章</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>文章标题</FormLabel>
                <FormControl>
                  <div className="relative w-1/2">
                    <Input placeholder="输入文章标题" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>分类</FormLabel>
                <FormControl>
                  <div className="relative w-1/2">
                    <Input
                      {...field}
                      placeholder="输入分类名称"
                      onChange={(e) => handleCategoryChange(e.target.value)}
                    />
                    {filteredCategories.length > 0 && (
                      <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
                        {filteredCategories.map((category, index) => (
                          <li
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              form.setValue('category', category)
                              setFilteredCategories([])
                            }}
                          >
                            {category}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>标签</FormLabel>
                <FormControl>
                  <div className="relative w-1/2">
                    <Input
                      {...field}
                      placeholder="输入标签"
                      onChange={(e) => handleTagChange(e.target.value)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>文章内容</FormLabel>
                <FormControl>
                  <MdEditor
                    style={{ height: '500px' }}
                    renderHTML={(text) => md.render(text)}
                    onChange={({ text }) => field.onChange(text)}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">更新文章</Button>
        </form>
      </Form>
    </div>
  )
}
