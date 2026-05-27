import Login from '../components/login';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../context/authContext';

interface Data {
    id: number;
    userName: string;
}

function LoginPage() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate();

    // Login context
    const { isLoggedIn, setIsLoggedIn, setAccID, setAccName, setLogginErr } =
        useAuthContext();

    async function handleLogin() {
        const loginInfo = { username: username, password: password };
        try {
            const res = await fetch('http://localhost:8080/login/login', {
                body: JSON.stringify(loginInfo),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            });
            // To get the account data
            const data: Data[] = await res.json();

            if (res.status === 200) {
                setAccID(data[0].id);
                setAccName(data[0].userName);
                setIsLoggedIn(true);
                setLogginErr(false);

                return;
            } else {
                setIsLoggedIn(false);

                setLogginErr(true);

                return;
            }
        } catch (error) {
            console.log(error);
        }
    }

    function handleCreateAccount() {
        console.log('Handeling creating account');
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/start');
        }
    }, [isLoggedIn]);

    return (
        <Container className="d-flex justify-content-center my-5">
            <Login
                username={username}
                setUsername={setUsername}
                setPassword={setPassword}
                onLogin={handleLogin}
                onCreate={handleCreateAccount}
            />
        </Container>
    );
}

export default LoginPage;
