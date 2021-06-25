import React from 'react';
import {Link} from 'react-router-dom'

//a 태그 대신 Link 쓴다고 생각하면 편함.
//a태그는 누를때마다 새로고침됨 Link는 그냥 바로 바뀜
//Link로 바뀌면 href 대신 to 사용
const NavBar=()=>{
    return(
        <nav>
            <div className="nav-wrapper white" >
                <Link to="/" className="brand-logo left">Hanstagram</Link>
                <ul id="nav-mobile" className="right">
                    <li><Link to="/signin">Signin</Link></li>
                    <li><Link to="/signup">SignUp</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                </ul>
            </div> 
        </nav>
    )
}

export default NavBar;