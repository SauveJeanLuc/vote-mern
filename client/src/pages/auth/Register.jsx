import {Button, Form, Container, Nav} from 'react-bootstrap'
import NavigationBar from '../../components/NavigationBar';
import { useState } from 'react'

export default function Register(){
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

    return(
        <>
        <NavigationBar isLoggedIn={false} />
        <Container className="d-flex justify-content-center align-items-center p-3 col-4">
                <Form onSubmit={registerUser}>
                    <span> Let's get started 🤝 </span>

                    <h1> Sign Up </h1>

                    <Form.Group className='mb-3' controlId='formBasicName'>
                        <Form.Label> Name </Form.Label>
                        <Form.Control
                            value={name}
                            onChange={function(e){
                            setName(e.target.value);
                            }}
                            type = "name"
                            placeholder='Enter Name'
                        />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formBasicName'>
                        <Form.Label> Email </Form.Label>
                        <Form.Control
                            value={email}
                            onChange={function(e){
                            setEmail(e.target.value);
                            }}
                            type = "email"
                            placeholder='Enter your email'
                        />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label> Password </Form.Label>
                        <Form.Control 
                            value={password}
                            onChange={function(e){
                                setPassword(e.target.value);
                            }}                         
                            type = "password"
                            placeholder='password'
                        />
                    </Form.Group>

                    <Button type="submit"> Register </Button>

                    <Nav.Link onClick={() => {window.location.href = '/login'}}> Already have an account ? </Nav.Link>

                </Form>
        </Container>
        </>
    )
}