//CONTAINER

//layout margin and padding
export default function LayoutDefiner({children}){
    return (
        <div className="py-20 px-5 md:px-10 w-full">
            {children}
        </div>
    )
}
