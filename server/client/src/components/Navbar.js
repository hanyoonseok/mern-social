import React, { useContext,useRef,useEffect,useState } from 'react';
import {Link,useHistory} from 'react-router-dom'
import { UserContext } from '../App';
import M from 'materialize-css'

//a 태그 대신 Link 쓴다고 생각하면 편함.
//a태그는 누를때마다 새로고침됨 Link는 그냥 바로 바뀜
//Link로 바뀌면 href 대신 to 사용
const NavBar=()=>{
    const searchModal=useRef(null)
    const [search,setSearch]=useState('')
    const [userDetails,setUserDetails]=useState([])
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    
    useEffect(()=>{
        M.Modal.init(searchModal.current)
    },[])

    const renderList = ()=>{
        if(state){
            return[
                <li key="1"><i className="large material-icons modal-trigger" data-target="modal1" style={{color:"black"}}>search</i></li>,
                <li key="2"><Link to="/profile">Profile</Link></li>,
                <li key="3"><Link to="/create">Create Post</Link></li>,
                <li key="4"><Link to="/myfollowingpost">My following Posts</Link></li>,
                <li key="5">
                    <button className="btn #c62828 red darken-3" 
                    onClick={()=>{
                    localStorage.clear()
                    dispatch({type:"CLEAR"})
                    history.push('/signin')}}>Logout</button>    
                </li>,
            ]
        }else{
            return[
                <li key="6"><Link to="/signin">Signin</Link></li>,
                <li key="7"><Link to="/signup">Signup</Link></li>
            ]
        }
    }
    const fetchUsers=(query)=>{
        setSearch(query)
        fetch('/search-users',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                query
            })
        }).then(res=>res.json())
        .then(results=>{
            setUserDetails(results.user)
        })
    }
    return(
        <nav>
            <div className="nav-wrapper white" >
                <Link to={state?"/":"/signin"} className="brand-logo left">Hanstagram</Link>
                <ul id="nav-mobile" className="right">
                    {renderList()}
                </ul>
            </div> 
            <div id="modal1" className="modal" ref={searchModal} style={{color:"black"}}>
                <div className="modal-content">
                    <input
                    type="text"
                    placeholder="search users"
                    value={search}
                    onChange={(e)=>fetchUsers(e.target.value)}
                    />
                    <ul className="collection">
                        {userDetails.map(item=>{
                            return <Link to={item._id != state._id ? "/profile/"+item._id:'/profile'} onClick={()=>{
                                M.Modal.getInstance(searchModal.current).close()
                                setSearch('')
                            }}><li className="collection-item" style={{color:"black"}}>{item.email}</li></Link>
                        })}
                    </ul>
                </div>
                <div className="modal-footer">
                    <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>Close</button>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;