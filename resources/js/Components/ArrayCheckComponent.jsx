import { useConsoleLog } from "@/Helper/useConsoleLog"
import { useEffect, useState } from "react"
import { ContentParagraphBlack, ContentParagraphBlackMedium, ContentParagraphBlackSmall } from "./Paragraph"

//Parent COMPONENT Dashboard -> MahasiswaDashboard

//item that is shown to mahasiswa as jadwal
export default function ArrayCheckComponent(passedState)
{

    const [data, setData] = useState(passedState.passedState)

    return (
            data.length > 0 ? (
                <div>
                    <ContentParagraphBlack className="-py-2">{data[0].hari}</ContentParagraphBlack>
                    {
                        data.map((item) => {
                            return (
                                <div className="mb-3" key={item.id}>
                                    <ContentParagraphBlackMedium className="font-bold">{item.mata_kuliah} - {item.mata_kuliah_id}</ContentParagraphBlackMedium>
                                    <ContentParagraphBlackSmall >Jumlah SKS - {item.jumlahsks}</ContentParagraphBlackSmall>
                                    <ContentParagraphBlackSmall >Target SKS - {item.target_sks}</ContentParagraphBlackSmall>
                                    <ContentParagraphBlackSmall >{item.waktu}</ContentParagraphBlackSmall>
                                    <ContentParagraphBlackSmall >Dosen Pengajar - {item.dosen_pengajar}</ContentParagraphBlackSmall>
                                </div>
                            )
                        })
                    }
                </div>
            ) : <div></div>
    )
}
