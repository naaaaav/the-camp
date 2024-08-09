

import { Link } from "react-router-dom";

function IconBox(props){
    return(
        <div style={{display:"flex" , flexDirection:"column" , justifyContent:"center" , alignItems:"center", width:"120px" , height:"100px"}}>
            <Link to={"/campList?page=0&type=theme&query="+props.title}>
            {
                props.children
            }
            <div>{props.title}</div>
            </Link>
        </div>
    )
}


export default IconBox;