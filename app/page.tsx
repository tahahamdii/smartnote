"use client"

import { Suspense } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SmartNote',
  description: 'SmartNote Application',
}

export default function SyntheticV0PageForDeployment() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        {/* Your main content here */}
        <h1 className="text-4xl font-bold">Welcome to SmartNote</h1>
      </Suspense>
    </main>
  )
}