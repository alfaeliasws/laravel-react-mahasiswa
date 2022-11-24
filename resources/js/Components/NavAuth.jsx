import NavItem from "./NavItem";
import React, { useState } from "react";
import { Link } from "@inertiajs/inertia-react";

export default function NavAuth(){

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

    const cookie = parseCookie(document.cookie);

    // const headers = {
    //     'Authorization': `Bearer ${cookie.accessToken}`,
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //     'X-Requested-With':'XMLHttpRequest'
    // }

    const submit = async (e) => {
        e.preventDefault();

        await axios.post("/logout",{accessToken: cookie.accessToken}
        // {
        //     headers: headers,
        // }
        )
        .then(()=>{
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
                <form method="POST" onSubmit={submit}>
                    <button type="submit" className="md:text-lg font-regular text-white tracking-widest w-full md:leading-10 leading-9">
                        Logout
                    </button>
                </form>
        </ul>
    )
}
