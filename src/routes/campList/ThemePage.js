import { FaSwimmer,FaWalking,FaUmbrellaBeach,FaWifi } from "react-icons/fa";
import { GiValley,GiRiver,GiWaterGun,GiBoatFishing,GiSoccerField,GiFarmer,GiElectric , GiWaterDrop ,GiJumpingRope,GiWoodPile,GiKidSlide   } from "react-icons/gi";
import IconBox from "../../components/campList/IconBox";
import { MdOutlineSurfing } from "react-icons/md";
import { MdLocalConvenienceStore } from "react-icons/md";
import { TbHorseToy } from "react-icons/tb";
import { Link } from "react-router-dom";
function ThemePage(){
    return(
        <div style={{margin:"auto"}}>
            <h1>테마 검색</h1>
            <div style={{display:"grid" , gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr 1fr"}}>
                <IconBox title="수영장" > 
                    <FaSwimmer size="70"/>
                </IconBox>
                <IconBox title="산책로">
                    <FaWalking size="70" />
                </IconBox>
                <IconBox title="계곡 물놀이">
                    <GiValley size="70"/>
                </IconBox>
                <IconBox title="강">
                    <GiRiver size="70"/>
                </IconBox>
                <IconBox title="물놀이">
                    <GiWaterGun size="70"/>
                </IconBox>

                <IconBox title="수상레저">
                    <MdOutlineSurfing size="70"/>
                </IconBox>
                <IconBox title="낚시">
                    <GiBoatFishing size="70"/>
                </IconBox>
                <IconBox title="해수욕">
                    <FaUmbrellaBeach size="70"/>
                </IconBox>
                <IconBox title="어린이놀이시설">
                    <TbHorseToy size="70"/>
                </IconBox>
                <IconBox title="운동장">
                    <GiSoccerField size="70"/>
                </IconBox>
                <IconBox title="농어촌체험시설">
                    <GiFarmer size="70"/>
                </IconBox>
                <IconBox title="전기">
                    <GiElectric size="70"/>
                </IconBox>
                <IconBox title="온수">
                    <GiWaterDrop size="70"/>
                </IconBox>
                <IconBox title="트렘폴린">
                    <GiJumpingRope size="70"/>
                </IconBox>
                <IconBox title="무선인터넷">
                    <FaWifi size="70"/>
                </IconBox>
                <IconBox title="장작판매">
                    <GiWoodPile size="70"/>
                </IconBox>
                <IconBox title="놀이터">
                    <GiKidSlide  size="70"/>
                </IconBox>
                <IconBox title="편의점">
                    <MdLocalConvenienceStore size="70"/>
                </IconBox>
            </div>
        </div>
    )

}




export default ThemePage;