import classNames from "classnames"
import React from "react";

//paragraph items component
export default function Paragraph({children, className}){
    let addClass = ""

    if(className.includes("card-title")){
        if(children.length < 20) className = className + `, ${"hover:tracking-quite"}`
        if(children.length >= 20) className = className + `, ${"hover:tracking-widest"}`
    }

    return (
        <p className={classNames(`text-sm font-regular text-white`,className)}>
            {children}
        </p>
    )
}

export function BulletedList({children, className}){
    return (
        <li className={classNames("text-md font-regular text-white tracking-widest w-full",className)}>
            {children}
        </li>
    )
}

export function ContentParagraph({children, className}){
    return (
        <p className={classNames("md:text-lg font-regular text-white tracking-widest w-full md:leading-10 leading-9 ",className)}>
            {children}
        </p>
    )
}

export function ContentParagraphBlack({children, className}){
    return (
        <p className={classNames("md:text-lg font-regular text-black tracking-widest w-full md:leading-10 leading-9 ",className)}>
            {children}
        </p>
    )
}

export function ContentParagraphBlackMedium({children, className, key}){
    return (
        <p className={classNames("md:text-sm text-sm font-regular text-black tracking-wider w-full md:leading-2 leading-2 ",className)}>
            {children}
        </p>
    )
}

export function ContentParagraphBlackSmall({children, className}){
    return (
        <p className={classNames("md:text-xs text-xs font-regular text-black tracking-wider w-full md:leading-2 leading-2 ",className)}>
            {children}
        </p>
    )
}

export function MiniTextBlack({children, className}){
    return (
        <p className={classNames("text-gray-500 text-sm",className)}>
            {children}
        </p>
    )
}

export function ContentWithLink({children, className}){
    return (
        <p className={classNames("md:text-lg font-regular text-white tracking-widest md:leading-10 leading-9 ",className)}>
            {children}
        </p>
    )
}

export function Title({children, className}){
    return (
        <p className={classNames("text-4xl font-semibold text-white tracking-widest",className)}>
            {children}
        </p>
     )
}

export function ContentH1({children, className}){
    return (
        <p className={classNames("text-3xl font-semibold text-white tracking-widest",className)}>
            {children}
        </p>
     )
}

export function ContentH2({children, className}){
    return (
        <p className={classNames("text-xl font-regular text-white tracking-wider",className)}>
            {children}
        </p>
    )
}

export function ContentH3({children, className}){
    return (
        <p className={classNames("text-lg font-regular text-white tracking-wider",className)}>
            {children}
        </p>
    )
}
