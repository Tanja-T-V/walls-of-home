import { Container, Form, Button, Stack } from 'react-bootstrap';
import './styles/register.scss';

type Props = {
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    onRegister: () => void;
    dbError: boolean;
    errorMsg: string;
};

function Register({
    username,
    setUsername,
    setPassword,
    onRegister,
    dbError,
    errorMsg,
}: Props) {
    return (
        <Container className="loginbox p-3">
            <Form>
                <Form.Group className="mb-3" controlId="usernameRegister">
                    <Form.Label>
                        Username{' '}
                        <span className="d-block small  text-muted">
                            Needs to be at least 4 characters
                        </span>
                    </Form.Label>
                    <Form.Control
                        className="input-form"
                        placeholder="username"
                        onChange={(event) => setUsername(event.target.value)}
                        value={username}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="passwordRegister">
                    <Form.Label>
                        Password
                        <span className="d-block small  text-muted">
                            Needs to contains letters and numbers. Needs to be
                            minimum 6 characters
                        </span>
                    </Form.Label>
                    <Form.Control
                        className="input-form"
                        type="password"
                        placeholder="password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </Form.Group>

                {dbError === true && (
                    <div className="registerErr">
                        <p className="p-3 m-0 fst-italic ">{errorMsg}</p>
                    </div>
                )}

                <Stack gap={6}>
                    <Button className="my-3 primarybtn" onClick={onRegister}>
                        Create Account
                    </Button>
                </Stack>
            </Form>
        </Container>
    );
}

export default Register;
