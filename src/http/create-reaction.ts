
interface CreateReactionRequest {
    roomId: string,
    messageId: string
}

export async function createReaction({ roomId, messageId }: CreateReactionRequest) {
    await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages/${messageId}/react`, {
        method: 'PATCH'
    })
}