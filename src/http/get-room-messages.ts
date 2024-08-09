
interface GetRoomMessagesRequest {
    roomId: string
}

export interface GetRoomMessagesResponse {
    messages: {
        id: string,
        text: string,
        reactions: number,
        answered: boolean
    }[]
}

export async function getRoomMessages({ roomId }: GetRoomMessagesRequest): Promise<GetRoomMessagesResponse> {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages`)
    
    const data: Array<{
        id: string,
        content: string,
        reactions: number,
        answered: boolean
    }> = await response.json()

    if (!data) {
        return { messages: [] }
    }

    return {
        messages: data.map(item => {
            return {
                id: item.id,
                text: item.content,
                reactions: item.reactions,
                answered: item.answered,
            }
        })
    }
}