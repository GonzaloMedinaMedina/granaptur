import React from "react";

interface iTextInput
{
    setText: any, 
    hideInput:boolean,
    initValue: string,
    width: string,
    label: string
}

const TextInput: React.FC<iTextInput> = ( {setText , hideInput, initValue, width, label}) =>
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