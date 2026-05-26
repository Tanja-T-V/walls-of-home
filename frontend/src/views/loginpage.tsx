import Login from '../components/login';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [canLogin, setCanlogin] = useState<boolean>(false);

    async function handleLogin() {
        const loginInfo = { username: username, password: password };
        try {
            const res = await fetch('http://localhost:8080/login', {
                body: JSON.stringify(loginInfo),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            });

            if (res.status === 200) {
                console.log('works', res);
                setCanlogin(true);

                return;
            } else {
                console.log('No account', res);
                setCanlogin(false);

                return;
            }
        } catch (error) {
            console.log(error);
        }
    }

    function handleCreateAccount() {
        console.log('Handeling creating account');
    }

    if (canLogin) {
        return <Navigate to="/start" />;
    }

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
