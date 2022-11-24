import React, { useEffect } from 'react';
import Nav from '../Components/Nav'
import { Link, Head } from '@inertiajs/inertia-react';
import { ContentParagraph, Title } from '@/Components/Paragraph';
import BodyAuth from '@/Components/BodyAuth';
import LayoutDefiner from '@/Components/LayoutDefiner';
import ActionContainer from '@/Components/ActionContainer';

export default function Homepage({user,data}){

    let is_admin = user.is_admin === 1 ? true : false;

    return (
        <BodyAuth>
            <Title className="text-black mb-8">
                Welcome, {data.name}
            </Title>
            <ActionContainer>
                {
                    !is_admin ?
                    <div>
                        <ContentParagraph className="text-black">Nama Lengkap: {data.name} </ContentParagraph>
                        <ContentParagraph className="text-black">Nomor Induk Mahasiswa: {user.login_id} </ContentParagraph>
                        <ContentParagraph className="text-black">Fakultas: {data.fakultas} </ContentParagraph>
                        <ContentParagraph className="text-black">Jurusan: {data.jurusan} </ContentParagraph>
                        <ContentParagraph className="text-black">Alamat: {data.alamat} </ContentParagraph>
                        <ContentParagraph className="text-black">Nomor Telepon: +{data.nomor_telepon} </ContentParagraph>
                        <ContentParagraph className="text-black">Semester: {data.semester} </ContentParagraph>
                    </div> :
                    <div>
                        <ContentParagraph className="text-black">Nama Langkap: {data.name} </ContentParagraph>
                        <ContentParagraph className="text-black">Nomor Induk Karyawan: {user.login_id} </ContentParagraph>
                        <ContentParagraph className="text-black">Posisi: {data.position} </ContentParagraph>
                    </div>
                }
            </ActionContainer>
        </BodyAuth>
    )
}
