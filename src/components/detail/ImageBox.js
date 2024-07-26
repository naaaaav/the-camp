import React from "react";



function ImageBox(props){
    return(
    <div style={{width: `${props.width}` , height: `${props.height}` }}>
        <img src={props.src} style={{width: '100%' , height:'100%' , objectFit:'cover' , borderRadius:'10px'}}></img>
    </div>
    );
}


export default ImageBox;