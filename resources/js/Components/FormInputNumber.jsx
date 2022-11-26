//input number component
export default function FormInputNumber({label, placeholder, value, onChange, min, max, readOnly}){

    if(!readOnly){
        readOnly = false;
    }

    return (
        <div className="w-full flex flex-wrap">
            <label htmlFor={label} className="w-full">{label}</label>
            <input onChange={onChange} min={min} max={max} className="w-full rounded-md" type="number" name={label} value={value} placeholder={placeholder} readOnly={readOnly}/>
        </div>
    )
}
