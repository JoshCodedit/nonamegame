import React from "react";


export default function CardComponent(props){
    const cardFace = props.isFlipped ? props.image : './images/card-back.png'
    return(
        <img className="cards" src={cardFace} style={props.show} onClick={props.flipCard}/>
    )
}