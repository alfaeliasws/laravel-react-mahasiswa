//CONTAINER

import LayoutDefiner from "./LayoutDefiner"
import Nav from "./Nav"

//Body component of guest (layout)
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
