import OpenAI from 'openai'
import { Message } from './types'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function chatCompletion(messages: Message[]) {
  try {
    const systemPrompt = process.env.SYSTEM_PROMPT || ''
    // add systemPrompt at the beginning of messages array
    messages.unshift({
      role: 'system',
      content: systemPrompt
    })

    const completion = await openai.chat.completions.create({
      model: process.env.MODEL,
      messages,
      // temperature: 0.7,
      // max_tokens: 1000
    })

    return completion.choices[0]?.message?.content || 'No response generated'

  } catch (error) {
    console.error('Error in chat completion:', error)
    throw new Error('Failed to generate chat response')
  }
}