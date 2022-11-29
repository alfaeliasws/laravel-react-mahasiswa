import { useEffect, useState } from "react";
import FormInputText from "./FormInputText";
import { ContentParagraphBlack, MiniTextBlack } from "./Paragraph";
import FormInputNumber from "./FormInputNumber";
import LoadingComponent from "./LoadingComponent";

//Parent COMPONENT Dashboard -> AdminDashboard ->  AdminMatkulView

//component of create form for matkul
export default function AssignMatkulComponent(){

    //if loading then the component wont be rendered
    const [isBusy, setIsBusy] = useState(true);

    //the state that store the onChange
    const [name, setName] = useState("")
    const [jurusan, setJurusan] = useState("")
    const [fakultas, setFakultas] = useState("")
    const [semester, setSemester] = useState(0)
    const [selectedJadwal, setSelectedJadwal] = useState(0)

    //STATES
    //to check the name and fill the data right away according to the name
    const [nameValidation, setNameValidation] = useState("empty")

    //set selected data that is chosen
    const [selected, setSelected] = useState({})

    //store the data that is fetched
    const [dataMataKuliah, setDataMataKuliah] = useState([])
    const [dataMahasiswa, setDataMahasiswa] = useState([])

    //set selected mataKuliah
    const [selectedMataKuliah, setSelectedMataKuliah] = useState({})

    //make the option of select HTML tags
    const [optionFakultas, setOptionFakultas] = useState([])
    const [optionJurusan, setOptionJurusan] = useState([])
    const [optionMataKuliah, setOptionMataKuliah] = useState([])
    const [optionHari, setOptionHari] = useState([])

    //FETCHER FUNCTION
    //jadwal kuliah fetcher for Hari html select
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

    //mata kuliah fetcher for Mata Kuliah html select
    const fetchMataKuliah = async (id) => {
        await axios.get(`/fetchmatakuliah/${id}`).then(
            (response) => {
                setDataMataKuliah(response.data.data)
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

    //mata kuliah fetcher for Mahasiswa name checker
    const fetchMahasiswa = async () => {
        await axios.get("/fetchdatamahasiswa").then(
            (response) => {
                setDataMahasiswa(response.data.data)
                setIsBusy(false)
            })
            .catch((err) => console.error(err?.response?.data.message))
    }

    //jurusan fetcher for Jurusan html select setIsBusy false here
    const fetchJurusan = async () => {
        await axios.get("/fetchjurusan").then(
            (response) => {
                const optionJurusan = [...response.data[0]].map((item) => {
                    return {
                        value: item.id,
                        label: item.jurusan
                    }
                }).filter((item) => item.value !== 36)
                setOptionJurusan(optionJurusan)
                setIsBusy(false)
            })
            .catch((err) => console.error(err?.response?.data.message))
    }

    //fakultas fetcher for Fakultas html select
    const fetchFakultas = async () => {
        await axios.get("/fetchfakultas").then(
            (response) => {
                const optionFakultas = [...response.data[0]].map((item) => {
                    return {
                        value: item.id,
                        label: item.fakultas
                    }
                }).filter((item) => item.value !== 11)
                setOptionFakultas(optionFakultas)
                fetchJurusan()
            })
            .catch((err) => console.error(err?.response?.data.message))
    }

    //STATE CHECK THEN RENDER IN STATE CHANGE
    //fetching fakultas and mahasiswa
    useEffect(() => {
        fetchFakultas()
        fetchMahasiswa()
    },[])


    //Function to refetch if there are a change in fakultas
    const refetchData = (e) => {
        e.preventDefault();

        if(nameValidation == "validation approved"){
            return
        }
        else{
            fetchFakultas()
        }
    }

    //EVENT HANDLER
    //event handlers of actions in rendered components
    const namaHandler = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }

    const jurusanHandler = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        setJurusan(e.target.value)
    }

    //validate if name is in the database (if mahasiswa is not registered then matkul can't be assigned)
    const checkValidation = (e) => {
        e.preventDefault()

        const value = e.target.value
        const checkFilter = dataMahasiswa.filter((item) => item.name.toLowerCase() === value.toLowerCase())

        const mappedFilterJurusan = checkFilter.map((item) => {return {label: item.jurusan, value:item.jurusan_id}})
        const mappedFilterFakultas = checkFilter.map((item) => {return {label: item.fakultas, value:item.fakultas_id}})

        if(checkFilter.length === 1){
            setName(checkFilter[0].name)
            setIsBusy(true)
            setSelected(checkFilter[0])
            setNameValidation("validation approved")
            setJurusan(checkFilter[0].jurusan_id)
            setFakultas(checkFilter[0].fakultas_id)
            setSemester(checkFilter[0].semester)
            setOptionJurusan(mappedFilterJurusan)
            setOptionFakultas(mappedFilterFakultas)
            fetchMataKuliah(checkFilter[0].jurusan_id)
            setIsBusy(false)
        }
        if(checkFilter.length == 0){
            setNameValidation("validation rejected")
            setName("")
        }
    }

    const fakultasHandler = async (e) => {
        e.preventDefault()

        const value = e.target.value

        setFakultas(value)

    }

    //show mata kuliah available for the Jurusan including fetching data kuliah
    const mataKuliahHandler = (e) => {
        e.preventDefault()

        const selectedMataKuliahArray = dataMataKuliah.filter((item) => item.id == e.target.value)

        setSelectedMataKuliah(selectedMataKuliahArray[0])

        fetchJadwalKuliah(selectedMataKuliahArray[0].mata_kuliah_id)

    }

    const hariHandler = (e) => {
        e.preventDefault()

        if(e.target.value === "initial value")
        {
            const passedJadwal = parseInt(optionHari[0].value)
            setSelectedJadwal(passedJadwal)
        }
        else{
            const passedJadwal = parseInt(e.target.value)
            setSelectedJadwal(passedJadwal)
        }


    }

    //Calling endpoint to store data
    const submitHandler = async (e) => {
        e.preventDefault()

        const dataSet = {
            mahasiswa_id: selected.id,
            semester_id: semester,
            fakultas_id: fakultas,
            jurusan_id: jurusan,
            mata_kuliah_id: selectedMataKuliah.id,
            jadwal_id: selectedJadwal
        }

        await axios.post("/assignmatkul",dataSet).then((response) => {
            setNameValidation("berhasil")
            setName("")
        }).catch((error)=>console.error(error.response.data.message))
    }

    return (
            <div>
                {
                    isBusy === false
                    ?
                    (
                        nameValidation === "berhasil" ?
                        <ContentParagraphBlack>Penambahan Jadwal Kuliah Berhasil!</ContentParagraphBlack>
                        :
                        <div>
                            <ContentParagraphBlack>Penambahan Jadwal Kuliah Mahasiswa</ContentParagraphBlack>
                            <form onSubmit={submitHandler}>
                                <FormInputText onChange={namaHandler} onBlur={checkValidation} label="Nama" placeholder="Ketik Nama" value={name}/>
                                {nameValidation === "validation rejected" ? <MiniTextBlack className="text-red-500">Mahasiswa Tidak Ditemukan</MiniTextBlack> : <div></div>}
                                {
                                    (nameValidation !== "validation approved" && selected)
                                    ?
                                    <div>
                                        <div className="flex flex-wrap">
                                            <label htmlFor="fakultasSelect" className="w-full h-min-h">Fakultas</label>
                                            <select id="fakultasSelect" className="w-full rounded-md" defaultValue="initial" onFocus={refetchData} onChange={fakultasHandler}>
                                                <option value="initial">Pilih Fakultas</option>
                                                {optionFakultas.map((item) => {
                                                    return <option value={item.value} key={item.value} >{item.label}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="flex flex-wrap">
                                            <label htmlFor="jurusanSelect" className="w-full h-min-h">Jurusan</label>
                                            <select id="jurusanSelect" className="w-full rounded-md" defaultValue= "initial" onChange={jurusanHandler}>
                                                <option value="initial">Pilih Jurusan</option>
                                                {optionJurusan.map((item) => {
                                                    return <option value={item.value} key={item.value}>{item.label}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <div className="flex flex-wrap">
                                            <label htmlFor="fakultasSelect" className="w-full h-min-h">Fakultas</label>
                                            <select id="fakultasSelect" className="w-full rounded-md" defaultValue={fakultas} onFocus={refetchData} onChange={fakultasHandler}>
                                                {optionFakultas.map((item) => {
                                                    return <option value={item.value} key={item.value} >{item.label}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="flex flex-wrap">
                                            <label htmlFor="jurusanSelect" className="w-full h-min-h">Jurusan</label>
                                            <select id="jurusanSelect" className="w-full rounded-md" defaultValue={jurusan} onChange={jurusanHandler}>
                                                {optionJurusan.map((item) => {
                                                    return <option value={item.value} key={item.value}>{item.label}</option>
                                                })}
                                            </select>
                                        </div>
                                        <FormInputNumber label="Semester" placeholder="Semester" value={semester} readOnly={true}/>
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
                                            <select id="jadwalHariSelect" className="w-full rounded-md" defaultValue={"initial"} onChange={hariHandler}>
                                                <option value="initial">Pilih Hari</option>
                                                {optionHari.map((item) => {
                                                    return <option value={item.key} key={item.key}>{item.label}</option>
                                                })}
                                            </select>
                                        </div>

                                        <button type="submit" className="mt-2 shadow-2xl hover:bg-blue-900 md:w-2/12 w-3/12 md:py-2 py-1 bg-blue-800 text-white border-none rounded-lg">Submit</button>
                                    </div>
                                }
                                </form>
                            </div>
                    )
                    :
                    <LoadingComponent/>
                }
            </div>
    )
}
