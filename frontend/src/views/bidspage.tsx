import { useEffect } from 'react';
import { useAuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

function BidPage() {
    const { isLoggedIn } = useAuthContext();

    // If user isnt logged in gets redirested to start.
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn]);

    return (
        <>
            <h2>Bid page</h2>
        </>
    );
}

export default BidPage;
