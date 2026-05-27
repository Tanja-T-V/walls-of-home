import { Nav, Container, Navbar, NavDropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

function Header() {
    const { isLoggedIn, setIsLoggedIn } = useAuthContext();

    const navigate = useNavigate();

    function handleLoggout() {
        setIsLoggedIn(false);
        navigate('/');
    }

    return (
        <header className="Header">
            <Navbar expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar.nav" />
                    <Navbar.Collapse id="basic-navbar.nav">
                        <Nav className="me-auto">
                            {isLoggedIn ? (
                                <>
                                    <Nav.Link href="#start">Start</Nav.Link>
                                    <Nav.Link href="#likes">Liked</Nav.Link>
                                    <NavDropdown
                                        title="Options"
                                        id="basic-navbar.nav"
                                    >
                                        <NavDropdown.Item href="#">
                                            About
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item
                                            onClick={handleLoggout}
                                        >
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

Header.propTypes = {
    isLoggedIn: PropTypes.bool,
};

export default Header;
