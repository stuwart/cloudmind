'use client'
import { signup } from './actions'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
const userSchema = z.object({
  userName: z
    .string()
    .min(3, 'Username must be at least 3 characters long') // 用户名至少3个字符
    .max(20, 'Username must be at most 20 characters long'), // 用户名最多20个字符

  email: z.string().email('Invalid email address'), // 验证邮箱格式

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long') // 密码至少8个字符
    .max(100, 'Password must be at most 100 characters long') // 密码最多100个字符
})

export default function LoginPage() {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      userName: '',
      email: '',
      password: ''
    }
  })
  const onSubmit = async (data: z.infer<typeof userSchema>) => {
    const formData = new FormData()
    formData.append('userName', data.userName)
    formData.append('email', data.email)
    formData.append('password', data.password)
    try {
      const response = await signup(formData)
      console.log('Login successful:', response)
    } catch (error) {
      console.error('Login failed:', error)
    }
  }
  return (
    <div className="flex items-center justify-center h-3/4 w-full flex-col">
      <h1> Account</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-sm  p-4">
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Your username" {...field} className="w-full  h-10" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email" {...field} className="w-full h-10" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Your password" {...field} className="w-full  h-10" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between pt-4">
            <Button type="submit" className="w-1/3 h-10 mx-3">
              Sign up
            </Button>
            <Button type="button" variant="outline" className="w-1/3 h-10 mx-3">
              Log in
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
