export function viewChanger(state, setState, type, e, value1, value2){
    e.preventDefault();

    if(type == "boolean")
    {
        if(state)setState(false);
        if(!state)setState(true);
    }

    if(type == "string")
    {
        if(state === value2)setState(value1);
        if(!state === value1)setState(value2);
    }
}

