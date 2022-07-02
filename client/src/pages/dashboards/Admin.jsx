import { Button, Container, Form , Row} from "react-bootstrap"
import NavigationBar from '../../components/NavigationBar';

export default function Admin() {
    return(
        <>
        <NavigationBar/>
        <Container className="d-flex justify-content-center align-items-center p-3 col-4">
                <form className="justify-content-center">
                  <Form>
                        <h1> Create Candidate </h1>

                        <Form.Group className="mb-3" >
                            <Form.Label> First Name </Form.Label>
                            <Form.Control
                                type = "text"
                                placeholder = "input candidate First Name"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label> Last Name </Form.Label>
                            <Form.Control
                                type = "text"
                                placeholder = "input candidate Last Name"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label> Image url </Form.Label>
                            <Form.Control
                                type = "text"
                                placeholder = "image url"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label> Upload Image </Form.Label>
                            <Form.Control
                                type = "file"
                                placeholder = "file"
                            />
                        </Form.Group>
            
                        <Button type="submit"> Register </Button>
                    </Form>
                </form>
        </Container>
        </>
    )
}