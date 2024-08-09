import { Room } from "./room";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRooms } from "../http/get-rooms";


export function Rooms() {

    const { data } = useSuspenseQuery({
        queryKey: ['get-rooms'],
        queryFn: () => getRooms(),
    })

    return (
        <ol className='list-decimal list-inside px-3 space-y-8'>
            {data.map(room => {
                return (
                    <Room 
                        key={room.id}
                        roomId={room.id}
                        theme={room.theme} />
                )
            })}
        </ol>
    )
}