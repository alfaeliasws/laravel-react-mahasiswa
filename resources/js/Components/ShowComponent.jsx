import { useConsoleLog } from "@/Helper/useConsoleLog"
import Card from "./Card"
import { useEffect, useState } from "react"
import { useVariableCatcher } from "@/Helper/useVariableCatcher";
import EditComponent from "./EditComponent";
import { viewChanger } from "@/Helper/viewChanger";

export default function ShowComponent({data,  view, updatePass}){

    const [dataMahasiswa,setDataMahasiswa] = useState([])
    const [deleteAction, setDeleteAction] = useState(false);
    const [editPassedData, setEditPassedData] = useState({});
    const [showView, setShowView] = useState(true);
    const [inheritedView, setInheritedView] = useState(view)

    const userDataArray = Object.entries(data.data)
    let filteredData = [];

    useEffect(()=>{
        if(deleteAction == false){
            setDataMahasiswa(userDataArray);
        }
    },[inheritedView])

    const deleteHandler = async (e) => {

        e.preventDefault()

        const deletedData = e.target.value

        filteredData = dataMahasiswa.filter((item)=>{
            return item[1].id != deletedData
        })

        setDeleteAction(true)

        setDataMahasiswa(filteredData)

        await axios.delete(`/deletemahasiswa/${deletedData}`)
        .then((response) => {
            console.log("delete succees")
        }).catch(error => console.error(error))
    }

    const editHandler = item => e => {
        e.preventDefault()
        setShowView(false)
        setInheritedView("edit")

        const editedValue = item
        setEditPassedData(editedValue)
    }

    const onShowView = (view) => {
        if(view === "show")
            {
                setShowView(true)
            }
    }

    const setterView = (view) => {
        setInheritedView(view)
    }

    return (
            <div>
                { showView === true ?
                <div className="w-full flex flex-wrap">
                {
                    dataMahasiswa.map((item,i) => {
                        return (
                            <div className="md:w-3/12 sm:w-6/12 w-full" key={item[0]}>
                                <div className="mx-2 flex flex-wrap shadow-2xl py-5 px-4 rounded-lg">
                                    <div className="w-10/12">
                                        <Card className="" data={item[1]} />
                                    </div>
                                    <div className="min-w-min mr-3">
                                        <button onClick={deleteHandler} value={item[1].id} className="bg-red-600 text-white rounded-lg text-xs px-3 py-1 border-none shadow-whitebg-light hover:opacity-60">Delete</button>
                                    </div>
                                    <div className="min-w-min">
                                        <button className="bg-blue-600 text-white rounded-lg text-xs px-3 py-1 border-none shadow-whitebg-light hover:opacity-60" onClick={editHandler(item)}>Edit</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
                :
                <EditComponent  data={editPassedData} onShowView={onShowView} view={view} setterView={setterView} now={inheritedView}/>
                }
            </div>
    )
}
