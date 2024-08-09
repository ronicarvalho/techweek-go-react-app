
interface CreateAnswerRequest {
    roomId: string,
    messageId: string
}

export async function createReaction({ roomId, messageId }: CreateAnswerRequest) {
    await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages/${messageId}/answer`, {
        method: 'PATCH'
    })
}