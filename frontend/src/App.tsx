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
import MyLikePage from './views/likespage';
import BidPage from './views/bidspage';
import HousePage from './views/housepage';
import AboutPage from './views/aboutPage';
import Register from './views/registerPage';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './context/authContext';

import './style/App.scss';

// Dont forget # its ex: /#/mypage

function App() {
    const router = createHashRouter([
        {
            children: [
                { element: <LoginPage />, path: '/' },
                { element: <Register />, path: '/register' },
                { element: <StartPage />, path: '/start' },
                { element: <MyLikePage />, path: '/likes' },
                { element: <BidPage />, path: '/bids' },
                { element: <AboutPage />, path: '/about' },
                { element: <HousePage />, path: '/house/:houseid' },
            ],
            element: (
                <AuthProvider>
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
                </AuthProvider>
            ),
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
