import { useEffect, useState } from "react";
import FormInputText from "./FormInputText";
import { ContentParagraphBlack, MiniTextBlack } from "./Paragraph";
import FormInputNumber from "./FormInputNumber";
import LoadingComponent from "./LoadingComponent";

export default function AssignMatkulComponent({onShowView}){

    const [name, setName] = useState("")
    const [jurusan, setJurusan] = useState("")
    const [fakultas, setFakultas] = useState("")
    const [semester, setSemester] = useState(0)
    const [mataKuliah, setMataKuliah] = useState([])
    const [hari, setHari] = useState([])

    const [isBusy, setIsBusy] = useState(true);
    const [nameValidation, setNameValidation] = useState("empty")
    const [selected, setSelected] = useState({})
    const [dataMataKuliah, setDataMataKuliah] = useState([])
    const [selectedMataKuliah, setSelectedMataKuliah] = useState({})
    const [dataJadwalKuliah, setDataJadwalKuliah] = useState([])
    const [selectedJadwal, setSelectedJadwal] = useState({})

    const [optionFakultas, setOptionFakultas] = useState([])
    const [optionJurusan, setOptionJurusan] = useState([])
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
            label: item.waktu                    }
    })

    setOptionJam(jam)
    }


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

    const fetchMahasiswa = async () => {
        await axios.get("/fetchdatamahasiswa").then(
            (response) => {
                setDataMahasiswa(response.data.data)
                setIsBusy(false)
            })
            .catch((err) => console.error(err?.response?.data.message))
    }

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

    useEffect(() => {
        fetchFakultas()
        fetchMahasiswa()
    },[])

    const refetchData = (e) => {
        e.preventDefault();

        if(nameValidation == "validation approved"){
            return
        }
        else{
            fetchFakultas()
        }
    }

    const namaHandler = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }

    const jurusanHandler = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        setJurusan(e.target.value)
    }

    const checkValidation = (e) => {
        e.preventDefault()

        const value = e.target.value
        const checkFilter = dataMahasiswa.filter((item) => item.name === value)

        const mappedFilterJurusan = checkFilter.map((item) => {return {label: item.jurusan, value:item.jurusan_id}})
        const mappedFilterFakultas = checkFilter.map((item) => {return {label: item.fakultas, value:item.fakultas_id}})

        if(checkFilter.length === 1){
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
            mahasiswa_id: selected.id,
            semester_id: semester,
            fakultas_id: fakultas,
            jurusan_id: jurusan,
            mata_kuliah_id: selectedMataKuliah.id,
            jadwal_id: selectedJadwal.id
        }

        axios.post("/assignmatkul",dataSet).then((response) => {
            setNameValidation("berhasil")
            setName("")
        }).catch((error)=>console.error(error))
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
