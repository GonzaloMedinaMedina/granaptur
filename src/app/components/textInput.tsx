import React from "react";

const TextInput = ( setText: any , hideInput:boolean = false, initValue: string = '', width: string = 'auto', label: string = '') =>
{
    const inputType: string = hideInput === true ? "password" : "text";
    var inputComponent;
    if (initValue === '')
    {
        inputComponent = <input type={inputType} onChange={(e: any) => setText(e.target.value)}></input>
    }
    else
    {
        inputComponent = <input type={inputType} onChange={(e: any) => setText(e.target.value)} value={initValue} style={{width: width}}></input>
    }

    return ( <div className='flex p-2'>
            {label == '' ? null : <h1 className="px-2">{label}</h1>}
            {inputComponent}
        </div>
    );
};

export default TextInput;