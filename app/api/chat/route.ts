import { NextResponse } from 'next/server'
import { chatCompletion } from '@/lib/openai'
import { addMessage, getMessages } from '@/lib/storage'
import { Message } from '@/lib/types'

export async function POST(req: Request) {
  try {
    const { message } = await req.json()
    
    if (!message) {
      return NextResponse.json(
        { error: 'Invalid message format' },
        { status: 400 }
      )
    }
    
    // Add user message and get history
    const userMessage: Message = {role: 'user', content: message} 
    addMessage(userMessage)
    const history = getMessages()
    
    // Get AI response
    const response = await chatCompletion(history)
    
    // Store AI response
    addMessage({
      role: 'assistant',
      content: response
    })

    return NextResponse.json({ 
      content: response
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}



// export async function POST(req: Request) {
//   try {
//     const { messages, threadId: existingId }: ChatRequest = await req.json()
    
//     if (!messages || !Array.isArray(messages) || messages.length === 0) {
//       return NextResponse.json(
//         { error: 'Invalid messages format' },
//         { status: 400 }
//       )
//     }

//     // Create or use existing thread
//     const threadId = existingId || createThread()
    
//     // Add user message and get history
//     const userMessage = messages[messages.length - 1]
//     addMessage(threadId, userMessage)
//     const history = getMessages(threadId)
    
//     // Get AI response
//     const response = await chatCompletion(history)
    
//     // Store AI response
//     addMessage(threadId, {
//       role: 'assistant',
//       content: response
//     })

//     return NextResponse.json({ 
//       content: response,
//       threadId 
//     })
//   } catch (error) {
//     console.error('Chat API error:', error)
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     )
//   }
// }