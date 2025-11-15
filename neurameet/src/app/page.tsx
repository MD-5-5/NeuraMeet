"use client";

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { authClient } from "@/lib/auth-client"
import { useState } from 'react';

export default function Home () {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const Onsubmit =()=>{
    authClient.signUp.email({
      email, // user email address
      name,
      password, // user password -> min 8 characters by default
    },{
      onError: ()=>{
        window.alert("Something went Wrong")
      },
      onSuccess: ()=>{
        window.alert("Success")
      }
    })
  }
  return (
    <div className='p-4 flex flex-col gap-y-4'>
      <Input placeholder='name' value={name} onChange={(e)=> setName(e.target.value)}/>
      <Input placeholder='email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
      <Input placeholder='password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
      <Button onClick={Onsubmit} className= 'bg-amber-200'>Create User</Button>
    </div>
  )
}

