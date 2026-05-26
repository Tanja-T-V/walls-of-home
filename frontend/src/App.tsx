import {
    createHashRouter,
    Outlet,
    RouterProvider,
    ScrollRestoration,
} from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import LoginPage from './views/loginpage';
import StartPage from './views/startpage';
import Mypage from './views/mypage';
import { Container } from 'react-bootstrap';
import { HousesContextProvider } from './context/housesContext';

import './App.css';

// Dont forget # its ex: /#/mypage

function App() {
    const router = createHashRouter([
        {
            children: [
                { element: <LoginPage />, path: '/' },
                { element: <StartPage />, path: '/start' },
                { element: <Mypage />, path: '/mypage' },
            ],
            element: (
                <HousesContextProvider>
                    <Container
                        fluid
                        className="p-0 d-flex flex-column min-vh-100"
                    >
                        <Header />
                        <ScrollRestoration />
                        <main className="flex-grow-1">
                            <Outlet />
                        </main>
                        <Footer />
                    </Container>
                </HousesContextProvider>
            ),
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
