import { useConsoleLog } from "@/Helper/useConsoleLog";
import { MiniTextBlack } from "./Paragraph";

//Parent COMPONENT Dashboard -> AdminDashboard -> AdminMatkulView -> ShowMatkulView

//table showed for every day and every matakuliah assigned
export default function TableShowMatkul({target, header, hari, waktu, className, jadwalId, nama, nim, semester, fakultas, jurusan, mataKuliah, mataKuliahId, jumlahSKS, dosenPengajar, data, onDelete, onEdit}){

    return (
        <div className={`max-w-[1200px] min-w-[1200px] flex ${className}`}>
            <div className="w-2/12 overflow-hidden">
                <MiniTextBlack className="text-gray-900 ml-1">{nama}</MiniTextBlack>
            </div>
            <div className="w-1/12">
                <MiniTextBlack className="text-gray-900">{nim}</MiniTextBlack>
            </div>
            <div className="w-1/12">
                <MiniTextBlack className="text-gray-900 text-center">{semester}</MiniTextBlack>
            </div>
            <div className="w-2/12">
                <MiniTextBlack className="text-gray-900">{mataKuliah}</MiniTextBlack>
            </div>
            <div className="w-1/12">
                <MiniTextBlack className="text-gray-900">{hari}</MiniTextBlack>
            </div>
            <div className="w-1/12">
                <MiniTextBlack className="text-gray-900">{waktu}</MiniTextBlack>
            </div>
            <div className="w-2/12">
                <MiniTextBlack className="text-gray-900 overflow-x-hidden">{dosenPengajar}</MiniTextBlack>
            </div>
            <div className="w-1/12">
                <MiniTextBlack className="text-gray-900 overflow-x-auto mr-2">{jumlahSKS}</MiniTextBlack>
            </div>
            <div className="w-1/12">
                <MiniTextBlack className="text-gray-900 overflow-x-auto mr-2">{target}</MiniTextBlack>
            </div>
            <div className="w-2/12 overflow-hidden">
                <MiniTextBlack className="text-gray-900 truncate">{fakultas}</MiniTextBlack>
            </div>
            <div className="w-2/12 overflow-hidden">
                <MiniTextBlack className="text-gray-900 truncate">{jurusan}</MiniTextBlack>
            </div>
            {
                header !== "true"
                ?
            <div className="w-2/12 flex">
                <div className="w-6/12">
                    <button className="bg-blue-600 text-white rounded-lg text-xs px-3 py-1 border-none shadow-whitebg-light hover:opacity-60" onClick={(e) => onEdit(e)} value={jadwalId}>Edit</button>
                </div>
                <div className="min-w-min mr-2">
                    <button onClick={(e) => onDelete(e)} value={jadwalId} className="bg-red-600 text-white rounded-lg text-xs px-3 py-1 border-none shadow-whitebg-light hover:opacity-60">Delete</button>
                </div>
            </div>
            :
            <div className="w-2/12 flex">
                <div className="w-6/12">
                    <MiniTextBlack className="text-gray-900 truncate">Edit</MiniTextBlack>
                </div>
                <div className="min-w-min mr-2">
                    <MiniTextBlack className="text-gray-900 truncate">Delete</MiniTextBlack>
                </div>
            </div>
            }
        </div>
    )
}
