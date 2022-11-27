//CONTAINER

//The gray box inside the website that contains data
export default function ActionContainer({children}){

    return(
    <div className="bg-gray-200 py-5 px-3 rounded-lg shadow-slate-200 shadow-whitebg-medium">
        {children}
    </div>
    )
}
