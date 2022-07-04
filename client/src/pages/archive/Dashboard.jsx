import { useEffect } from "react";
// import {jwt} from "jsonwebtoken"
import jwt_decode from "jwt-decode";
import { useState } from "react";
 


export default function Dashboard  () {

   const [quote, setQuote] = useState('')
   const [tempQuote, setTempQuote] = useState('')

   async function populateQuote(){

      const req = await fetch('http://localhost:3030/api/quote', {
         method: 'GET',
         headers: {
            'Authorization': "Bearer "+localStorage.getItem('token')
         },       
      })

      const data = await req.json()

      if(data.status === 'ok'){
         setQuote(data.quote)
      }else {
         alert("Error 1: " + data.error )
      }
      console.log(data)
   }

   // Verify if user is logged in
    
   useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {

         const user = jwt_decode(token);

         if(!user) {
            localStorage.removeItem('token')
            window.location.href = '/login'
         } else {
            populateQuote();
         }
      } else{
         window.location.href = '/login'
      }
   }, [])

   async function updateQuote (event){

      event.preventDefault()
       
      const req = await fetch('http://localhost:3030/api/quote', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token')
         },       
         body: JSON.stringify({
            quote: tempQuote,
         })
      })
      
      const data = await req.json()
      if(data.status === 'ok'){
         setQuote(tempQuote)
         setTempQuote('')
      }else {
         alert("Error 2 : " + data.error)
      }
      
   }

   return (
      <div>
         <h1>
            Logged In To VOTE YOUR CHOICE
         </h1>

         {/* <h1>Your quote: {quote || "No quote found "}</h1> 
         <form onSubmit={updateQuote}>
            <input 
               type="text" 
               placeholder="Quote"
               value={tempQuote}
               onChange={(e) => setTempQuote(e.target.value)}
            />
            <input type="submit" value=" Update Quote "/>
         </form> */}
      </div>
   )
   
}