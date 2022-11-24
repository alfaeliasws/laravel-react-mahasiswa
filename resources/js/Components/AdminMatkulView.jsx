import { useConsoleLog } from "@/Helper/useConsoleLog"
import AssignMatkulComponent from "./AssignMatkulComponent"
import ShowMatkulComponent from "./ShowMatkulComponent"

export default function AdminMatkulView({view, data}) {

    return (
        <div>
            {
                view === "show" ?
                <ShowMatkulComponent/>
                : <AssignMatkulComponent />
            }
        </div>
    )
}
