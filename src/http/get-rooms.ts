
export interface GetRoomsResponse {
    id: string,
    theme: string
}

export async function getRooms(): Promise<GetRoomsResponse[]>  {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms`)

    const data: Array<{
        id: string,
        theme: string
    }> = await response.json()

    if (!data) {
        return []
    }

    return data.map(item => {
        return {
            id: item.id,
            theme: item.theme
        }
    })
}