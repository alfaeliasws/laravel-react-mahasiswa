import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import BodyAuth from '@/Components/BodyAuth';
import { ContentParagraph, Title } from '@/Components/Paragraph';
import LayoutDefiner from '@/Components/LayoutDefiner';
import ActionContainer from '@/Components/ActionContainer';
import AdminDashboard from '@/Components/AdminDashboard';
import { useConsoleLog } from '@/Helper/useConsoleLog';
import { viewChanger } from '@/Helper/viewChanger';
import MahasiswaDashboard from '@/Components/MahasiswaDashboard';

export default function Dashboard({user}){

    const [mahasiswaController, setMahasiswaController] = useState(false);
    const [matkulController, setMatkulController] = useState(false);
    const [adminView, setAdminView] = useState("")

    let is_admin = user.is_admin === 1 ? true : false;

    useEffect(()=>{
        if(mahasiswaController){
            setAdminView("mahasiswa")
        }else if(matkulController){
            setAdminView("matkul")
        }else {
            setAdminView("")
        }
    },[mahasiswaController,matkulController])

    // useConsoleLog(adminView)

    const openMahasiswaView = (e) =>{
        if(e) e.preventDefault()
        viewChanger(mahasiswaController, setMahasiswaController, "boolean" ,e);
        setMatkulController(false)
    }

    const openMatkulView = (e) =>{
        viewChanger(matkulController, setMatkulController, "boolean" ,e);
        setMahasiswaController(false)
    }

    return (
        <BodyAuth>
            <Title className="text-black tracking-wide">
                Dashboard
            </Title>
            <ContentParagraph className="text-black">
                {user.login_id}
            </ContentParagraph>
            {
                is_admin && (
                    <div className='w-full'>
                        <div className="flex md:flex-wrap space-x-4 py-4">
                            <button onClick={openMahasiswaView} className="text-xs sm:text-base shadow-2xl hover:bg-blue-900 md:w-2/12 sm:w-4/12 w-6/12 py-2 bg-blue-800 text-white border-none rounded-lg">{!mahasiswaController ? "Mahasiswa" : "Dashboard"}</button>
                            <button onClick={openMatkulView} className="py-2 text-xs sm:text-base shadow-2xl hover:bg-blue-900 md:w-2/12 sm:w-4/12 w-6/12 bg-blue-800 text-white border-none rounded-lg">{!matkulController ? "Mata Kuliah" : "Dashboard"}</button>
                        </div>
                    </div>
                )
            }
            <ActionContainer>
                {
                    is_admin ? <AdminDashboard view={adminView} data={user} fetchData={adminView}/> : <MahasiswaDashboard data={user}/>
                }
            </ActionContainer>
        </BodyAuth>
    )
}
