import { useState } from "react"

function Login(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    async function handleLogin(event){
        event.preventDefault()
        
        const response = await fetch('http://localhost:3030/api/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            })
        })

        const data = await response.json();

        if(data.user){
            localStorage.setItem('token', data.token)
            alert('Login successful')
            window.location.href = '/dashboard'
        }else {
            alert('Please check your username and pass');
        }

    }
    return (
        <div>
            <h1> Log In </h1>

            <form onSubmit={handleLogin}>
                <input
                 value={email}
                 onChange={(event) => {setEmail(event.target.value)}}
                 type="email" 
                 placeholder="Email"
                />
                <input
                 value={password}
                 onChange={(event) => {setPassword(event.target.value)}}
                 type="password" 
                 placeholder="Password"
                />

                <input type="submit" value="Log In"/>
            </form>
        </div>
    )
}

export default Login