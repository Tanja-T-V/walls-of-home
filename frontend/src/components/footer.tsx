import { Dot, CCircle } from 'react-bootstrap-icons';

function Footer() {
    return (
        <div className="Footer">
            <div className="mb-4">
                <p className="fw-bold mb-1">Walls of Home</p>
                <p className="fw-light">Finding places that feel like home.</p>
            </div>

            <div className="footer-links d-flex align-items-center gap-2 mb-4 flex-wrap">
                <p>Explore</p>
                <div className="d-flex align-items-center gap-1">
                    <Dot />
                    <p>Sell</p>
                </div>
                <div className="d-flex align-items-center gap-1">
                    <Dot />
                    <p>About</p>
                </div>
                <div className="d-flex align-items-center gap-1">
                    <Dot />
                    <p>Contact</p>
                </div>
                <div className="d-flex align-items-center gap-1">
                    <Dot />
                    <p>Help</p>
                </div>
            </div>

            <div className="d-flex align-items-center gap-1">
                <CCircle />
                <p className="m-0 fw-light">2026 Walls of Home</p>
            </div>
        </div>
    );
}

export default Footer;
