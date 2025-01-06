import { Message } from './types'



// Single thread Storage
export const messageStore: Message[] = []

export function addMessage(message: Message) {
  messageStore.push(message)
}

export function getMessages(): Message[] {
  return messageStore
}



// Multiple threads Storage

// export const messageStore = new Map<string, Message[]>()

// export function addMessage(threadId: string, message: Message) {
//   const messages = messageStore.get(threadId) || []
//   messages.push(message)
//   messageStore.set(threadId, messages)
// }

// export function getMessages(threadId: string): Message[] {
//   return messageStore.get(threadId) || []
// }

// export function createThread(): string {
//   const threadId = Math.random().toString(36).substring(2, 15)
//   messageStore.set(threadId, [])
//   return threadId
// } 