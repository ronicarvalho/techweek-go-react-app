
interface GetRoomRequest {
    roomId: string
}

export interface GetRoomResponse {
    id: string,
    theme: string
}

export async function getRoom({ roomId }: GetRoomRequest): Promise<GetRoomResponse>  {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}`)
    const data: GetRoomResponse = await response.json()
    return data;
}