import { Container, Form, Button, Stack } from 'react-bootstrap';
import './components.css';
import type React from 'react';

type Props = {
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    onLogin: () => void;
    onCreate: () => void;
};

function Login({
    username,
    setUsername,
    setPassword,
    onLogin,
    onCreate,
}: Props) {
    return (
        <Container className="loginbox p-3">
            <Form onSubmit={onLogin}>
                <Form.Group className="mb-3" controlId="usernameLogin">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        onChange={(event) => setUsername(event.target.value)}
                        value={username}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="passwordLogin">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </Form.Group>
                <Stack gap={6}>
                    <Button className="my-3" onClick={onLogin}>
                        Login
                    </Button>
                    <Button
                        className="my-3"
                        variant="secondary"
                        size="sm"
                        disabled
                        onClick={onCreate}
                    >
                        Create Account
                    </Button>
                </Stack>
            </Form>
        </Container>
    );
}

export default Login;
