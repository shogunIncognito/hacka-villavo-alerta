'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import logo from '@/assets/logo.png'
import loginBackground from '@/assets/login-background.png'
import Image from 'next/image'
import { toast } from 'sonner'

export default function Login() {
  const router = useRouter()
  const handleLogin = async (e) => {
    e.preventDefault()

    const values = Object.fromEntries(new FormData(e.target).entries())

    signIn('credentials', { ...values, redirect: false })
      .then((res) => {
        if (!((res?.ok) ?? false)) return toast.error('Credenciales incorrectas.')

        toast.success('Inicio de sesión exitoso.',)
        router.replace('/')
      })
  }

  return (
    <div className='flex justify-center items-center h-full w-full flex-1'>
      <Card className="w-[400px] shadow-lg">
        <form onSubmit={handleLogin}>
          <CardHeader>
            <Image alt='villavoAlertaslogo' src={logo} className="object-cover invert w-68 h-28" />
            <CardTitle className='text-center text-2xl'>Iniciar Sesión</CardTitle>
            <CardDescription>Accede a tu cuenta para recibir alertas personalizadas. Ingresa tus credenciales y haz clic en "Iniciar Sesión".</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label className='font-bold' htmlFor="email">Correo</Label>
                <Input id="email" name="email" placeholder="example@gmail.com" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className='font-bold' htmlFor="password">Contraseña</Label>
                <Input id="password" name="password" type="password" placeholder="******" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button>Iniciar sesion</Button>
          </CardFooter>
        </form>
      </Card>

      <div className="absolute top-0 opacity-10 right-0 bottom-0 left-0 z-[-1]">
        <Image src={loginBackground} layout="fill" alt='background-login' />
      </div>
    </div>
  )
}
