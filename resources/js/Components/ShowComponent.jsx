import Card from "./Card"
import { useEffect, useState } from "react"
import EditComponent from "./EditComponent";
import LoadingComponent from "./LoadingComponent";
import { ContentParagraphBlack } from "./Paragraph";
import FormInputText from "./FormInputText";

//PARENT COMPONENT Dashboard -> AdminDashboard -> AdminMahasiswaView

//show mahasiswa
export default function ShowComponent({ openEditView, editMahasiswaView, onShowView}){

    //STATE
    //where data of all mahasiswa stored
    const [dataMahasiswa,setDataMahasiswa] = useState([])
    const [fetchedData, setFetchedData] = useState([])
    const [cachedDataMahasiswa, setCachedDataMahasiswa] = useState([])
    const [modifiedData, setModifiedData] = useState([])

    //busyness
    const [isBusy, setIsBusy] = useState(false)

    //one data
    const [oneData, setOneData] = useState("empty")

    //search bar handler
    const [search, setSearch] = useState("")

    //store actions for refetching and rerender
    const [deleteAction, setDeleteAction] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deletedId, setDeletedId] = useState()

    //store data that is passed
    const [editPassedData, setEditPassedData] = useState({});

    async function fetchDataMahasiswa(){
        setIsBusy(true)
        // console.log("start fetching")
        await axios.get("/fetchdatamahasiswa")
        .then((response) =>
        {
            // console.log(response.data.data)
            setDataMahasiswa(response.data.data)
            setFetchedData(response.data.data)
            setIsBusy(false)
        }).catch(error => console.error(error))
    }


    //RENDERER
    //first render to view
    useEffect(()=>{
        onShowView()
        setIsBusy(true)
        fetchDataMahasiswa()
    },[])

    //conditional renderer dependent to the change of search component
    useEffect(()=>{
        setModifiedData(fetchedData)
        const filtered = modifiedData.filter((item) => {
            return (
                        item.name.toLowerCase().includes(search.toLowerCase()) ||
                        item.fakultas.toLowerCase().includes(search.toLowerCase()) ||
                        item.jurusan.toLowerCase().includes(search.toLowerCase()) ||
                        item.id_mahasiswa.toLowerCase().includes(search.toLowerCase())
                    )
        })
        if(filtered.length === 0) setOneData("null")
        if(filtered.length === 1) setOneData("one")
        if(filtered.length > 1) setOneData("full")
        setDataMahasiswa(filtered)
    },[search])

    //conditional renderer dependent to editMahasiswaView and deleteAction
    useEffect(()=>{
        fetchDataMahasiswa()
        setOneData("full")
        if(deleteAction == false){
            fetchDataMahasiswa()
            setCachedDataMahasiswa(fetchedData)
            setIsBusy(false)
        }
    },[editMahasiswaView])

    //SEARCH BAR
    const searchHandler = (e) => {
        e.preventDefault()
        setSearch(e.target.value)

        if(search === ""){
            setDataMahasiswa(cachedDataMahasiswa)
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
        fetchMatkulData()
        setOneData("full")
        setIsBusy(false)
    }

    //EVENT HANDLER
    async function deleteHandler (e) {

        setIsBusy(true)
        e.preventDefault()

        const deletedData = e.target.value

        let filteredData = [];
        filteredData = dataMahasiswa.filter((item)=>{
            return item.id != deletedData
        })

        setDeleteAction(true)

        setDataMahasiswa(filteredData)

        await axios.delete(`/deletemahasiswa/${deletedData}`)
        .then((response) => {
            setDeleteModal(false)
            setOneData("full")
            fetchDataMahasiswa()
        }).catch(error => console.error(error))
    }

    //set the state of above parents using openEditView() to change the state to edit
    const editHandler = item => e => {
        e.preventDefault()
        openEditView()

        const editedValue = item
        setEditPassedData(editedValue)
    }

    //returned html
    //if the view is not edit then we show all the data mahasiswa
    //if the view is edit then we edit the data
    //no loading because there is no fetching in getting data displayed
    return (
            dataMahasiswa && !isBusy ?
            <div>
            {
                deleteModal === true
                ?
                //if dataMahasiswa exists and delete modal is triggered
                <div className="w-full flex flex-wrap min-h-min">
                    <ContentParagraphBlack>Are you sure want to delete this data?</ContentParagraphBlack>
                    <button onClick={deleteHandler} value={deletedId} className="bg-red-600 mr-2 hover:bg-red-800 text-white rounded-lg text-xs px-3 py-1 border-none shadow-whitebg-light hover:saturate-200 transition-all hover:text-sm">Delete</button>
                    <button className="hover:text-sm bg-blue-600 text-white rounded-lg text-xs px-3 py-1 border-none shadow-whitebg-light hover:opacity-60 transition-all" onClick={cancelDelete}>Cancel</button>
                </div>
                :
                ( editMahasiswaView === false  ?
                    //if editMahasiswaView is false (render show array)
                    <div className="w-full flex flex-wrap">
                        <div className="w-full ml-1 mb-4">
                            <FormInputText onChange={searchHandler} placeholder="Search record..." className="w-4/12 border-none"/>
                        </div>
                    {
                        oneData === "null" ?
                        //if there is no data
                        <div>
                            <ContentParagraphBlack>No Record</ContentParagraphBlack>
                        </div>
                        :
                        //if there is only one data
                        oneData === "one" ?
                        <div>
                            <ContentParagraphBlack>Nama Mahasiswa: {dataMahasiswa[0]?.name}</ContentParagraphBlack>
                            <ContentParagraphBlack>NIM: {dataMahasiswa[0]?.id_mahasiswa}</ContentParagraphBlack>
                            <ContentParagraphBlack>Alamat: {dataMahasiswa[0]?.alamat}</ContentParagraphBlack>
                            <ContentParagraphBlack>Nomor Telepon: {dataMahasiswa[0]?.nomor_telepon}</ContentParagraphBlack>
                            <ContentParagraphBlack>{dataMahasiswa[0]?.fakultas}</ContentParagraphBlack>
                            <ContentParagraphBlack>{dataMahasiswa[0]?.jurusan}</ContentParagraphBlack>
                            <ContentParagraphBlack>Semester {dataMahasiswa[0]?.semester}</ContentParagraphBlack>
                            <div className="w-full flex">
                                <div className="w-5/12 mr-3">
                                    <button className="bg-blue-600 w-full text-white rounded-lg text-xs px-3 py-2 border-none shadow-whitebg-light hover:opacity-60" onClick={editHandler(dataMahasiswa[0])} value={dataMahasiswa[0].id}>Edit</button>
                                </div>
                                <div className="w-5/12 mr-2">
                                    <button onClick={deleteModalHandler} className="w-full bg-red-600 text-white rounded-lg text-xs px-3 py-2 border-none shadow-whitebg-light hover:opacity-60" value={dataMahasiswa[0].id}>Delete</button>
                                </div>
                            </div>
                        </div>
                        :
                        // if there is many data
                        dataMahasiswa.map((item,i) => {
                            return (
                                <div className="w-full lg:w-1/5 md:w-4/12 " key={item.id}>
                                    <div className="mx-2 flex flex-wrap shadow-whitebg-medium h-[280px] pb-4 px-4 rounded-lg">
                                        <div className="w-11/12 max-h-[250px] overflow-y-hidden">
                                            <Card data={item} />
                                        </div>
                                        <div className="h-[60px] w-full flex">
                                            <div className="md:w-4/12 sm:w-min-2 sm:mr-2">
                                                <button className="hover:text-sm bg-blue-600 text-white rounded-lg text-xs px-3 py-1 border-none shadow-whitebg-light hover:opacity-60 transition-all" onClick={editHandler(item)}>Edit</button>
                                            </div>
                                            <div className="min-w-min">
                                                <button onClick={deleteModalHandler} value={item.id} className="bg-red-600 hover:bg-red-800 text-white rounded-lg text-xs px-3 py-1 border-none shadow-whitebg-light hover:saturate-200 transition-all hover:text-sm">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
                :
                // if editMahasiswaView true
                <EditComponent  data={editPassedData} onShowView={onShowView} view={editMahasiswaView}/>
                )
            }
            </div>
            :
            //if isBusyis true
            <LoadingComponent/>
        )
}
