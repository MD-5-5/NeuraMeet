"use client";
import React from 'react'


import {email, z} from "zod"
import {useForm} from "react-hook-form"
import { OctagonAlert, OctagonAlertIcon } from 'lucide-react';
import {zodresolver} from "@hookform/resolvers/zod"
//These two are npm imports // package imports

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertTitle } from '@/components/ui/alert';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from 'react-hook-form';
//These are alias imports //local imports


const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1,{message: "Password is required"})
});

const signInViews = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodresolver(formSchema),
    defaultValues:{
      email: "",
      password: "",
    },
  })

  return (
    <div className='flex flex-col gap-6'>
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <Form {...form}>
            <form className='p-6 md:p-8'>
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col items-center text-center'>
                  <h1 className='text-2xl font-bold'>
                    Welcome Back!
                  </h1>
                  <p className='text-muted-foreground text-balance'>
                    Login to your Account
                  </p>
                </div>
                <div className='grid gap-3'>
                  <FormField
                    control={form.control}
                    name='email'
                    render={({field})=>(
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                          type='email'
                          placeholder='bab@example.com'
                          {...field}
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                </div>
                <div className='grid gap-3'>
                  <FormField
                    control={form.control}
                    name='password'
                    render={({field})=>(
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                          type='password'
                          placeholder='********'
                          {...field}
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                </div>
                {true && (
                  <Alert className='bg-destructive/10 border-none'>
                    <OctagonAlertIcon className='h-4 w-4 text-destructive!'/>
                    <AlertTitle>Error</AlertTitle>
                  </Alert>
                )}
                <Button type='submit' className='w-full'>
                  Sign In
                </Button>
              </div>
            </form>
          </Form>
          <div className='bg-radial from-green-700 to-green-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center'>
            <img src="/logo.svg" alt="Image" className='h-[92px] w-[92px]' />
            <p className='text-2xl font-semibold text-white'>
              NeuraMeet
            </p>
          </div>
        </CardContent> 
      </Card> 
    </div>
  )
}

export default signInViews
