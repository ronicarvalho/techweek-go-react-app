import { ArrowRight } from "lucide-react"
import { useParams } from "react-router-dom"
import { toast } from "sonner"
import { createMessage } from "../http/create-message"

export function CreateMessageForm() {

    const { roomId } = useParams()

    if (!roomId) {
        throw new Error('Para carregar mensagens é necessário o código de uma sala')
    }

    async function handleCreateMessage(data: FormData) {
        const message = data.get('message')?.toString()

        if (!message || !roomId) {
            return
        }

        try {
            await createMessage({ roomId, message })
        } catch {
            toast.error('Falha ao enviar questão, tente novamente!')
        }
    }

    return (
        <form action={handleCreateMessage}
            className='flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 ring-orange-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-1'>
            <input
                type="text"
                name="message"
                placeholder="Qual a sua pergunta?"
                autoComplete='off'
                className='flex-1 text-sm bg-transparent mx-2 outline-none text-zinc-100 placeholder:text-zinc-500'
            />
            <button
                type="submit"
                className='bg-orange-400 text-orange-900 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm transition-colors hover:bg-orange-500'>
                Criar pergunta
                <ArrowRight className='size-4' />
            </button>
        </form>
    )
}