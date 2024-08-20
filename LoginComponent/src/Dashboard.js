import React, { useEffect } from "react";
import { jwtDecode } from 'jwt-decode' 
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const history = useNavigate()

    async function populateQuote() {
        const request = await fetch('http://localhost:1337/api/quote', {
            headers:{
                'x-access-token':localStorage.getItem('token')
            }
        })

        const data = request.json()
        console.log(data)
    }

    useEffect (() =>{
        const token = localStorage.getItem('token')
        if(token){
            const user  = jwtDecode(token)
            if(!user){
                localStorage.removeItem('token')
                history('/')
            } else{
                 populateQuote()
            }
        }
    }, [])
    
    return <h1> Welcome Aboard</h1>
}

export default Dashboard