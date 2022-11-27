import { useEffect } from "react";

export function useConsoleLog(...variable){
    useEffect(()=>{
        console.log(...variable)
    })
    return;
}

export function useConsoleLogWatcher(dependency){
    useEffect(()=>{
        console.log(dependency)
    },[dependency])
    return
}
