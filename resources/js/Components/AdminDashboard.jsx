import { useConsoleLog } from "@/Helper/useConsoleLog"
import axios from "axios"
import AdminMahasiswaView from "./AdminMahasiswaView"
import AdminMatkulView from "./AdminMatkulView"
import { ContentParagraphBlack, MiniTextBlack } from "./Paragraph"
import { useState, useEffect, useRef } from "react"
import { viewChanger } from "@/Helper/viewChanger"
import { useVariableCatcher } from "@/Helper/useVariableCatcher"
import LoadingComponent from "./LoadingComponent"

export default function AdminDashboard({view, data}){

    let currentView = view

    const [dataMahasiswa,setDataMahasiswa] = useState({})
    const [mahasiswaView, setMahasiswaView] = useState(false)
    const [isBusy, setIsBusy] = useState(true);

    const [showMahasiswaView, setShowMahasiswaView] = useState(true);
    const [createMahasiswaView, setCreateMahasiswaView] = useState(false);
    const [adminMahasiswaView, setAdminMahasiswaView ] = useState("");

    const [showMatkulView, setShowMatkulView] = useState(true);
    const [createMatkulView, setCreateMatkulView] = useState(false);
    const [adminMatkulView, setAdminMatkulView ] = useState("");

    const [loading, setLoading] = useState(false);
    const [fetched, setFetched] = useState(false);

    useEffect(()=>{
        // console.log("1st useEffect")
        setMahasiswaView(true)
        setLoading(true)
        fetchDataMahasiswa();
        setFetched(true)
    },[])

    let trigger = useRef();

    async function fetchDataMahasiswa(){
        // console.log("start fetching")
        await axios.get("/fetchdatamahasiswa")
        .then((response) =>
        {
            // console.log("finish fetching")
            setDataMahasiswa(response.data)
            setLoading(false)
            setIsBusy(false)

            // setDataMahasiswa(response.data)
        }).catch(error => console.error(error))
    }

    const openMahasiswaShowView = (e) =>{
        // console.log("trigger show")
        viewChanger(showMahasiswaView, setShowMahasiswaView, "boolean" ,e)
        setCreateMahasiswaView(false)
    }

    const openMahasiswaCreateView = (e) =>{
        viewChanger(createMahasiswaView, setCreateMahasiswaView, "boolean" ,e);
        setShowMahasiswaView(false)
    }

    useEffect(()=>{
        // console.log("setView useEffect")
        if(showMahasiswaView && !createMahasiswaView){
            setAdminMahasiswaView("show")
        }else if(createMahasiswaView){
            setAdminMahasiswaView("create")
        }else {
            setAdminMahasiswaView("show")
        }
    },[showMahasiswaView, createMahasiswaView])

    useEffect(()=>{
        // console.log("setView useEffect")
        if(showMatkulView && !createMatkulView){
            setAdminMatkulView("show")
        }else if(createMatkulView){
            setAdminMatkulView("create")
        }else {
            setAdminMatkulView("show")
        }
    },[showMatkulView, createMatkulView])

    const openMatkulCreateView = (e) =>{
        viewChanger(createMatkulView, setCreateMatkulView, "boolean" ,e)
        setShowMatkulView(false)
    }

    const openMatkulShowView = (e) =>{
        viewChanger(showMatkulView, setShowMatkulView, "boolean" ,e)
        setCreateMatkulView(false)
    }

    return (
        <div>
            {
                isBusy === false ?
                (currentView == "mahasiswa" ?
                <div>
                    <div className='w-full'>
                        <div className="flex flex-wrap space-x-4 py-4">
                            <button onClick={openMahasiswaShowView} className="shadow-2xl hover:bg-blue-900 md:w-2/12 w-3/12 md:py-2 py-1 bg-blue-800 text-white border-none rounded-lg">{fetched === false ? "Open" : "Show"}</button>
                            <button onClick={openMahasiswaCreateView} className="shadow-2xl hover:bg-blue-900 md:w-2/12 w-3/12 md:py-2 py-1 bg-blue-800 text-white border-none rounded-lg">Add</button>
                        </div>
                    </div>
                    <AdminMahasiswaView data={dataMahasiswa} view={adminMahasiswaView}/>
                </div> :
                currentView == "matkul" ?
                <div>
                    <div className='w-full'>
                        <div className="flex flex-wrap space-x-4 py-4">
                            <button onClick={openMatkulShowView} className="shadow-2xl hover:bg-blue-900 md:w-2/12 w-3/12 md:py-2 py-1 bg-blue-800 text-white border-none rounded-lg">{fetched === false ? "Open" : "Show"}</button>
                            <button onClick={openMatkulCreateView} className="shadow-2xl hover:bg-blue-900 md:w-2/12 w-3/12 md:py-2 py-1 bg-blue-800 text-white border-none rounded-lg">Add</button>
                        </div>
                    </div>
                    <AdminMatkulView data={data} view={adminMatkulView}/>
                </div>
                :
                <div>
                    <ContentParagraphBlack>{data.user_data.name}'s Dashboard</ContentParagraphBlack>
                    <MiniTextBlack className="text-gray-500 text-sm">{data.user_data.position}</MiniTextBlack>
                    <MiniTextBlack className="text-gray-500 text-sm">{data.login_id}</MiniTextBlack>
                </div>) :
           <LoadingComponent/>
        }
        </div>
    )
}
