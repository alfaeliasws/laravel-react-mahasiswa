//SKELETON
import { useConsoleLog } from "@/Helper/useConsoleLog";

//input text component
export default function FormInputText({className, label, placeholder, value, onChange, readOnly, onBlur}){

    if(!readOnly){
        readOnly = false;
    }

    return (
        <div className={`w-full flex flex-wrap ${className}`}>
            <label htmlFor={label} className="w-full">{label}</label>
            <input onChange={onChange} onBlur={onBlur} className="w-full rounded-md" type="text" name={label} value={value} placeholder={placeholder} readOnly={readOnly}/>
        </div>
    )
}
