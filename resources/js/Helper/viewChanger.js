export function viewChanger(state, setState, type, e, value, value1, value2){
    if(e) e.preventDefault();

    if(type == "boolean" && !value)
    {
        if(state)setState(false);
        if(!state)setState(true);
    }

    if(type == "boolean" && value)
    {
        setState(value);
    }

    if(type == "string")
    {
        if(state === value2)setState(value1);
        if(!state === value1)setState(value2);
    }
}

