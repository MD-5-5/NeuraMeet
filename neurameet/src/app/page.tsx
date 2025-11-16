"use client";

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { authClient } from "@/lib/auth-client"
import { useState } from 'react';

export default function Home () {

  const { data: session } = authClient.useSession() 
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const OnLogin =()=>{
    authClient.signIn.email({
      email, // user email address
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

  if(session){
    return (
      <div className='flex flex-col p-4 gap-y-4'>
        <p>Logged in as {session.user.name} </p>
        <Button onClick={()=> authClient.signOut()}>Sign Out</Button>
      </div>
    )
  }
  return (
    <div className='flex flex-col gap-y-10'>
      <div className='p-4 flex flex-col gap-y-4'>
        <Input placeholder='name' value={name} onChange={(e)=> setName(e.target.value)}/>
        <Input placeholder='email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
        <Input placeholder='password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
        <Button onClick={OnLogin} className= 'bg-amber-200'>Login</Button>
      </div>
      <div className='p-4 flex flex-col gap-y-4'>
        <Input placeholder='email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
        <Input placeholder='password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
        <Button onClick={OnLogin} className= 'bg-amber-200'>Login</Button>
      </div>
    </div>
  )
}

