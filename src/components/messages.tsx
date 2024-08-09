import { useParams } from "react-router-dom"
import { getRoomMessages } from "../http/get-room-messages";
import { Message } from "./message";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMessagesWebSockets } from "../hooks/use-messages-websocket";


export function Messages() {

    const { roomId } = useParams()

    if (!roomId) {
        throw new Error('Para carregar mensagens é necessário o código de uma sala')
    }

    //const { messages } = use(getRoomMessages({ roomId }))

    const { data } = useSuspenseQuery({
        queryKey: ['get-messages', roomId],
        queryFn: () => getRoomMessages({ roomId }),
    })

    useMessagesWebSockets({ roomId })

    const sortedMessages = data.messages.sort((a, b) => {
        return b.reactions - a.reactions
    })

    return (
        <ol className='list-decimal list-inside px-3 space-y-8'>
            {sortedMessages.map(message => {
                return (
                    <Message 
                        key={message.id}
                        roomId={roomId}
                        messageId={message.id}
                        text={message.text} 
                        reactions={message.reactions}
                        answered={message.answered} />
                )
            })}
        </ol>
    )
}