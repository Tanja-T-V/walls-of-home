import {
    createContext,
    useContext,
    useState,
    type PropsWithChildren,
} from 'react';

// Defines context and makes default values. Uses houses interface and defines isLoading ad boolean. Basicly contians
const authContext = createContext<{
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    accID: number | null;
    setAccID: React.Dispatch<React.SetStateAction<number | null>>;
    accName: string;
    setAccName: React.Dispatch<React.SetStateAction<string>>;
    logginErr: boolean;
    setLogginErr: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

// Gets used in app.tsx
export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [accID, setAccID] = useState<number | null>(null);
    const [accName, setAccName] = useState<string>('');

    const [logginErr, setLogginErr] = useState<boolean>(false);

    return (
        <authContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                accID,
                setAccID,
                accName,
                setAccName,
                logginErr,
                setLogginErr,
            }}
        >
            {children}
        </authContext.Provider>
    );
};

// Gets called in component. Sends out houseContext with interface and api result
export const useAuthContext = () => {
    const context = useContext(authContext);
    if (!context) {
        throw new Error('Authcontext is null');
    }

    return context;
};
