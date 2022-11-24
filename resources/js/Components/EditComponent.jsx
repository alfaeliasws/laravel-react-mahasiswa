import { useEffect, useState } from "react"
import FormInputText from "./FormInputText"
import FormInputNumber from "./FormInputNumber"
import { viewChanger } from "@/Helper/viewChanger"
import axios from "axios"

export default function EditComponent({data, onShowView, view, setterView, now}){


    const [name, setName] = useState(data[1].name)
    const [alamat, setAlamat] = useState(data[1].alamat)
    const [nomorTelepon, setNomorTelepon] = useState(data[1].nomor_telepon)
    const [semester, setSemester] = useState(data[1].semester)

    useEffect(()=>{

        setterView(view)

        if(now === "show"){
            onShowView("show")
        }
    },[])


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


    const submitHandler = async (e) => {
        e.preventDefault()

        const EditedData = e.target[8].value

        const dataSet = {
            name: name,
            alamat: alamat,
            semester_id: semester,
            nomor_telepon: nomorTelepon
        }

        await axios.put(`/editmahasiswa/${EditedData}`, dataSet)
            .then((response) => {
                if(response.data.status == 200){
                    onShowView("show")
                }
            })
            .catch((error) => console.error(error))

    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <FormInputText onChange={namaHandler} label="Nama" placeholder="Edit Nama" value={name}/>
                <FormInputText label="Nomor Induk Mahasiswa" placeholder="NIM" value={data[1].id_mahasiswa} readOnly={true}/>
                <FormInputText onChange={alamatHandler} label="Alamat" placeholder="Edit Alamat" value={alamat}/>
                <FormInputNumber onChange={nomorTeleponHandler} label="Nomor Telepon" placeholder="Edit Nomor Telepon" value={nomorTelepon}/>
                <FormInputText label="Fakultas" value={data[1].fakultas} readOnly={true}/>
                <FormInputText label="Jurusan" value={data[1].jurusan} readOnly={true}/>
                <FormInputNumber min={data[1].semester} max={12} onChange={semesterHandler} label="Semester" placeholder="Naik Semester" value={semester}/>
                <button type="submit" className="mt-2 shadow-2xl hover:bg-blue-900 md:w-2/12 w-3/12 md:py-2 py-1 bg-blue-800 text-white border-none rounded-lg" value={data[1].id}>Submit</button>
            </form>
        </div>
    )
}
