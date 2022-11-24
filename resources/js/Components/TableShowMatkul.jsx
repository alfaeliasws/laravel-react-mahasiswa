import { useConsoleLog } from "@/Helper/useConsoleLog";
import { MiniTextBlack } from "./Paragraph";

export default function TableShowMatkul({className, jadwalId, nama, nim, semester, fakultas, jurusan, mataKuliah, mataKuliahId, jumlahSKS, dosenPengajar, data, onDelete, onEdit}){

    return (
        <div className={`w-[1500px] min-w-[1200px] flex ${className}`}>
            <div className="w-2/12">
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
                <MiniTextBlack className="text-gray-900">{mataKuliahId}</MiniTextBlack>
            </div>
            <div className="w-2/12">
                <MiniTextBlack className="text-gray-900">{dosenPengajar}</MiniTextBlack>
            </div>
            <div className="w-1/12">
                <MiniTextBlack className="text-gray-900 overflow-x-auto mr-2">{jumlahSKS}</MiniTextBlack>
            </div>
            <div className="w-2/12">
                <MiniTextBlack className="text-gray-900 truncate">{fakultas}</MiniTextBlack>
            </div>
            <div className="w-2/12">
                <MiniTextBlack className="text-gray-900 truncate">{jurusan}</MiniTextBlack>
            </div>
            <div className="min-w-min  mr-3">
                <button className="bg-blue-600 text-white rounded-lg text-xs px-3 py-1 border-none shadow-whitebg-light hover:opacity-60" onClick={(e) => onEdit(data)}>Edit</button>
            </div>
            <div className="min-w-min">
                <button onClick={(e) => onDelete(e)} value={jadwalId} className="bg-red-600 text-white rounded-lg text-xs px-3 py-1 border-none shadow-whitebg-light hover:opacity-60">Delete</button>
            </div>
        </div>
    )
}
