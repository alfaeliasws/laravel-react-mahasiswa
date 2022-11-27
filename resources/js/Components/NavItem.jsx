//COMPONENT

import { Link } from "@inertiajs/inertia-react";
import React from "react";
import classNames from "classnames";
import { ContentParagraph } from "./Paragraph";

//nav item of the nav auth component
export default function NavItem({ href, children, className }){
    return (
        <li className={classNames(className)}>
            <ContentParagraph>
                <Link href={href} className="text-white tracking-wide hover:opacity-50 h-[50px]">{children}</Link>
            </ContentParagraph>
        </li>
    )
}
