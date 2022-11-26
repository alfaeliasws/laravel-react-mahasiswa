import { useEffect, useState } from "react";
import FormInputText from "./FormInputText";
import FormInputNumber from "./FormInputNumber";
import axios from "axios";
import { MiniTextBlack, ContentParagraphBlack } from "./Paragraph";
import { useConsoleLog } from "@/Helper/useConsoleLog";
import LoadingComponent from "./LoadingComponent";

//component when edit matkul button is called
export default function EditMatkulComponent({data, openEditView}){

    //STATE
    //isBusy true is download
    const [isBusy, setIsBusy] = useState(true);

    //validation
    const [validation, setValidation] = useState("empty")

    //all data mata kuliah
    const [dataMataKuliah, setDataMataKuliah] = useState([])

    //store selected jadwal and mata kuliah
    const [selectedMataKuliah, setSelectedMataKuliah] = useState({})
    const [selectedJadwal, setSelectedJadwal] = useState(0)

    //store option
    const [optionMataKuliah, setOptionMataKuliah] = useState([])
    const [optionHari, setOptionHari] = useState([])


    //FETCHER FUNCTIONS
    const fetchJadwalKuliah = async (id) => {
        await axios.get(`/fetchjadwal/${id}`).then(
            (response) => {

                const hariArray = [...response.data.data].map((item) => {
                    return {
                        label: `${item.hari} ${item.waktu}`,
                        key: item.id
                    }
                })
                setOptionHari(hariArray)

            })
            .catch((err) => console.error(err))
    }

    const fetchMataKuliah = async (id) => {
        await axios.get(`/fetchmatakuliah/${id}`).then(
            (response) => {
                setDataMataKuliah(response.data.data)
                setIsBusy(false)
                const matkul = [...response.data.data].map((item) => {
                    return {
                        value: item.id,
                        label: item.mata_kuliah_id + " - " + item.mata_kuliah
                    }
                })
                setOptionMataKuliah(matkul)
            })
            .catch((err) => console.error(err))
    }


    //RENDERER AND FETCHER CALL
    useEffect(() => {
        if(data) {
            setValidation("validation approved")
            fetchMataKuliah(data.jurusan_id)
        }
        // if(!data) openEditView("showView")
    },[])


    //EVENT HANDLER
    const mataKuliahHandler = (e) => {
        e.preventDefault()

        const selectedMataKuliahArray = dataMataKuliah.filter((item) => item.id == e.target.value)

        setSelectedMataKuliah(selectedMataKuliahArray[0])

        fetchJadwalKuliah(selectedMataKuliahArray[0].mata_kuliah_id)

    }

    const hariHandler = (e) => {
        e.preventDefault()

        const passedJadwal = parseInt(e.target.value)

        setSelectedJadwal(passedJadwal)
    }


    //PUT DATA TO DATABASE
    const submitHandler = async (e) => {
        e.preventDefault()

        const dataSet = {
            mahasiswa_id: data.mahasiswa_id,
            semester_id: data.semester_id,
            fakultas_id: data.fakultas_id,
            jurusan_id: data.jurusan_id,
            mata_kuliah_id: selectedMataKuliah.id,
            jadwal_id: selectedJadwal
        }

        axios.put(`/editassignedmatakuliah/${data.id}`,dataSet).then((response) => {
            console.log(response)
            setValidation("berhasil")
        }).catch((error)=>console.error(error))
    }

    //returned components
    //return loading if the data is not there
    //return form if the data passed accordingly and mata kuliah fetched
    //return success announcement if data submission succeed
    return (
            <div>
                {
                    isBusy === false && data.name
                    ?
                    (
                        validation === "berhasil" ?
                        <ContentParagraphBlack>Perbaikan Jadwal Kuliah Berhasil!</ContentParagraphBlack>
                        :
                        <div>
                            <ContentParagraphBlack>Perbaikan Jadwal Mahasiswa</ContentParagraphBlack>
                            <form onSubmit={submitHandler}>
                                <FormInputText label="Nama" placeholder="Ketik Nama" value={data.name} readOnly={true}/>
                                <div>
                                    <div className="flex flex-wrap">
                                        <label htmlFor="fakultasSelect" className="w-full h-min-h">Fakultas</label>
                                        <select id="fakultasSelect" className="w-full rounded-md" defaultValue={data.fakultas_id} >
                                                <option value={data.fakultas_id} key={data.fakultas_id} >{data.fakultas}</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-wrap">
                                        <label htmlFor="jurusanSelect" className="w-full h-min-h">Jurusan</label>
                                        <select id="jurusanSelect" className="w-full rounded-md" defaultValue= {data.jurusan_id}>
                                                <option value={data.jurusan_id} key={data.jurusan_id} >{data.jurusan}</option>
                                        </select>
                                    </div>
                                    <FormInputNumber label="Semester" placeholder="Semester" value={data.semester_id} readOnly={true}/>
                                    <div className="flex flex-wrap">
                                        <label htmlFor="mataKuliahSelect" className="w-full h-min-h">Mata Kuliah</label>
                                        <select id="mataKuliahSelect" className="w-full rounded-md" defaultValue="initial" onChange={mataKuliahHandler}>
                                            <option value="initial">Pilih Mata Kuliah</option>
                                            {optionMataKuliah.map((item) => {
                                                return <option value={item.value} key={item.value}>{item.label}</option>
                                            })}
                                        </select>
                                        {selectedMataKuliah ? <MiniTextBlack className="text-gray-800">Pengajar - {selectedMataKuliah.dosen_pengajar}, Jumlah SKS - {selectedMataKuliah.jumlahSKS}</MiniTextBlack> : <div></div>}
                                    </div>
                                    <div className="flex flex-wrap">
                                        <label htmlFor="jadwalHariSelect" className="w-full h-min-h">Hari</label>
                                        <select id="jadwalHariSelect" className="flex w-full rounded-md" defaultValue="initial" onChange={hariHandler}>
                                            <option value="initial">Pilih Hari</option>
                                            {optionHari.map((item) => {
                                                return <option value={item.key} key={item.key}>{item.label}</option>
                                            })}
                                        </select>
                                    </div>
                                    <button type="submit" className="text-xs sm:text-base py-2 mt-2 shadow-2xl hover:bg-blue-900 md:w-2/12 w-3/12 bg-blue-800 text-white border-none rounded-lg">Submit</button>
                                </div>
                                </form>
                            </div>
                    )
                    :
                    <LoadingComponent/>
                }
            </div>
    )
}
