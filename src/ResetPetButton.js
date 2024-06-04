import React from "react";

function ResetPetButton(props){

    return(
        <button className="reset-pet" onClick={props.clearName}>Reset Pet</button>
    )
}

export default ResetPetButton