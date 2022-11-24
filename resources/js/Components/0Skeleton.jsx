import { useEffect, useState } from "react";

export default function AssignMatkulComponent(){

    const [isBusy, setIsBusy] = useState(true);

    useEffect(() => {
        setIsBusy(false)
    })

    return (
            <div>
                {
                    isBusy === false 
                    ?
                    (
                        <div></div>
                    )
                    :
                    <div></div>
                }
                Assign Matkul
            </div>
    )
}
