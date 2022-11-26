import { useConsoleLog } from "@/Helper/useConsoleLog";

//input text component
export default function FormInputText({label, placeholder, value, onChange, readOnly, onBlur}){

    if(!readOnly){
        readOnly = false;
    }

    return (
        <div className="w-full flex flex-wrap">
            <label htmlFor={label} className="w-full">{label}</label>
            <input onChange={onChange} onBlur={onBlur} className="w-full rounded-md" type="text" name={label} value={value} placeholder={placeholder} readOnly={readOnly}/>
        </div>
    )
}
