//SKELETON

import { useEffect, useState } from "react";

//The skeleton of new project
export default function ProjectName(){

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
            </div>
    )
}
