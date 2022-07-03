import { useState } from 'react'

function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function registerUser(event) {
    event.preventDefault();

    const response = await fetch('http://localhost:3030/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      }),
    }) 
    const data = await response.json();

    console.log(data);

    if(data.status === '201 Created') {
      window.location.href = '/login'
    }

  }
  

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
         value={name}
         onChange={function(e){
          setName(e.target.value);
         }}
         type="text" 
         placeholder='Name'
        />
        <input
         value={email}
         onChange={function(e){
          setEmail(e.target.value);
         }}        
         type="email" 
         placeholder='Last Name' 
        />
        <input 
          value={password}
          onChange={function(e){
            setPassword(e.target.value);
           }}          
          type={password} 
          placeholder='Password' />
        
        <input type="submit" value="Register"/>
      </form>
    </div>
  )
}

export default Register;
