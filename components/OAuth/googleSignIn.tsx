'use client'

import { useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { CredentialResponse } from '@react-oauth/google'

// 添加这个类型声明在文件顶部
declare global {
  interface Window {
    handleSignInWithGoogle: (response: CredentialResponse) => Promise<void>
  }
}

export default function GoogleSignIn() {
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const handleSignInWithGoogle = async (response: CredentialResponse) => {
      try {
        if (!response.credential) {
          throw new Error('No credential received from Google')
        }

        const { error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: response.credential
        })

        if (error) throw error
        console.log('Successfully logged in with Google')
        router.push('/')
      } catch (error) {
        console.error('Error logging in with Google:', error)
      }
    }

    window.handleSignInWithGoogle = handleSignInWithGoogle
  }, [router, supabase.auth])

  return (
    <>
      <div
        id="g_id_onload"
        data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        data-context="signin"
        data-ux_mode="popup"
        data-callback="handleSignInWithGoogle"
        data-auto_select="true"
        data-itp_support="true"
        data-use_fedcm_for_prompt="true"
      ></div>

      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="pill"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
    </>
  )
}
