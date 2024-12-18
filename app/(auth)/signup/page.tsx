'use client'
import { login } from '../actions'
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
  email: z.string().email('Invalid email address'), // 验证邮箱格式

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long') // 密码至少8个字符
    .max(100, 'Password must be at most 100 characters long') // 密码最多100个字符
})

export default function SignupPage() {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  return (
    <div className="flex items-center justify-center h-3/4 w-full flex-col">
      <h1>Sign up</h1>
      <Form {...form}>
        <form className="space-y-4 w-full max-w-sm  p-4">
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
                  <Input
                    type="password"
                    placeholder="Your password"
                    {...field}
                    className="w-full  h-10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between pt-4">
            <Button formAction={login} variant="outline" className="w-1/3 h-10 mx-3">
              Log in
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
