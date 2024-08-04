import React, {useState} from 'react';
export type ClickFunction = (index: number) => void;
function DeleteButton(props: {clickEvent: ClickFunction, index: number}){
    function handleClick(){
        props.clickEvent(props.index); // this is hacky, but it should work for injection
    }

    return (
        <button onClick={handleClick}>Delete</button>
    );
}

export default DeleteButton