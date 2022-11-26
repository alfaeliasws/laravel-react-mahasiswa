import { useConsoleLog } from "@/Helper/useConsoleLog"
import AssignMatkulComponent from "./AssignMatkulComponent"
import ShowMatkulComponent from "./ShowMatkulComponent"
import { useState, useEffect } from "react"

//show matkul view to admin
export default function AdminMatkulView({view, openEditView, editMatkulView}) {

    return (
        <div>
            {
                view === "show" ?
                <ShowMatkulComponent openEditView={openEditView} editMatkulView={editMatkulView} />
                : <AssignMatkulComponent />
            }
        </div>
    )
}
