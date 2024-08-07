



function IconBox(props){
    return(
        <div style={{display:"flex" , flexDirection:"column" , justifyContent:"center" , alignItems:"center", width:"120px" , height:"100px"}}>
            {
                props.children
            }
            <div>{props.title}</div>
        </div>
    )
}


export default IconBox;