'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const router = useRouter()

  useEffect(() => {
    const usuarioId = localStorage.getItem('usuario_id')
    if (!usuarioId) {
      router.push('/login')
    }
  }, [router])
}
