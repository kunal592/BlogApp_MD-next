
import { NextResponse } from 'next/server'

export function errorHandler(error) {
  console.error(error)
  if (error.message === 'Unauthorized') {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }
  return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 })
}
