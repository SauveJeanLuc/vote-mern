import { Button, Form, Container, Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from '../../components/NavigationBar';
import { useState } from 'react';

export default function Login () {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin(event){
        event.preventDefault()
        
        const response = await fetch('http://localhost:3030/api/user/login', {
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
            window.location.href = '/admin'
        }else {
            alert('Please check your username and pass');
        }

    }

    return(
        <>
            <NavigationBar isLoggedIn={false} />
            <Container className="d-flex justify-content-center align-items-center p-3 col-4">
                {/* <form onSubmit={handleLogin}> */}

                    <Form onSubmit={handleLogin}>
                        <span> Welcome Back 👋 </span>
                        <h1>Log In</h1>

                        <Form.Group className='mb-3' controlId='formBasicEmail'>
                            <Form.Label> Email Address </Form.Label>
                            <Form.Control
                                value={email}
                                onChange={(event) => {setEmail(event.target.value)}}
                                type = "email"
                                placeholder = "Enter email"
                            />
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='formBasicPassword'>
                            <Form.Label> Password </Form.Label>
                            <Form.Control
                                value={password}
                                onChange={(event) => {setPassword(event.target.value)}}
                                type = "password"
                                placeholder = "Password"
                            />
                            <Form.Text > Password won't be shared </Form.Text>
                        </Form.Group>

                        <Button type="submit"> Log In </Button>

                        <Nav.Link onClick={() => {window.location.href = '/register'}}> Have no account ? </Nav.Link>

                    </Form>
                {/* </form> */}
            </Container>
        </>
    )
}