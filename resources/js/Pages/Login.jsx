import React, {useEffect, useRef, useState} from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import Nav from '@/Components/Nav'
import axios from 'axios';
import Body from '@/Components/Body';
import { MiniTextBlack, Title } from '@/Components/Paragraph';
import { useConsoleLog } from '@/Helper/useConsoleLog';
import LoadingComponent from '@/Components/LoadingComponent';

export default function Login(){

    const [loginData, setLoginData] = useState({
        login_id: "",
        password: ""
    })
    const [isBusy, setIsBusy] = useState(false)
    const [message, setMessage] = useState("")

    let btnRef = useRef();

    const onButtonClick = ()=>{
        if(btnRef.current)
        {
            btnRef.current.setAttribute("disabled","disabled")
        }
    }

    const loginIdHandler = (e) => {
        e.preventDefault();
        setMessage("")
        setLoginData(loginData => ({...loginData, login_id: e.target.value}))
    }

    const passwordHandler = (e) => {
        e.preventDefault();
        setMessage("")
        setLoginData(loginData => ({...loginData, password: e.target.value}))
    }

    const submit = async (e) => {
        e.preventDefault();

        onButtonClick()
        //authenticate

        setIsBusy(true)
        await axios.post("/authentication", {

            //data to authenticate
            login_id: loginData.login_id,
            password: loginData.password
        })
            .then((response)=>{
                //next redirect
            if(response.data.status === 422)
            {
                setMessage("Credentials Doesn't Match")
                setIsBusy(false)
            }

            if(response.data.status === 200){

                const host = window.location.host
                const domain = `http://${host}`
                const route = response.data.next
                const AuthStr =response.data.authorisation.token

                document.cookie=`accessToken=${AuthStr}`

                window.location.assign(`${domain}${route}`)
            }

        })
            .catch((error)=>console.log(error))
    }


    return (
        <Body>
            <div className="flex flex-wrap w-full justify-center items-center h-[500px]">
                <div>
                    <Title className="text-black font-bold py-30 text-2xl pl-3 pt-3 flex justify-start w-full mb-4">
                        { isBusy ?  "Logging In" : "Login Page"}
                    </Title>
                    {
                        isBusy ?
                            <LoadingComponent/>
                        :
                        <div>
                            {
                                message !== "" ?
                                <MiniTextBlack className="text-red-500 ml-3 -mt-1 mb-1">{message}</MiniTextBlack>
                                :
                                <div></div>
                            }
                            <div className="flex flex-wrap w-full rounded-2xl shadow-whitebg-medium bg-slate-200">
                                <form onSubmit={submit} className="flex flex-wrap py-5 ml-3">
                                    <label htmlFor="login_id" className='pl-3 pt-3 w-full'>Your Id</label>
                                    <input type="text" name="login_id" onChange={loginIdHandler} className='pl-3 py-3 w-10/12 ml-3' placeholder="Enter your ID here"/>
                                    <label htmlFor="password" className='pl-3 pt-3 w-full' >Password</label>
                                    <input type="password" name="password" onChange={passwordHandler} className='w-10/12 pl-3 py-3 ml-3' placeholder="Enter your password here"/>
                                    <button type="submit" ref={btnRef} className="shadow-2xl hover:bg-blue-900 w-3/12 py-2 bg-blue-800 text-white border-none rounded-lg ml-3 mt-4 ">Login</button>
                                </form>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </Body>
    )
}
