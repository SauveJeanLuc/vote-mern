import { Navbar, Container, Nav, Form, FormControl, Button } from "react-bootstrap";

export default function NavigationBar(){
    return(

        <Navbar bg="light" expand="lg">
            <Container fluid className="d-flex justify-content-between">
                <Navbar.Brand href="#"> VOTE YOUR CHOICE </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" className=" justify-content-end ">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight : '100px'}} 
                        navbarScroll                  
                    >
                        <Nav.Link className="primary"> Register</Nav.Link>
                        <Nav.Link> View </Nav.Link>
                        <Nav.Link disabled> Update </Nav.Link>
                        
                    </Nav>
                    <Form className="d-flex">
                            <FormControl
                                type = "search" 
                                placeholder="search candidate"
                                className="me-2"
                                aria-label="search"  
                                disabled
                            />
                            <Button variant="outline-primary" disabled> Search </Button>
                    </Form>
                </Navbar.Collapse>

             
            </Container>
        </Navbar>

    )
}