import { Nav, Container, Navbar, NavDropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import './styles/header-footer.scss';

function Header() {
    const { isLoggedIn, setIsLoggedIn, accName } = useAuthContext();

    const navigate = useNavigate();

    function handleLoggout() {
        setIsLoggedIn(false);
        navigate('/');
    }

    return (
        <header className="Header">
            <Navbar expand="lg" className="navbar-style">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar.nav" />
                    <Navbar.Collapse id="basic-navbar.nav">
                        <Nav className="me-auto">
                            {isLoggedIn ? (
                                <>
                                    <p className="m-2">
                                        Welcome <b>{accName}</b>
                                    </p>

                                    <Nav.Link href="#start">Start</Nav.Link>
                                    <Nav.Link href="#likes">Liked</Nav.Link>
                                    <Nav.Link href="#bids">Bids</Nav.Link>

                                    <NavDropdown
                                        title="Options"
                                        id="basic-navbar.nav"
                                    >
                                        <NavDropdown.Item href="#about">
                                            About
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item
                                            onClick={handleLoggout}
                                        >
                                            Log out
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) : (
                                <>
                                    <Nav.Link href="#about">About</Nav.Link>
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
