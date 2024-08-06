import React from "react";





function TitleBox(props){
    return(
    <div style={{margin:"50px"}}>
        <h4>{props.title}</h4>
        <div>
            {props.children}
        </div>
    </div>
    );
}


export default TitleBox;