import ShowComponent from "./ShowComponent"
import CreateComponent from "./CreateComponent"
import { useConsoleLog } from "@/Helper/useConsoleLog"

//component to show mahasiswa view
export default function AdminMahasiswaView({view, data, openEditView, editMahasiswaView, onShowView, fetchDataMahasiswa}) {

    return (
        <div>
            {
                view === "show" ?
                <ShowComponent data={data} view={view} openEditView={openEditView} fetchDataMahasiswa={fetchDataMahasiswa} editMahasiswaView={editMahasiswaView} onShowView={onShowView}/>
                : <CreateComponent data={data.unique_data}/>
            }
        </div>
    )
}
