


function ZoneBox(){
    return(
        <div style={{border:"1px solid black"}}>
            title: <input type="text"></input> <br/>
            소개글: <input type="text"></input> <br/>
            체크인: <input type="time"></input> 
            체크아웃: <input type="time"></input> <br/>
            비수기 가격: <input type="number" min={0}></input> <br/>
            성수기 가격: <input type="number" min={0}></input> <br/>
            극성수기 가격: <input type="number" min={0}></input>
        </div>
    )
}


export default ZoneBox;