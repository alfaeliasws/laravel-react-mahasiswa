import { useEffect } from "react";

export function useVariableCatcher(...variable){
    useEffect(()=>{
        console.log("done")
    })
    return "Variable Passed"
}
