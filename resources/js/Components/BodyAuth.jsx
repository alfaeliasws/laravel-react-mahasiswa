import LayoutDefiner from "./LayoutDefiner"
import NavAuth from "./NavAuth"

export default function BodyAuth({children}){
    return(
        <div className="flex flex-wrap">
            <NavAuth/>
            <LayoutDefiner>
                {children}
            </LayoutDefiner>
        </div>
    )
}
