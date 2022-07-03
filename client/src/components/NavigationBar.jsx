import { Navbar, Container, Nav, Form, FormControl, Button } from "react-bootstrap";


export default function NavigationBar({isLoggedIn, isViewing, isUpdating}){
    return(
        <Navbar bg="light" expand="lg">
            <Container fluid className="d-flex justify-content-between">
                <Navbar.Brand href="#"> VOTE YOUR CHOICE </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />

                { isLoggedIn ? 
                    <Navbar.Collapse id="navbarScroll" className=" justify-content-end ">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight : '100px'}} 
                            navbarScroll                  
                        >
                            
                            <Nav.Link className="primary" onClick={() => {window.location.href='/admin'}}> Register</Nav.Link>
                            <Nav.Link onClick={() => {window.location.href='/candidate'}}> View </Nav.Link>
                            <Nav.Link disabled={!isUpdating}> Update </Nav.Link>
                            
                        </Nav>
                        <Form className="d-flex">
                                <FormControl
                                    type = "search" 
                                    placeholder="search candidate"
                                    className="me-2"
                                    aria-label="search" 
                                    disabled={!isViewing}
                                />
                                <Button variant="outline-primary" disabled> Search </Button>
                        </Form>
                    </Navbar.Collapse> : null
                }
             
            </Container>
        </Navbar>

    )
}