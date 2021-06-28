import React,{useState,useEffect} from 'react'

const Home = ()=>{
    const [data, setData]=useState([])
    useEffect(()=>{
        fetch('/allpost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            //result = posts[]
            setData(result.posts) //posts에 있는 모든 post들을 data로
        })
    },[])
    return(
        <div className="home">
            {
                data.map(item=>{ //모든 data 돌면서 있는 post들 생성
                    return(
                        <div className="card home-card" key={item._id}>
                            <h5>{item.postedBy.name}</h5>
                            <div className="card-image">
                                <img alt="" src={item.photo}/>
                            </div>
                            <div className="card-content">
                                <i className="material-icons" style={{color:"red"}}>favorite</i>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                <input type="text" placeholder="add a comment"/>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Home