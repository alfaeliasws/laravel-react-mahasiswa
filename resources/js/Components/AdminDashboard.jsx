import { useConsoleLog } from "@/Helper/useConsoleLog"
import axios from "axios"
import AdminMahasiswaView from "./AdminMahasiswaView"
import AdminMatkulView from "./AdminMatkulView"
import { ContentParagraphBlack, MiniTextBlack } from "./Paragraph"
import { useState, useEffect, useRef } from "react"
import { viewChanger } from "@/Helper/viewChanger"
import { useVariableCatcher } from "@/Helper/useVariableCatcher"
import LoadingComponent from "./LoadingComponent"

// Parent COMPONENT Dashboard

//Dashbord shown by admin and where the state of the view controlled
export default function AdminDashboard({view, data}){

    //see the view that is passed down to this component
    let currentView = view

    //STATE
    //check if the site is loading data if false then the component can be rendered
    const [isBusy, setIsBusy] = useState(true);

    //data of all mahasiswa that will be shown
    const [dataMahasiswa,setDataMahasiswa] = useState({})

    //the controller of the view when the view is mahasiswa
    const [showMahasiswaView, setShowMahasiswaView] = useState(true);
    const [createMahasiswaView, setCreateMahasiswaView] = useState(false);
    const [editMahasiswaView, setEditMahasiswaView] = useState(false);

    //set what is viewed in mahasiswa view
    const [mahasiswaView, setMahasiswaView ] = useState("");

    //the controller of the view when the view is matkul
    const [showMatkulView, setShowMatkulView] = useState(true);
    const [createMatkulView, setCreateMatkulView] = useState(false);
    const [editMatkulView, setEditMatkulView] = useState(false);

    //set what is viewed in matkul view
    const [matkulView, setMatkulView ] = useState("");

    //RENDERER AND FETCHER
    //Fetch Data Mahasiswa when first fetching
    useEffect(()=>{
        // console.log("1st useEffect")
        fetchDataMahasiswa();
    },[])

    //check if there is a change of state of showMahasiswaView/createMahasiswaView and then set the view right
    useEffect(()=>{
        // console.log("setView useEffect")

        //show mahasiswa if show
        if(showMahasiswaView && !createMahasiswaView && !editMahasiswaView ){
            setMahasiswaView("show")

        //create mahasiswa if create
        }else if(createMahasiswaView){
            setMahasiswaView("create")

        //show mahasiswa as default
        }else {
            setMahasiswaView("show")
        }
    },[showMahasiswaView, createMahasiswaView])

    //check if there is a change of state of showMatkulView/createMatkulView and then set the view right
    useEffect(()=>{
        // console.log("setView useEffect")

        //show matkul if show
        if(showMatkulView && !createMatkulView && !editMatkulView){
            setMatkulView("show")

            //create matkul if create
        }else if(createMatkulView){
            setMatkulView("create")

            //show mahasiswa as default
        }else {
            setMatkulView("show")
        }
    },[showMatkulView, createMatkulView])


    //FETCHER FUNCTIONS
    //Fetcher Data Mahasiswa function
    async function fetchDataMahasiswa(){
        // console.log("start fetching")
        await axios.get("/fetchdatamahasiswa")
        .then((response) =>
        {
            // console.log("finish fetching")
            setDataMahasiswa(response.data)
            setEditMatkulView(false)
            setEditMahasiswaView(false)
            setShowMahasiswaView(true)
            setIsBusy(false)
        }).catch(error => console.error(error))
    }


    //EVENT HANDLER
    //eventHandler onClick when show button in mahasiswa view is clicked
    const openMahasiswaShowView = (e) =>{
        // console.log("trigger show")
        viewChanger(showMahasiswaView, setShowMahasiswaView, "boolean" ,e)
        setEditMahasiswaView(false)
        setCreateMahasiswaView(false)
    }

    //eventHandler onClick when show in mahasiswa view is clicked
    const openMahasiswaCreateView = (e) =>{
        viewChanger(createMahasiswaView, setCreateMahasiswaView, "boolean" ,e);
        setShowMahasiswaView(false)
    }


    //eventHandler onClick when show button in matkul view is clicked
    const openMatkulCreateView = (e) =>{
        viewChanger(createMatkulView, setCreateMatkulView, "boolean" ,e)
        setShowMatkulView(false)
    }

    //eventHandler onClick when add button in matkul view is clicked
    const openMatkulShowView = (e) =>{
        viewChanger(showMatkulView, setShowMatkulView, "boolean" ,e)
        setEditMatkulView(false)
        setCreateMatkulView(false)
    }

    //Check edit view (given by the children)
    const openEditView = () =>{
            if(currentView == "matkul")viewChanger(editMatkulView, setEditMatkulView, "boolean")
            if(currentView == "mahasiswa") viewChanger(editMahasiswaView, setEditMahasiswaView, "boolean")
    }

    //VIEW CHANGER
    function onShowView () {
            setEditMahasiswaView(false)
            setShowMahasiswaView(true)
    }

    //returned value if isBusy false then render start,
    // if view is mahasiswa then render the true first condition,
    // if view is matkul render the second true condition
    // if isBusy true then loading
    return (
        <div>
            {
                isBusy === false ?
                (currentView == "mahasiswa" ?
                <div>
                    <div className='w-full'>
                        <div className="flex md:flex-wrap space-x-4 py-4 px-3 md:px-0">
                            <button onClick={openMahasiswaShowView} className="py-2 sm:text-base shadow-2xl hover:bg-blue-900 md:w-3/12 w-6/12  bg-blue-800 text-white border-none rounded-lg text-xs md:text-base">Show</button>
                            <button onClick={openMahasiswaCreateView} className="py-2 sm:text-base shadow-2xl hover:bg-blue-900 md:w-3/12 w-6/12 md:py-2 bg-blue-800 text-white border-none rounded-lg text-xs md:text-base">Add</button>
                        </div>
                    </div>
                    <AdminMahasiswaView data={dataMahasiswa} view={mahasiswaView} editMahasiswaView={editMahasiswaView} openEditView={openEditView} fetchDataMahasiswa={fetchDataMahasiswa} onShowView={onShowView}/>
                </div> :
                currentView == "matkul" ?
                <div>
                    <div className='w-full'>
                        <div className="flex flex-wrap space-x-4 py-4">
                            <button onClick={openMatkulShowView} className="py-2 sm:text-base shadow-2xl hover:bg-blue-900 md:w-2/12 w-3/12 bg-blue-800 text-white border-none rounded-lg text-xs md:text-base">Show</button>
                            <button onClick={openMatkulCreateView} className="py-2 sm:text-base shadow-2xl hover:bg-blue-900 md:w-2/12 w-3/12  bg-blue-800 text-white border-none rounded-lg text-xs md:text-base">Add</button>
                        </div>
                    </div>
                    <AdminMatkulView data={data} view={matkulView} editMatkulView={editMatkulView} openEditView={openEditView} />
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
