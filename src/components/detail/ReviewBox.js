import styles from "../../styles/detail/ReviewBox.module.css";

function ReviewBox(props){
    return(
        <div style={{width: `${props.width}` , height: `${props.height}`}} className={styles.box}>
            <h6>{props.writer}</h6>
            <p>
                정말 너무 시설이 좋아서 만족해요. 아이와 같이 다녀왔는데 깔끔하고 사장님이 친절히 대해 주셔서 좋았습니다. 다음에 재방문
            </p>

        </div>
    );
}


export default ReviewBox;