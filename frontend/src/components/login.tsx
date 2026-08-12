import { Container, Form, Button, Stack } from 'react-bootstrap';
import './styles/login.scss';
import type React from 'react';

import { useAuthContext } from '../context/authContext';

type Props = {
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    onLogin: () => void;
    onRegister: () => void;
};

function Login({
    username,
    setUsername,
    setPassword,
    onLogin,
    onRegister,
}: Props) {
    // For authContext
    const { logginErr } = useAuthContext();

    return (
        <Container className="loginbox p-3">
            <Form onSubmit={onLogin}>
                <Form.Group className="mb-3" controlId="usernameLogin">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        className="input-form"
                        onChange={(event) => setUsername(event.target.value)}
                        value={username}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="passwordLogin">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        className="input-form"
                        type="password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </Form.Group>

                {logginErr && (
                    <p className="errotext">Invalid username or password</p>
                )}

                <Stack gap={6}>
                    <Button className="my-3 primarybtn" onClick={onLogin}>
                        Log in
                    </Button>
                    <Button
                        className="my-3 secondarybtn"
                        size="sm"
                        onClick={onRegister}
                    >
                        Create Account
                    </Button>
                </Stack>
            </Form>
        </Container>
    );
}

export default Login;
