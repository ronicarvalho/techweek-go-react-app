
interface RemoveReactionRequest {
    roomId: string,
    messageId: string
}

export async function removeReaction({ roomId, messageId }: RemoveReactionRequest) {
    await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages/${messageId}/react`, {
        method: 'DELETE'
    })
}