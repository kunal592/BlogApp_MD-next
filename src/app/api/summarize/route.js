
import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { errorHandler } from '@/lib/errorHandler'
import { z } from 'zod'
import { validate } from '@/lib/validation'

const summarizeSchema = z.object({
  content: z.string().min(100),
})

export async function POST(request) {
  try {
    const body = await request.json()
    validate(summarizeSchema, body)

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `Summarize the following blog post in 3-4 sentences:\n\n${body.content}`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const summary = response.text()

    return new NextResponse(JSON.stringify({ summary }), { status: 200 })
  } catch (error) {
    return errorHandler(error)
  }
}
