import LayoutDefiner from "./LayoutDefiner"
import Nav from "./Nav"

export default function Body({children}){
    return(
        <div className="flex flex-wrap w-full h-full">
            <Nav/>
            <LayoutDefiner>
                {children}
            </LayoutDefiner>
        </div>
    )
}
