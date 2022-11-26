import NavItem from "./NavItem";
import React, { useState } from "react";

// nav component for unauthed user
export default function Nav(){

    return (
        <ul className="bg-blue-900 w-full sm:flex lg:space-x-[45px] py-3 pl-[20px] justify-end md:space-x-7 md:pr-7 lg:pr-20">
                <NavItem href="/" >Home</NavItem>
                <NavItem href="/login">Login</NavItem>
        </ul>
    )
}

