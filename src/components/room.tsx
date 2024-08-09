import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom"

interface RoomProps {
    roomId: string
    theme: string
}

export function Room({ roomId, theme }: RoomProps) {

    const navigate = useNavigate()

    function openRoom(roomId: string) {
        navigate(`/rooms/${roomId}`)
    }

    return (
        <li className='ml-4 leading-relaxed text-zinc-100 flex justify-between'>
            <span className="pr-5">{theme}</span>

            <button
                type="button"
                onClick={() => openRoom(roomId)}
                className='bg-orange-400 text-orange-900 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm transition-colors hover:bg-orange-500'>
                Entrar
                <ArrowRight className='size-4' />
            </button>
        </li>
    )


}