'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  
  const handleLogin = async (e) => {
    e.preventDefault()

    const values = Object.fromEntries(new FormData(e.target).entries())

    signIn('credentials', { ...values, redirect: false })
      .then((res) => {
        if (!((res?.ok) ?? false)) return console.log('Error al iniciar sesión')
        // toast.success('Inicio de sesión exitoso.')
        router.replace('/dash')
      })

  }

  return (
    <div>
      <form onSubmit={handleLogin} className="bg-black/50 flex items-center justify-center p-5 gap-2">
        <input type="text" name='email'/>
        <input type="password" name='password'/>

        <button>Iniciar sesion</button>
      </form>
    </div>
  )
}
