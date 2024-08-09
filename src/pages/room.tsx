
import { Messages } from "../components/messages"
import { Suspense } from "react"
import { CreateMessageForm } from "../components/create-message-form"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { Share2 } from 'lucide-react'
import { toast } from "sonner"
import { getRoom, GetRoomResponse } from "../http/get-room";
import logo from '../assets/logo.png'


export function Room() {

    const { roomId } = useParams()
    const navigate = useNavigate()
    const [room, setRoom] = useState<GetRoomResponse>({id: "", theme: ""})

    function handleShareRoom() {
        const url = window.location.href.toString()
        if (navigator.share != undefined && navigator.canShare()) {
            navigator.share({ url })
        } else {
            navigator.clipboard.writeText(url)
            toast.info('O link da sala foi copiado para área de transferencia')
        }
    }

    function handleHome() {
        navigate("/")
    }

    if (!roomId) {
        throw new Error('Para carregar mensagens é necessário o código de uma sala')
    }

    useEffect(() => {

        async function fetchRoom(id: string) {
            const value = await getRoom({ roomId: id })
            setRoom(value)
        }

        fetchRoom(roomId)

    }, [roomId])

    return (
        <main className="h-screen flex items-top justify-center px-4">
            <div className="mx-auto max-w-[640px] flex flex-col gap-6 py-10 px-4">
            <div className="flex items-center gap-3 px-3">
            <img src={logo} className="h-10 w-10" alt="encoders" onClick={handleHome} />
            <span className="text-sm text-zinc-500 truncate">
                <span className="text-zinc-300">{room?.theme}</span> <br/>
                <span className="text-zinc-300">{room?.id}</span>
            </span>

            <button
                type="button"
                onClick={handleShareRoom}
                className='ml-auto bg-zinc-800 text-zinc-300 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm transition-colors hover:bg-zinc-700'>
                Compartilhar
                <Share2 className='size-4' />
            </button>
        </div>
                <div className='h-px w-full bg-zinc-900' />
                <CreateMessageForm />
                <Suspense fallback={<p>carregando...</p>}>
                    <Messages />
                </Suspense>
            </div>
        </main>
    )
}