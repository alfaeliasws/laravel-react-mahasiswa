import { useEffect, useState } from "react";
import FormInputText from "./FormInputText";
import FormInputNumber from "./FormInputNumber";
import axios from "axios";
import { MiniTextBlack, ContentParagraphBlack } from "./Paragraph";
import { useConsoleLog } from "@/Helper/useConsoleLog";
import LoadingComponent from "./LoadingComponent";

export default function EditMatkulComponent({data}){

    const [editedData, setEditedData] = useState(data)

    const [name, setName] = useState(data.name)
    const [jurusan, setJurusan] = useState(data.jurusan_id)
    const [fakultas, setFakultas] = useState(data.fakultas_id)
    const [semester, setSemester] = useState(data.semester_id)
    const [mataKuliah, setMataKuliah] = useState([])
    const [hari, setHari] = useState([])

    const [isBusy, setIsBusy] = useState(true);
    const [nameValidation, setNameValidation] = useState("empty")
    const [selected, setSelected] = useState({})
    const [dataMataKuliah, setDataMataKuliah] = useState([])
    const [selectedMataKuliah, setSelectedMataKuliah] = useState({})
    const [dataJadwalKuliah, setDataJadwalKuliah] = useState([])
    const [selectedJadwal, setSelectedJadwal] = useState({})

    const [dataMahasiswa, setDataMahasiswa] = useState([])
    const [optionMataKuliah, setOptionMataKuliah] = useState([])
    const [optionHari, setOptionHari] = useState([])
    const [optionJam, setOptionJam] = useState([])

    const fetchJadwalKuliah = async (id) => {
        await axios.get(`/fetchjadwal/${id}`).then(
            (response) => {
                setDataJadwalKuliah(response.data.data)

                const hariArray = [...response.data.data].map((item) => {
                    return {
                        value: item.hari,
                        label: item.hari,
                        key: item.id
                    }
                })
                setOptionHari(hariArray)

            })
            .catch((err) => console.error(err))
    }

    const fetchWaktuKuliah = () => {
        const jam = dataJadwalKuliah
        .filter((item)=>{
            return item.hari === hari
        })
        .map((item) => {
        return {
            value: item.waktu,
            label: item.waktu}
    })

    setOptionJam(jam)
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

    useEffect(() => {
        if(editedData) {
            setNameValidation("validation approved")
            fetchMataKuliah(jurusan)
        }
    },[])

    const namaHandler = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }

    const mataKuliahHandler = (e) => {
        e.preventDefault()
        setMataKuliah(e.target.value)

        const selectedMataKuliahArray = dataMataKuliah.filter((item) => item.id == e.target.value)

        setSelectedMataKuliah(selectedMataKuliahArray[0])

        fetchJadwalKuliah(selectedMataKuliahArray[0].mata_kuliah_id)

    }

    const hariHandler = (e) => {
        e.preventDefault()
        setHari(e.target.value)
    }

    const jamHandler = (e) => {
        e.preventDefault()

        const filteredJadwal = dataJadwalKuliah.filter((item) => {
            return (item.hari === hari && item.waktu === e.target.value)
        })

        if(filteredJadwal){
            setSelectedJadwal(filteredJadwal[0])
        }
        else
        {
            console.log({check: filteredJadwal})
        }

    }

    const submitHandler = async (e) => {
        e.preventDefault()

        const dataSet = {
            mahasiswa_id: editedData.mahasiswa_id,
            semester_id: semester,
            fakultas_id: fakultas,
            jurusan_id: jurusan,
            mata_kuliah_id: selectedMataKuliah.id,
            jadwal_id: selectedJadwal.id
        }

        axios.put(`/editassignedmatakuliah/${editedData.id}`,dataSet).then((response) => {
            console.log(response)
            setNameValidation("berhasil")
        }).catch((error)=>console.error(error))
    }

    return (
            <div>
                {
                    isBusy === false && editedData.name
                    ?
                    (
                        nameValidation === "berhasil" ?
                        <ContentParagraphBlack>Perbaikan Jadwal Kuliah Berhasil!</ContentParagraphBlack>
                        :
                        <div>
                            <form onSubmit={submitHandler}>
                                <FormInputText onChange={namaHandler} label="Nama" placeholder="Ketik Nama" value={name}/>
                                <div>
                                    <div className="flex flex-wrap">
                                        <label htmlFor="fakultasSelect" className="w-full h-min-h">Fakultas</label>
                                        <select id="fakultasSelect" className="w-full rounded-md" defaultValue={fakultas} >
                                                <option value={fakultas} key={fakultas} >{data.fakultas}</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-wrap">
                                        <label htmlFor="jurusanSelect" className="w-full h-min-h">Jurusan</label>
                                        <select id="jurusanSelect" className="w-full rounded-md" defaultValue= {jurusan}>
                                                <option value={jurusan} key={jurusan} >{data.jurusan}</option>
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
                                        <select id="jadwalHariSelect" className="w-full rounded-md" defaultValue="initial" onBlur={fetchWaktuKuliah} onChange={hariHandler}>
                                            <option value="initial">Pilih Hari</option>
                                            {optionHari.map((item) => {
                                                return <option value={item.value} key={item.key}>{item.label}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="flex flex-wrap">
                                        <label htmlFor="jadwalJamSelect" className="w-full h-min-h">Jam</label>
                                        <select id="jadwalJamSelect" className="w-full rounded-md" defaultValue="initial" onChange={jamHandler}>
                                            <option value="initial">Pilih Jam</option>
                                            {optionJam.map((item) => {
                                                return <option value={item.value} key={item.value}>{item.label}</option>
                                            })}
                                        </select>
                                    </div>
                                    <button type="submit" className="mt-2 shadow-2xl hover:bg-blue-900 md:w-2/12 w-3/12 md:py-2 py-1 bg-blue-800 text-white border-none rounded-lg">Submit</button>
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
