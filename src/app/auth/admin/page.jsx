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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
    <div className='flex justify-center items-center h-full w-full flex-1'>
      <form onSubmit={handleLogin} className="bg-black/50 h-full flex items-center justify-center p-5 gap-2">
        <input type="text" name='email' />
        <input type="password" name='password' />

        <button>Iniciar sesion</button>
      </form>

        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>Deploy your new project in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Name of your project" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Framework</Label>
                  <Select>
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="next">Next.js</SelectItem>
                      <SelectItem value="sveltekit">SvelteKit</SelectItem>
                      <SelectItem value="astro">Astro</SelectItem>
                      <SelectItem value="nuxt">Nuxt.js</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
    </div>
  )
}
