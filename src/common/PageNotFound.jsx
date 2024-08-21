import { useNavigate } from "react-router-dom"
import Button from "../Element/Button"

export const PageNotFound =()=>{
    const navigate = useNavigate();
    return (
        <div className="div404">
             <div className="information">
                <div className="title">404 -Page Not Found</div> 
                <div className="content">
                    The page you are looking is not available.
                </div> 
             </div>
             <div className="info404">
               &nbsp;
               <Button onClick={()=>navigate('/')}>Go To Home</Button>
             </div>
        </div>
    )
}