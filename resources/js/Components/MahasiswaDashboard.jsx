import { useConsoleLog } from "@/Helper/useConsoleLog";
import axios from "axios";
import { useEffect, useState } from "react";
import { ContentH1, ContentH2, ContentH3, ContentParagraphBlack, ContentParagraphBlackMedium, MiniTextBlack } from "./Paragraph";
import ArrayCheckComponent from "./ArrayCheckComponent";
import LoadingComponent from "./LoadingComponent";

//Parent COMPONENT Dashboard

//dashboard mahasiswa
export default function MahasiswaDashboard({data}){

    //STATE
    //if busy then loading component
    const [isBusy, setIsBusy] = useState(true);

    //store fetched data user from backend
    const [dataUser, setDataUser] = useState([])

    //setState of jadwal
    const [senin, setSenin] = useState([])
    const [selasa, setSelasa] = useState([])
    const [rabu, setRabu] = useState([])
    const [kamis, setKamis] = useState([])
    const [jumat, setJumat] = useState([])
    const [count, setCount] = useState(0)

    //FUNCTION FETCHER
    const fetchAll = async (loginId) => {
        await axios.get(`/mydata/${loginId}`)
        .then((response) => {
            setDataUser(response.data)
        }).then(() => {
            const isSenin = dataUser.filter((item) => item.hari === "Senin")
            setSenin(isSenin);
            if(senin) setCount(count  + 1)

            const isSelasa = dataUser.filter((item) => item.hari === "Selasa")
            setSelasa(isSelasa);
            if(selasa) setCount(count  + 1)

            const isRabu = dataUser.filter((item) => item.hari === "Rabu")
            setRabu(isRabu);
            if(rabu) setCount(count  + 1)

            const isKamis = dataUser.filter((item) => item.hari === "Kamis")
            setKamis(isKamis);
            if(kamis) setCount(count  + 1)

            const isJumat = dataUser.filter((item) => item.hari === "Jumat")
            setJumat(isJumat);
            if(jumat) setCount(count  + 1)
        })
        .catch((error) => console.error(error.response.data))
    }

useEffect(()=>{
    console.log(dataUser)
},[])

    //RENDERER if there is any changes in state
    useEffect(() => {
        fetchAll(data.login_id)
        if(count === 5) setIsBusy(false)
    },[senin,selasa,rabu,kamis,jumat])

    //returned components
    //return loading component when busy
    return (
            <div>
                {
                    isBusy === false
                    ?
                    (
                        <div>
                            <div className="flex flex-wrap">
                                <ContentH1 className="text-black w-full">{dataUser[0].name}</ContentH1>
                                <MiniTextBlack>{dataUser[0].fakultas}, {dataUser[0].jurusan}, Semester {dataUser[0].semester_id}</MiniTextBlack>
                            </div>
                            <div className="mt-4">
                                <ContentH2 className="text-black">Jadwal Kuliah</ContentH2>
                                <ArrayCheckComponent passedState={senin}/>
                                <ArrayCheckComponent passedState={selasa}/>
                                <ArrayCheckComponent passedState={rabu}/>
                                <ArrayCheckComponent passedState={kamis}/>
                                <ArrayCheckComponent passedState={jumat}/>
                            </div>
                        </div>
                    )
                    :
                    <LoadingComponent/>
                }
            </div>
    )
}
