import {
    createContext,
    useContext,
    useEffect,
    useState,
    type PropsWithChildren,
} from 'react';

export interface Houses {
    id: number;
    start_price: number;
    currency: string;
    city: string;
    address: string;
    property_type: string;
    living_area: string;
    rooms: number;
    build_year: number;
    parking: string;
    exterior: string;
    description: string;
    publiched: string;
}

// Defines context and makes default values. Uses houses interface and defines isLoading ad boolean. Basicly contians
const housesContext = createContext<{
    houses: Houses[];
    isLoading: boolean;
}>({ houses: [], isLoading: true });

// Gets used in app.tsx
export const HousesContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [houses, setHouses] = useState<Houses[]>([]);
    // makes isLoading true while api gets fetched.
    const [isLoading, setIsLoading] = useState(true);

    // Uses Houses interface and makse data use it.
    useEffect(() => {
        fetch('http://localhost:8080/houses')
            .then((res) => res.json())
            .then((data: Houses[]) => {
                console.log(data);
                setHouses(data);
            })
            .finally(() => {
                // Changes is loading when its all fetched.
                setIsLoading(false);
            });
    }, []);

    return (
        <housesContext.Provider value={{ houses, isLoading }}>
            {children}
        </housesContext.Provider>
    );
};

// Gets called in component. Sends out houseContext with interface and api result
export const useHousesContext = () => useContext(housesContext);
