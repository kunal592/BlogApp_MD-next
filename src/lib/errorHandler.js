
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

export function errorHandler(error) {
  console.error(error)

  if (error instanceof ZodError) {
    return new NextResponse(
      JSON.stringify({
        error: 'Validation failed',
        issues: error.errors,
      }),
      { status: 400 }
    )
  }

  if (error.message === 'Unauthorized') {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }
  
  return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 })
}
