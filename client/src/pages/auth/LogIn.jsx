import { Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Login () {
    return(
        <>
            <form>
                <Form>
                    <h1>Log In</h1>

                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label> Email Address </Form.Label>
                        <Form.Control
                            type = "email"
                            placeholder = "Enter email"
                        />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formBasicPassword'>
                        <Form.Label> Password </Form.Label>
                        <Form.Control
                            type = "password"
                            placeholder = "Password"
                        />
                        <Form.Text > Password won't be shared </Form.Text>
                    </Form.Group>

                    <Button type="submit"> Log In </Button>

                </Form>
            </form>
        </>
    )
}