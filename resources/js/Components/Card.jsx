import { useConsoleLog } from "@/Helper/useConsoleLog"
import classNames from "classnames"
import { ContentParagraphBlackMedium, ContentParagraphBlackSmall } from "./Paragraph"

//PARENT COMPONENT Dashboard -> AdminDashboard -> AdminMahasiswaView -> ShowComponent

//Component fo card that is shown to admin
export default function Card({data, className}){

    return (
        <div className={`w-full min-h-[220px] ${className}`}>
            <div className="py-3 w-full">
                <ContentParagraphBlackMedium className="font-bold">{data.name}</ContentParagraphBlackMedium>
                <ContentParagraphBlackSmall>{data.id_mahasiswa}</ContentParagraphBlackSmall>
                <ContentParagraphBlackSmall>{data.fakultas}</ContentParagraphBlackSmall>
                <ContentParagraphBlackSmall>{data.jurusan}</ContentParagraphBlackSmall>
                <ContentParagraphBlackSmall>+{data.nomor_telepon}</ContentParagraphBlackSmall>
                <ContentParagraphBlackSmall>{data.alamat}</ContentParagraphBlackSmall>
                <ContentParagraphBlackSmall>Semester {data.semester}</ContentParagraphBlackSmall>
            </div>
        </div>
    )
}
