import ImageBox from "../detail/ImageBox";
import TitleBox from "../detail/TitleBox";

function CampBox(props){
    return(
        <div style={{border:"1px solid black" , width:"300px" , height:"400px"}}>
            <ImageBox width="300px" height="150px" src={props.src}/>
            <TitleBox title={props.facltNm}>
                <div>
                    {props.price}
                </div>
            </TitleBox>
            <TitleBox title="태그">
                
            </TitleBox>

        </div>
    );
}


export default CampBox;