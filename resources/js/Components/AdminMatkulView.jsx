import { useConsoleLog } from "@/Helper/useConsoleLog"
import AssignMatkulComponent from "./AssignMatkulComponent"
import ShowMatkulComponent from "./ShowMatkulComponent"
import { useState, useEffect } from "react"

export default function AdminMatkulView({view}) {

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
