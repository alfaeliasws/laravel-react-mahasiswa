import { useEffect } from "react";

export function useConsoleLog(...variable){
    useEffect(()=>{
        console.log(...variable)
    })
    return;
}
