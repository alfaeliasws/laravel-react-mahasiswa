import axios from "axios"
import { useEffect, useState } from "react"
import EditMatkulComponent from "./EditMatkulComponent"
import TableShowMatkul from "./TableShowMatkul"

export default function ShowMatkulComponent(){

    const [isBusy, setIsBusy ] = useState(true)
    const [currentView, setCurrentView] = useState("show")
    const [data,setData] = useState([])

    const fetchMatkulData = async () => {
        axios.get("/fetchdatamatkul")
            .then((response) => {
                setIsBusy(false)
                setData(response.data.data)
            }).catch((error) => console.error(error))
    }

    useEffect(()=>{
        fetchMatkulData()
    },[])

    function onEdit (item) {
        console.log({passedData: item})
    }

    function onDelete (event) {
        console.log({deleteHandler: event.target.value})
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
                    <div className="overflow-x-auto overflow-scroll flex flex-wrap">
                        <TableShowMatkul className="min-h-min bg-slate-300 py-3" nama="Nama" nim="NIM" semester="Sem" fakultas="Fakultas" jurusan="Jurusan" mataKuliah="Nama Mata Kuliah" mataKuliahId="MKID" dosenPengajar="Dosen Pengajar" jumlahSKS="Jumlah SKS"/>
                        {
                            data.map((item) => {
                                return <TableShowMatkul onEdit={onEdit} onDelete={onDelete} key={item.id} jadwalId={item.jadwal_id} className="min-h-min py-3" nama={item.name} nim={item.id_mahasiswa} semester={item.semester_id} fakultas={item.fakultas} jurusan={item.jurusan} mataKuliah={item.mata_kuliah} mataKuliahId={item.mata_kuliah_id} dosenPengajar={item.dosen_pengajar} jumlahSKS={item.jumlahSKS}/>
                            })
                        }
                    </div>
                    :
                    <EditMatkulComponent/>
                )
                :
                <div></div>
            }
        </div>
    )
}
