import { Nav, Container, Navbar, NavDropdown } from 'react-bootstrap';

function Header() {
    const isLoggedin: boolean = false;

    return (
        <header className="Header">
            <Navbar expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar.nav" />
                    <Navbar.Collapse id="basic-navbar.nav">
                        <Nav className="me-auto">
                            {isLoggedin ? (
                                <>
                                    <Nav.Link href="#start">Start</Nav.Link>
                                    <Nav.Link href="#mypage">My page</Nav.Link>
                                    <NavDropdown
                                        title="Options"
                                        id="basic-navbar.nav"
                                    >
                                        <NavDropdown.Item href="#">
                                            About
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#">
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) : (
                                <>
                                    <Nav.Link href="#">About</Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
