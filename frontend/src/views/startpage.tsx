import Housecard from '../components/housecard';

import { useAuthContext } from '../context/authContext';

function StartPage() {
    const { accID } = useAuthContext();

    return (
        <>
            <div className="m-5">
                <p>Properties for sale!</p>
                <p>{accID}</p>
            </div>
            <div className="d-flex flex-wrap justify-content-center">
                <Housecard></Housecard>
            </div>
        </>
    );
}

export default StartPage;
