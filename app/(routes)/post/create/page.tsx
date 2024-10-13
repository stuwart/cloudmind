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

export default function CreatePost() {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([])
  const [filteredCategories, setFilteredCategories] = useState<string[]>([])
  // const [tags, setTags] = useState<{ id: number; name: string }[]>([])

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
    const fetchCategories = async () => {
      const response = await fetch('/api/category')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    }
    // const fetchTags = async () => {
    //   const response = await fetch('/api/tags')
    //   if (response.ok) {
    //     const data = await response.json()
    //     setTags(data)
    //   }
    // }
    fetchCategories()
    // fetchTags()
  }, [])

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
    console.log('values', values)
    try {
      // 首先，尝试创建或获取分类
      const categoryResponse = await fetch('/api/category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: values.category })
      })
      const categoryData = await categoryResponse.json()

      if (!categoryResponse.ok) {
        throw new Error(categoryData.error || '创建分类失败')
      }

      // 处理标签：将输入的标签字符串分割成数组
      const tagNames = values.tags.split(/\s+/).filter((tag) => tag.trim() !== '')
      console.log('tagNames', tagNames)
      // 然后，处理所有标签
      const tagResponse = await fetch('/api/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ names: tagNames })
      })
      if (!tagResponse.ok) {
        throw new Error('处理标签失败')
      }
      const tagResults = await tagResponse.json()

      // 然后，创建文章
      const postResponse = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          categoryId: categoryData.id,
          tags: tagResults.map((tag: { id: number }) => tag.id)
        })
      })

      if (postResponse.ok) {
        router.refresh() // 重新验证数据
        router.push('/posts') // 导航到帖子列表页面
      } else {
        throw new Error('发布文章失败')
      }
    } catch (error) {
      console.error('发布文章时出错:', error)
      // 这里可以添加错误处理，比如显示一个错误消息给用户
    }
  }

  return (
    <div className="w-3/5 mx-auto mt-12">
      <h1 className="text-2xl font-bold mb-4">创建文章</h1>
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">提交</Button>
        </form>
      </Form>
    </div>
  )
}
