import { useConsoleLog } from "@/Helper/useConsoleLog"
import classNames from "classnames"
import { ContentParagraphBlackMedium, ContentParagraphBlackSmall } from "./Paragraph"

export default function Card({data, className}){

    return (
        <div className={`${className}`}>
            <div className="py-3">
                <ContentParagraphBlackMedium>{data.name}</ContentParagraphBlackMedium>
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
