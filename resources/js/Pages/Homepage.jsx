import React, { useEffect } from 'react';
import Nav from '../Components/Nav'
import { Link, Head } from '@inertiajs/inertia-react';
import { ContentParagraph, Title } from '@/Components/Paragraph';
import Body from '@/Components/Body';

export default function Homepage(props){

    return (
        <Body>
            <div className="py-20 px-20">
                <Title className="text-black">
                    Welcome
                </Title>
                <ContentParagraph>
                </ContentParagraph>
            </div>
        </Body>
    )
}
