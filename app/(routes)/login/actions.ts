'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'
import { encodedRedirect } from '@/utils/utils'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    return encodedRedirect('error', '/sign-in', error.message)
  }

  return redirect('/protected')
}

export async function signup(formData: FormData) {
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()
  const supabase = await createClient()
  const origin = (await headers()).get('origin')

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`
    }
  })

  if (error) {
    console.error(error.code + ' ' + error.message)
    return encodedRedirect('error', '/sign-up', error.message)
  } else {
    return encodedRedirect(
      'success',
      '/sign-up',
      'Thanks for signing up! Please check your email for a verification link.'
    )
  }
}
