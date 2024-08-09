import { Suspense } from "react"
import { useNavigate } from "react-router-dom"
import { Rooms } from "../components/rooms"
import logo from "../assets/logo.png"

export function ListRooms() {

    const navigate = useNavigate()

    function handleHome() {
        navigate("/")
    }

    return (
        <main className="h-screen flex items-top justify-center px-4">
            <div className="mx-auto max-w-[640px] flex flex-col gap-6 py-10 px-4">
                <div className="flex items-center gap-3 px-3">
                    <img src={logo} className="h-10 w-10" alt="encoders" onClick={handleHome} />
                    <span className="text-md text-zinc-500 truncate">
                        <span className="text-zinc-300">Salas Existentes</span>
                    </span>
                </div>
                <div className='h-px w-full bg-zinc-900' />
                <Suspense fallback={<p>carregando...</p>}>
                    <Rooms />
                </Suspense>
            </div>
        </main>
    )
}