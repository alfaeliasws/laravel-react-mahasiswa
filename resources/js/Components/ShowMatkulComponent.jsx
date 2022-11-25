import { useConsoleLog } from "@/Helper/useConsoleLog"
import axios from "axios"
import { useEffect, useState } from "react"
import EditMatkulComponent from "./EditMatkulComponent"
import LoadingComponent from "./LoadingComponent"
import TableShowMatkul from "./TableShowMatkul"

export default function ShowMatkulComponent(){

    const [isBusy, setIsBusy ] = useState(true)
    const [currentView, setCurrentView] = useState("show")
    const [data,setData] = useState([])
    const [isDelete, setIsDelete] = useState("none")
    const [editedData, setEditedData] = useState([])

    const fetchMatkulData = async () => {
        axios.get("/fetchdatamatkul")
            .then((response) => {
                setIsBusy(false)
                setData(response.data.data)
            }).catch((error) => console.error(error))
    }

    useEffect(()=>{
        fetchMatkulData()
        console.log(data)
    },[])

    useEffect(()=>{
    },[isDelete === "false"])

    const onEdit = (e) => {
        e.preventDefault()

        axios.get(`/editedassign/${e.target.value}`).then(
            (response)  => {
                setEditedData(response.data[0]);
                setIsBusy(true)
            }
        )
        .then(() => {
            setIsBusy(false)})
        .then(() => {
            setCurrentView("edit")})
        .catch((error) => console.error(error))
    }

    async function onDelete (event) {
        setIsDelete("true")

        event.preventDefault()

        const deletedData = event.target.value

        const filteredData = data.filter((item) => {
            return item.id != deletedData
        })

        setData(filteredData)

        await axios.delete(`/deleterecord/${deletedData}`)
        .then((response) => {
            setIsDelete("false")
        }).catch(error => console.error(error))

    }

    const onShowView = (view) => {
        setCurrentView(view)
    }

    return (
        <div className="w-full">
            {
                !isBusy ?
                (
                    currentView === "show"
                    ?
                    <div className="overflow-x-auto overflow-scroll flex flex-wrap overflow-y-auto max-h-[500px]">
                        <TableShowMatkul header="true" target="Target SKS" hari="Hari" waktu="Waktu" className="min-h-min bg-slate-300 py-3" nama="Nama" nim="NIM" semester="Sem" fakultas="Fakultas" jurusan="Jurusan" mataKuliah="Nama Mata Kuliah" mataKuliahId="MKID" dosenPengajar="Dosen Pengajar" jumlahSKS="Jumlah SKS"/>
                        {
                            data.map((item) => {
                                return <TableShowMatkul onEdit={onEdit} onDelete={onDelete} target={item.target_sks} hari={item.hari} waktu={item.waktu} key={item.id} jadwalId={item.id} className="min-h-min py-3" nama={item.name} nim={item.id_mahasiswa} semester={item.semester_id} fakultas={item.fakultas} jurusan={item.jurusan} mataKuliah={item.mata_kuliah} mataKuliahId={item.mata_kuliah_id} dosenPengajar={item.dosen_pengajar} jumlahSKS={item.jumlahSKS}/>
                            })
                        }
                    </div>
                    :
                    (
                        editedData.name &&
                        <EditMatkulComponent onShowView={onShowView} data={editedData}/>
                    )
                )
                :
                <LoadingComponent/>
            }
        </div>
    )
}
