//COMPONENT

import NavItem from "./NavItem";
import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/inertia-react";

//nav auth and parse cookie on rendering and delete cookies and handle logout
export default function NavAuth(){

    const [cookie, setCookie] = useState({});

    function deleteAllCookies() {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }

    const parseCookie = (str) =>
        str
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, v) => {
            acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
            return acc;
        }, {});

    useEffect(()=>{
        const cookieParsed = parseCookie(document.cookie);
        if(cookieParsed.accessToken)
        {
            setCookie(cookieParsed)
        }
        else
        {
            setCookie({})
        }
    },[])

    const submit = async (e) => {
        e.preventDefault();

        await axios.post("/logout",{accessToken:cookie.accessToken})
        .then((response)=>{
            deleteAllCookies();
            const host = window.location.host
            const domain = `http://${host}`

            window.location.assign(`${domain}/`)
        })
        .catch(
            function (error){
                console.error(error)
            }
        )
    }

    return (
        <ul className="bg-blue-900 w-full sm:flex lg:space-x-[45px] py-3 pl-[20px] justify-end md:space-x-7 md:pr-7 lg:pr-20">
                <NavItem href="/homepage" >Home</NavItem>
                <NavItem href="/dashboard" >Dashboard</NavItem>
                <form className="text-left" method="POST" onSubmit={submit}>
                    <button type="submit" className="md:text-lg font-regular text-white tracking-widest w-full md:leading-10 leading-9 md:text-left text-left">
                        Logout
                    </button>
                </form>
        </ul>
    )
}
