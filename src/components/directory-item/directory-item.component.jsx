/* eslint-disable react/prop-types */
import "./directory-item.styles.scss"
import { useNavigate } from "react-router-dom";


// eslint-disable-next-line react/prop-types
const DirectoryItem = ({category}) => {


      const { imageUrl, title, route } = category;

   

   
    const navigate = useNavigate();


    const onNavigateHandler = () => navigate(route) 
    return (
        <div className="directory-item-container" onClick={onNavigateHandler}>
           <div className="background-image" style={{
              backgroundImage: `url(${imageUrl})`
           }}/>
           
           <div className="directory-body-container">
             <h2>{title}</h2>
             <p>Shop now</p>
           </div>
        </div>
    )
}


export default DirectoryItem;