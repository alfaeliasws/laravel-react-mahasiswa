import { useConsoleLog } from "@/Helper/useConsoleLog"
import { viewChanger } from "@/Helper/viewChanger"
import axios from "axios"
import { useEffect, useState } from "react"
import EditMatkulComponent from "./EditMatkulComponent"
import LoadingComponent from "./LoadingComponent"
import TableShowMatkul from "./TableShowMatkul"
import { ContentParagraphBlack } from "./Paragraph"
import FormInputText from "./FormInputText"

//Parent COMPONENT Dashboard -> AdminDashboard -> AdminMatkulView
export default function ShowMatkulComponent({openEditView, editMatkulView}){

    //STATE
    //if busy then loading component rendered
    const [isBusy, setIsBusy ] = useState(true)

    //setCurrent view edit or show
    const [currentView, setCurrentView] = useState(editMatkulView)
    const [oneData, setOneData] = useState("empty")

    //deleteModal State
    const [deleteModal, setDeleteModal] = useState(false);
    const [deletedId, setDeletedId] = useState()

    //setData to store in an array
    const [data,setData] = useState([])
    const [cachedData, setCachedData] = useState([])
    const [modifiedData, setModifiedData] = useState([])

    //search bar
    const [search, setSearch] = useState("")


    //store data that will be passed for editing
    const [editedData, setEditedData] = useState([])

    //FUNCTION FETCHER
    const fetchMatkulData = async () => {
        axios.get("/fetchdatamatkul")
            .then((response) => {
                setData(response.data.data)
                setCachedData(response.data.data)
                setOneData("full")
                setIsBusy(false)
            }).catch((error) => console.error(error))
    }

    //RENDER in dependency of the passed editMatkulView and currentView
    useEffect(()=>{
        fetchMatkulData()
        setCurrentView(editMatkulView)
        setSearch("")
    },[editMatkulView])

    useEffect(()=>{
        fetchMatkulData()
        setCurrentView(false)
        setSearch("")
    },[])

    useEffect(()=>{
        setModifiedData(cachedData)
        const filtered = modifiedData.filter((item) => {
        return (
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.fakultas.toLowerCase().includes(search.toLowerCase()) ||
            item.jurusan.toLowerCase().includes(search.toLowerCase()) ||
            item.mata_kuliah.toLowerCase().includes(search.toLowerCase()) ||
            item.id_mahasiswa.toLowerCase().includes(search.toLowerCase())
            )
        })
        if(cachedData && filtered.length === 0) setOneData("null")
        if(filtered.length === 1) setOneData("one")
        if(filtered.length > 1) setOneData("full")
        setData(filtered)
    },[search])

    //SEARCH BAR
    useEffect(()=>{
        setModifiedData(cachedData)
        const filtered = modifiedData.filter((item) => {
            return (
                        item.name.toLowerCase().includes(search.toLowerCase()) ||
                        item.fakultas.toLowerCase().includes(search.toLowerCase()) ||
                        item.jurusan.toLowerCase().includes(search.toLowerCase()) ||
                        item.mata_kuliah.toLowerCase().includes(search.toLowerCase()) ||
                        item.id_mahasiswa.toLowerCase().includes(search.toLowerCase())
                    )
        })
        setData(filtered)
    },[search])

    //SEARCH
    const searchHandler = (e) => {
        e.preventDefault()
        setSearch(e.target.value)

        if(search === ""){
            setData(cachedData)
        }

        }

    //DELETE MODAL
    const deleteModalHandler = (e)=>{
        e.preventDefault()

        setDeletedId(e.target.value)
        setDeleteModal(true)
    }

    const cancelDelete = (e) => {
        e.preventDefault()

        setDeleteModal(false)
    }


    //EVENT HANDLER
    //if edit button clicked
    const onEdit = (e) => {
        e.preventDefault()

        openEditView()

        axios.get(`/editedassign/${e.target.value}`).then(
            (response)  => {
                setEditedData(response.data[0]);
                setIsBusy(true)
            }
        )
        .then(() => {
            setIsBusy(false)})
        .then(() => {
            viewChanger(currentView, setCurrentView, "boolean")})
        .catch((error) => console.error(error))
    }

    //if delete function clicked
    async function onDelete (event) {
        event.preventDefault()

        setIsBusy(true)
        const deletedData = event.target.value

        const filteredData = data.filter((item) => {
            return item.id != deletedData
        })

        setData(filteredData)

        await axios.delete(`/deleterecord/${deletedData}`)
        .then((response) => {
            setDeleteModal(false)
            setIsBusy(false)
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
                    deleteModal
                    ?
                    <div className="w-full flex flex-wrap min-h-min">
                        <ContentParagraphBlack>Are you sure want to delete this data?</ContentParagraphBlack>
                        <button onClick={onDelete} value={deletedId} className="bg-red-600 mr-2 hover:bg-red-800 text-white rounded-lg text-xs px-3 py-1 border-none shadow-whitebg-light hover:saturate-200 transition-all hover:text-sm">Delete</button>
                        <button className="hover:text-sm bg-blue-600 text-white rounded-lg text-xs px-3 py-1 border-none shadow-whitebg-light hover:opacity-60 transition-all" onClick={cancelDelete}>Cancel</button>
                    </div>
                    :
                    (currentView === false
                        ?
                            <div className="overflow-x-auto overflow-scroll flex flex-wrap overflow-y-auto max-h-[500px]">
                                <div className="w-full ml-1 mb-4">
                                    <FormInputText onChange={searchHandler} placeholder="Search record..." className="w-4/12 border-none"/>
                                </div>
                                { oneData === "null"  ?
                                <ContentParagraphBlack>No Record</ContentParagraphBlack>
                                :
                                oneData === "one" ?
                                <div>
                                    <ContentParagraphBlack>Nama Mahasiswa: {data[0]?.name}</ContentParagraphBlack>
                                    <ContentParagraphBlack>NIM: {data[0]?.id_mahasiswa}</ContentParagraphBlack>
                                    <ContentParagraphBlack>Fakultas: {data[0]?.fakultas}</ContentParagraphBlack>
                                    <ContentParagraphBlack>Jurusan: {data[0]?.jurusan}</ContentParagraphBlack>
                                    <ContentParagraphBlack>Mata Kuliah: {`${data[0]?.mata_kuliah} - ${data[0]?.mata_kuliah_id}`}</ContentParagraphBlack>
                                    <ContentParagraphBlack>Jadwal: {`${data[0]?.hari} ${data[0].waktu}`}</ContentParagraphBlack>
                                    <ContentParagraphBlack>Dosen Pengajar: {data[0]?.dosen_pengajar}</ContentParagraphBlack>
                                    <ContentParagraphBlack>Jumlah SKS: {data[0]?.jumlahsks}</ContentParagraphBlack>
                                    <ContentParagraphBlack>Target SKS: {data[0]?.target_sks}</ContentParagraphBlack>
                                </div>
                                :
                                (
                                <div>
                                    <TableShowMatkul header="true" target="Target SKS" hari="Hari" waktu="Waktu" className="min-h-min bg-slate-300 py-3" nama="Nama" nim="NIM" semester="Sem" fakultas="Fakultas" jurusan="Jurusan" mataKuliah="Nama Mata Kuliah" mataKuliahId="MKID" dosenPengajar="Dosen Pengajar" jumlahSKS="Jumlah SKS"/>
                                        {
                                            data.map((item) => {
                                                return <TableShowMatkul onEdit={onEdit} onDelete={deleteModalHandler} target={item.target_sks} hari={item.hari} waktu={item.waktu} key={item.id} jadwalId={item.id} className="min-h-min py-3" nama={item.name} nim={item.id_mahasiswa} semester={item.semester_id} fakultas={item.fakultas} jurusan={item.jurusan} mataKuliah={item.mata_kuliah} mataKuliahId={item.mata_kuliah_id} dosenPengajar={item.dosen_pengajar} jumlahSKS={item.jumlahsks}/>
                                            })
                                        }
                                </div>
                                )
                            }
                            </div>
                        :
                            (
                                editedData.name &&
                                <EditMatkulComponent onShowView={onShowView} openEditView={openEditView} data={editedData}/>
                            )
                    )
                )
                :
                <LoadingComponent/>
            }
        </div>
    )
}
