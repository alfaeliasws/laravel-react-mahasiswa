import axios from "axios"
import { useEffect, useState } from "react"
import FormInputNumber from "./FormInputNumber"
import FormInputText from "./FormInputText"
import { MiniTextBlack } from "./Paragraph"
import { ContentParagraphBlack } from "./Paragraph"
import LoadingComponent from "./LoadingComponent"

export default function Create({data}){

    const [name, setName] = useState("")
    const [idMahasiswa, setIdMahasiswa] = useState("")
    const [alamat, setAlamat] = useState("")
    const [nomorTelepon, setNomorTelepon] = useState(0)
    const [semester, setSemester] = useState("")
    const [jurusan, setJurusan] = useState("")
    const [fakultas, setFakultas] = useState("")
    const [optionFakultas, setOptionFakultas] = useState([])
    const [optionJurusan, setOptionJurusan] = useState([])
    const [isBusy, setIsBusy] = useState(true)
    const [nimValidation, setNimValidation] = useState("empty")

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

    useEffect(()=>{
        fetchFakultas();
    },[])

    const refetchData = (e) => {
        e.preventDefault();
        fetchJurusan()
    }

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
        }

        axios.post("/createmahasiswa",dataSet).then((response) => {
            setNimValidation("berhasil")
        }).catch((error)=> console.error(error.response.data.message))
    }

    return (
        isBusy === false ?
            <div>
                {
                    nimValidation === "berhasil" ?
                        <ContentParagraphBlack>Mahasiswa Berhasil Ditambahkan!</ContentParagraphBlack>
                    :
                    <form onSubmit={submitHandler}>
                        <FormInputText onChange={namaHandler} label="Nama" placeholder="Ketik Nama" value={name}/>
                        <FormInputText label="Nomor Induk Mahasiswa" onBlur={checkValidation} onChange={idMahasiswaHandler} placeholder="Ketik NIM" value={idMahasiswa}/>
                        {nimValidation === "validation rejected" ? <MiniTextBlack className="text-red-500">NIM Tidak Tersedia</MiniTextBlack> : <div></div>}
                        <FormInputText onChange={alamatHandler} label="Alamat" placeholder="Ketik Alamat" value={alamat}/>
                        <FormInputNumber onChange={nomorTeleponHandler} label="Nomor Telepon" placeholder="Masukkan Nomor Telepon" value={nomorTelepon}/>
                        {/* <FormInputText label="Fakultas" value={fakultas} onChange={fakultasHandler}/> */}
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
                        <button type="submit" className="mt-2 shadow-2xl hover:bg-blue-900 md:w-2/12 w-3/12 md:py-2 py-1 bg-blue-800 text-white border-none rounded-lg">Submit</button>
                    </form>
                }
            </div>
        :
        <LoadingComponent/>
    )
}
