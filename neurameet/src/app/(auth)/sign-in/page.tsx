import React from 'react'
import SignInViews from '@/modules/auth/ui/views/sign-in-views'
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const page =  async () => {
  const session = await auth.api.getSession ({
      headers: await headers(),
    });
  

    if(!!session){
      redirect("/")
    }

  return (
    <SignInViews/>
  )
}

export default page
