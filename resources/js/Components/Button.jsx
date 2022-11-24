export default function Button({type, onClick, children}){

    return (
        <button type={type} onClick={onClick} className="shadow-2xl hover:bg-blue-900 w-3/12 py-2 bg-blue-800 text-white border-none rounded-lg ml-3 mt-4 ">{children}</button>
    )
}
