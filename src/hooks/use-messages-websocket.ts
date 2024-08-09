import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { GetRoomMessagesResponse } from "../http/get-room-messages";

interface UseMessageWebSocketsParams {
    roomId: string
}

type WebHookMessage = 
    | { kind: "message_created"; value: { id: string, message: string }}
    | { kind: "message_answered"; value: { id: string, answered: boolean }}
    | { kind: "message_reacted"; value: { id: string, count: number }};

export function useMessagesWebSockets({
    roomId
}: UseMessageWebSocketsParams) {
    
    const queryClient = useQueryClient();

    useEffect(() => {

        const ws = new WebSocket(`ws://localhost:8055/subscribe/${roomId}`)

        ws.onopen = () => console.log('websocket opened')
        ws.onclose = () => console.log('websocket closed')
        ws.onmessage = (event) => {
            const data: WebHookMessage = JSON.parse(event.data)

            switch (data.kind) {
                case 'message_created':
                    console.log('mensagem criada')
                    queryClient.setQueryData<GetRoomMessagesResponse>(['get-messages', roomId], state => {
                        return {
                            messages: [
                                ...(state?.messages ?? []),
                                {
                                    id: data.value.id,
                                    text: data.value.message,
                                    reactions: 0,
                                    answered: false
                                }
                            ],
                        }
                    })
                    break;

                case "message_answered":
                    console.log('resposta criada')
                    queryClient.setQueryData<GetRoomMessagesResponse>(['get-messages', roomId], state => {

                        if (!state) {
                            return undefined
                        }

                        return {
                            messages: state.messages.map(item => {
                                if (item.id === data.value.id) {
                                    return { ...item, answered: data.value.answered }
                                }
                                return item
                            })
                        }
                    })
                    break;

                case "message_reacted":
                    console.log('reação criada')
                    queryClient.setQueryData<GetRoomMessagesResponse>(['get-messages', roomId], state => {

                        if (!state) {
                            return undefined
                        }

                        return {
                            messages: state.messages.map(item => {
                                if (item.id === data.value.id) {
                                    return { ...item, reactions: data.value.count }
                                }
                                return item
                            })
                        }
                    })
                    break;
            }
        }

        return () => {
            ws.close()
        }

    }, [queryClient, roomId])
}