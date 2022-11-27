import Card from "./Card"
import { useEffect, useState } from "react"
import EditComponent from "./EditComponent";
import LoadingComponent from "./LoadingComponent";

//PARENT COMPONENT Dashboard -> AdminDashboard -> AdminMahasiswaView

//show mahasiswa
export default function ShowComponent({data,  view, openEditView, editMahasiswaView, onShowView}){

    //STATE
    //where data of all mahasiswa stored
    const [dataMahasiswa,setDataMahasiswa] = useState([])

    //store actions for refetching and rerender
    const [deleteAction, setDeleteAction] = useState(false);

    //store data that is passed
    const [editPassedData, setEditPassedData] = useState({});


    //RENDERER
    //first render to view
    useEffect(()=>{
        onShowView()
    },[])

    //conditional renderer dependent to view, and editMahasiswaView and deleteAction
    useEffect(()=>{
        if(deleteAction == false){
            setDataMahasiswa(data.data);
        }
    },[view])


    //EVENT HANDLER
    const deleteHandler = async (e) => {

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
            console.log(response)
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
            dataMahasiswa ?
            <div>
                { editMahasiswaView === false  ?
                <div className="w-full flex flex-wrap">
                {
                    dataMahasiswa.map((item,i) => {
                        return (
                            <div className="w-full lg:w-1/5 md:w-4/12 " key={item.id}>
                                <div className="mx-2 flex flex-wrap shadow-whitebg-medium h-[280px] pb-4 px-4 rounded-lg">
                                    <div className="w-11/12 max-h-[250px] overflow-y-hidden">
                                        <Card data={item} />
                                    </div>
                                    <div className="h-[60px] w-full flex">
                                        <div className="w-4/12">
                                            <button className="hover:text-sm bg-blue-600 text-white rounded-lg text-xs px-3 py-1 border-none shadow-whitebg-light hover:opacity-60 transition-all" onClick={editHandler(item)}>Edit</button>
                                        </div>
                                        <div className="min-w-min">
                                            <button onClick={deleteHandler} value={item.id} className="bg-red-600 hover:bg-red-800 text-white rounded-lg text-xs px-3 py-1 border-none shadow-whitebg-light hover:saturate-200 transition-all hover:text-sm">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
                :
                <EditComponent  data={editPassedData} onShowView={onShowView} view={editMahasiswaView}/>
                }
            </div> :
            <LoadingComponent></LoadingComponent>
    )
}
