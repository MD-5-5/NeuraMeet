"use client";

import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

const signInViews = () => {
  return (
    <div className='flex flex-col gap-6'>
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <form>Col 1</form>
          <div>Col 2</div>
        </CardContent> 
      </Card> 
    </div>
  )
}

export default signInViews
