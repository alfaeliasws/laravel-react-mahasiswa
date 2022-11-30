import axios from "axios"
import { useEffect, useState } from "react"
import FormInputNumber from "./FormInputNumber"
import FormInputText from "./FormInputText"
import { MiniTextBlack } from "./Paragraph"
import { ContentParagraphBlack } from "./Paragraph"
import LoadingComponent from "./LoadingComponent"
import randomPassword from "@/Helper/randomPassword"
import { useConsoleLogWatcher } from "@/Helper/useConsoleLog"

//PARENT COMPONENT Dashboard -> AdminDashboard -> AdminMahasiswaView
//Form to create mahasiswa
export default function Create({data}){

    //STATE
    //if busy then loading
    const [isBusy, setIsBusy] = useState(true)

    //make sure that the nim is unique if not unique then the validation will be rejected
    const [nimValidation, setNimValidation] = useState("empty")

    //The state of stored data in forms
    const [name, setName] = useState("")
    const [idMahasiswa, setIdMahasiswa] = useState("")
    const [alamat, setAlamat] = useState("")
    const [nomorTelepon, setNomorTelepon] = useState(0)
    const [semester, setSemester] = useState("")
    const [jurusan, setJurusan] = useState("")
    const [fakultas, setFakultas] = useState("")
    const [password, setPassword] = useState()

    //store the option for select html tag
    const [optionFakultas, setOptionFakultas] = useState([])
    const [optionJurusan, setOptionJurusan] = useState([])


    //FETCHER FUNCTION
    //fetcher include setBusy false to start rendering the forms
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

    //RENDER AND DATA
    //render at first after fetching data succeeed
    useEffect(()=>{
        fetchFakultas();

        setPassword(randomPassword())
    },[])

    useConsoleLogWatcher(password)

    //refetching data
    const refetchData = (e) => {
        e.preventDefault();
        fetchJurusan()
    }

    //EVENT HANDLER
    const namaHandler = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }

    const alamatHandler = (e) => {
        e.preventDefault()
        setAlamat(e.target.value)
    }

    const nomorTeleponHandler = (e) => {
        e.preventDefault()
        setNomorTelepon(e.target.value)
    }

    const semesterHandler = (e) => {
        e.preventDefault()
        setSemester(e.target.value)
    }

    const jurusanHandler = (e) => {
        e.preventDefault()
        setJurusan(e.target.value)
    }

    const passwordHandler = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }

    //fetching data and set options for jurusan
    const fakultasHandler = async (e) => {
        e.preventDefault()

        const value = e.target.value

        setFakultas(value)

        const curatedOption = optionJurusan.filter((item) => {
            if(value == 1){return item.value >= 1 && item.value <= 3}
            if(value == 2){return item.value == 4}
            if(value == 3){return item.value >= 5 && item.value <= 12}
            if(value == 4){return item.value >= 13 && item.value <= 15}
            if(value == 5){return item.value == 16}
            if(value == 6){return item.value >= 17 && item.value <= 21}
            if(value == 7){return item.value >= 22 && item.value <= 25}
            if(value == 8){return item.value >= 26 && item.value <= 26}
            if(value == 9){return item.value >= 27 && item.value <= 33}
            if(value == 10){return item.value >= 34 && item.value <= 35}
        })

        setOptionJurusan(curatedOption)

    }

    //check validation of NIM
    const checkValidation = (e) => {
        e.preventDefault()

        const value = e.target.value
        const checkFilter = data.filter((item) => item.login_id === value)

        if(checkFilter.length > 0){
            setNimValidation("validation rejected")
            setIdMahasiswa("")
        }
        if(checkFilter.length == 0){
            setNimValidation("validation approved")
        }

    }

    const idMahasiswaHandler = (e) => {
        e.preventDefault()

        const value = e.target.value

        setIdMahasiswa(value)
    }

    //POST DATA TO ENDPOINT
    const submitHandler = async (e) => {
        e.preventDefault()

        const dataSet = {
            name: name,
            id_mahasiswa: idMahasiswa,
            alamat: alamat,
            jurusan_id: jurusan,
            fakultas_id: fakultas,
            semester_id: semester,
            nomor_telepon: nomorTelepon,
            password: password
        }

        axios.post("/createmahasiswa",dataSet).then((response) => {
            console.log(response)
            setNimValidation("berhasil")
        }).catch((error)=> console.error(error.response.data.message))
    }

    //returned component that will be rendered
    //return loading if the data is not fetched
    //return form if the data is fetched
    //return success announcement if data submission succeed
    return (
        //check if isBusy (check if fetching data is succeed)
        isBusy === false ?
            <div>
                {
                    //if submit succeed
                    nimValidation === "berhasil" ?
                    <ContentParagraphBlack>Mahasiswa Berhasil Ditambahkan!</ContentParagraphBlack>
                    :

                    //if adding (rendered at first)
                    <form onSubmit={submitHandler}>
                        <ContentParagraphBlack>Tambah Data Mahasiswa</ContentParagraphBlack>
                        <FormInputText onChange={namaHandler} label="Nama" placeholder="Ketik Nama" value={name}/>
                        <FormInputText label="Nomor Induk Mahasiswa" onBlur={checkValidation} onChange={idMahasiswaHandler} placeholder="Ketik NIM" value={idMahasiswa}/>
                        {nimValidation === "validation rejected" ? <MiniTextBlack className="text-red-500">NIM Tidak Tersedia</MiniTextBlack> : <div></div>}
                        <FormInputText onChange={alamatHandler} label="Alamat" placeholder="Ketik Alamat" value={alamat}/>
                        <FormInputNumber onChange={nomorTeleponHandler} label="Nomor Telepon" placeholder="Masukkan Nomor Telepon" value={nomorTelepon}/>
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
                            <select id="jurusanSelect" className="w-full rounded-md" defaultValue="initial" onChange={jurusanHandler}>
                                <option value="initial">Pilih Jurusan</option>
                                {optionJurusan.map((item) => {
                                    return <option value={item.value} key={item.value}>{item.label}</option>
                                })}
                            </select>
                        </div>
                        <FormInputNumber min={1} max={12} onChange={semesterHandler} label="Semester" placeholder="Ketik Semester" value={semester}/>
                        <FormInputText onChange={passwordHandler} label="Password" placeholder="Masukkan Password" value={password}/>
                        <button type="submit" className="py-2 text-xs sm:text-base mt-2 shadow-2xl hover:bg-blue-900 md:w-2/12 w-3/12 bg-blue-800 text-white border-none rounded-lg">Submit</button>
                    </form>
                }
            </div>
        :

        //if isBusy true (fetching data)
        <LoadingComponent/>
    )
}
