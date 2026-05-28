import { useEffect } from 'react';
import { useAuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

function MylikesPage() {
    const { isLoggedIn, accID } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn]);

    return (
        <div>
            <p>My liked houses</p>
        </div>
    );
}

export default MylikesPage;
