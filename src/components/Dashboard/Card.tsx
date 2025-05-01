interface CardProps{
    title: string,
    data: string
}
function Card({title,data}:CardProps){
    return (
        <div className="w-1/4 p-5 border rounded-xl m-2">
            <div className="flex flex-col gap-3">
                <div className="text-2xl capitalize font-semibold">
                    {title}
                </div>
                <div className="text-xl">
                    {data}
                </div>
            </div>
        </div>
    )
}

export default Card