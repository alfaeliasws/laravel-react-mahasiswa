import ShowComponent from "./ShowComponent"
import CreateComponent from "./CreateComponent"
import { useConsoleLog } from "@/Helper/useConsoleLog"

export default function AdminMahasiswaView({view, data}) {


    return (
        <div>
            {
                view === "show" ?
                <ShowComponent data={data} view={view}/>
                : <CreateComponent data={data.unique_data}/>
            }
        </div>
    )
}
