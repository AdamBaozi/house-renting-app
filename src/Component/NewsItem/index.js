import { importAll, getImagePath } from "../../Utils/imagesGuider";
import './index.css';

const images = importAll(require.context('../../assets/img/news', false, /\.(png|jpe?g|svg)$/));

const NewsItem = ({id, title, imgSrc, from, date}) => {
    return (
        <div className="newItem" id={id}>
            <div className="NewsImage">
                <img src={require(`../../assets${imgSrc}`)}/>
            </div>
            <div className="desc">
                <span className="title">{title}</span>
                <span className="source">
                    <span className="from">{from}</span>
                    <span className="date">{date}</span>
                </span>
                
            </div>

        </div>
    )
}

export default NewsItem;