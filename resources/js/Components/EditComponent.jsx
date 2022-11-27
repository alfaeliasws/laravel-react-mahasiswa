import { useEffect, useState } from "react"
import FormInputText from "./FormInputText"
import FormInputNumber from "./FormInputNumber"
import { viewChanger } from "@/Helper/viewChanger"
import axios from "axios"
import { ContentParagraphBlack } from "./Paragraph"

//PARENT COMPONENT Dashboard -> AdminDashboard -> AdminMahasiswaView -> ShowComponent

//component rendered to show edit form with passed data (no need to call api endpoint to get the data)
export default function EditComponent({data}){

    //STATE
    //storing data
    const [validation, setValidation] = useState("empty")
    const [name, setName] = useState(data.name)
    const [alamat, setAlamat] = useState(data.alamat)
    const [nomorTelepon, setNomorTelepon] = useState(data.nomor_telepon)
    const [semester, setSemester] = useState(data.semester)
    const [password, setPassword] = useState("")

    useEffect(()=>{

    },[])

    //EVENT HANDLERS
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

    const passwordHandler = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }

    //SUBMIT DATA AND PUT DATA TO DATABASE
    const submitHandler = async (e) => {
        e.preventDefault()

        const editedData = e.target[8].value

        const dataSet = {
            name: name,
            alamat: alamat,
            semester_id: semester,
            nomor_telepon: nomorTelepon,
            password: password,
            id_mahasiswa: data.id_mahasiswa
        }

        await axios.put(`/editmahasiswa/${editedData}`, dataSet)
            .then((response) => {
                setValidation("validation approved")
                    console.log("edit success")
                    console.log(response)
            })
            .catch((error) => console.error(error))

    }

    //returned data as edit form
    return (
        validation === "validation approved" ?
        <ContentParagraphBlack>Perbaikan Data Mahasiswa Berhasil</ContentParagraphBlack>
        :
        <div>
            <form onSubmit={submitHandler}>
                <ContentParagraphBlack>Edit Data Mahasiswa</ContentParagraphBlack>
                <FormInputText onChange={namaHandler} label="Nama" placeholder="Edit Nama" value={name}/>
                <FormInputText label="Nomor Induk Mahasiswa" placeholder="NIM" value={data.id_mahasiswa} readOnly={true}/>
                <FormInputText onChange={alamatHandler} label="Alamat" placeholder="Edit Alamat" value={alamat}/>
                <FormInputNumber onChange={nomorTeleponHandler} label="Nomor Telepon" placeholder="Edit Nomor Telepon" value={nomorTelepon}/>
                <FormInputText label="Fakultas" value={data.fakultas} readOnly={true}/>
                <FormInputText label="Jurusan" value={data.jurusan} readOnly={true}/>
                <FormInputNumber min={data.semester} max={12} onChange={semesterHandler} label="Semester" placeholder="Naik Semester" value={semester}/>
                <FormInputText onChange={passwordHandler} label="Password" placeholder="Ketik Password Baru" value={password}/>
                <button type="submit" className="py-2 text-xs sm:text-base mt-2 shadow-2xl hover:bg-blue-900 md:w-2/12 w-3/12 bg-blue-800 text-white border-none rounded-lg" value={data.id}>Submit</button>
            </form>
        </div>
    )
}
