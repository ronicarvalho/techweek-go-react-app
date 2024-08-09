import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { createReaction } from "../http/create-reaction";
import { removeReaction } from "../http/remove-reaction";

interface MessageProps {
    roomId: string
    messageId: string
    text: string
    reactions: number
    answered?: boolean
}


export function Message({ roomId, messageId, text, reactions, answered = false }: MessageProps) {

    const [hasReacted, setHasReacted] = useState(reactions > 0)

    async function createMessageReaction() {
        try {
            await createReaction({ roomId, messageId })
            setHasReacted(true)
        } catch {
            toast.error('Falha ao criar reação da mensagem.')
        }
    }

    async function removeMessageReaction() {
        try {
            await removeReaction({ roomId, messageId })
            setHasReacted(false)
        } catch {
            toast.error('Falha ao remover reação da mensagem.')
        }
        
    }

    return (
        <li data-answered={answered} className='ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none'>
            {text}

            {hasReacted ? (
                <button 
                    type="button" 
                    onClick={removeMessageReaction} 
                    className='mt-3 flex items-center gap-2 text-orange-400 text-sm font-medium hover:text-orange-500'
                >
                    <ArrowUp className='size-4' />
                    Curtir pergunta ({reactions})
                </button>
            ) : (
            
                <button 
                    type="button" 
                    onClick={createMessageReaction} 
                    className='mt-3 flex items-center gap-2 text-orange-400 text-sm font-medium hover:text-zinc-300'
                >
                    <ArrowUp className='size-4'/>
                    Curtir pergunta ({reactions})
                </button>)}
        </li>
    )


}