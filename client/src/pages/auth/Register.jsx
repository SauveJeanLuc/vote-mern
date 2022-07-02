import {Button, Form} from 'react-bootstrap'

export default function Register(){
    return(
        <>
        <form>
            <Form>
                <h1> Register </h1>

                <Form.Group className='mb-3' controlId='formBasicName'>
                    <Form.Label> Name </Form.Label>
                    <Form.Control
                        type = "name"
                        placeholder='Enter Name'
                    />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicName'>
                    <Form.Label> Email </Form.Label>
                    <Form.Control
                        type = "email"
                        placeholder='Enter your email'
                    />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label> Password </Form.Label>
                    <Form.Control 
                        type = "password"
                        placeholder='password'
                    />
                </Form.Group>

                <Button type="submit"> Register </Button>

            </Form>
        </form>
        </>
    )
}