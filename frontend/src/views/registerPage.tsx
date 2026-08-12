import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

import Resiter from '../components/register';
import { Container } from 'react-bootstrap';

interface Data {
    id: number;
    username: string;
}

function RegisterPage() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [dbError, setDbError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');

    const navigate = useNavigate();

    // For auth context
    const { isLoggedIn, setIsLoggedIn, setAccID, setAccName, setLogginErr } =
        useAuthContext();

    async function handleRegisterAccount() {
        const registerInfo = { username: username, password: password };

        try {
            const res = await fetch('/login/register', {
                body: JSON.stringify(registerInfo),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            });

            if (res.status === 201) {
                const data: Data[] = await res.json();
                // Error msg
                setDbError(false);
                setErrorMsg('');

                // Sets authContest
                setAccID(data[0].id);
                setAccName(data[0].username);
                setIsLoggedIn(true);
                setLogginErr(false);
                return;
            }
            if (res.status === 400) {
                const data: any = await res.json();
                setDbError(true);
                setErrorMsg(data.error);
                return;
            } else {
                return;
            }
        } catch (error) {
            console.error(error);
        }
    }

    // After sucsessfull acocunt created gets redirected to be logged in.
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/start');
        }
    }, [isLoggedIn, navigate]);
    return (
        <div>
            <div className=" py-3 px-5 mt-3 mb-3 d-flex flex-column align-items-center text-center">
                <p className="fw-bold fs-5">
                    Create your account and start discovering places that feel
                    like home
                </p>
            </div>
            <Container className="d-flex justify-content-center my-5">
                <Resiter
                    username={username}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    onRegister={handleRegisterAccount}
                    dbError={dbError}
                    errorMsg={errorMsg}
                />
            </Container>
        </div>
    );
}

export default RegisterPage;
