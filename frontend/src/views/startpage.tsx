import Housecard from '../components/housecard';

function StartPage() {
    return (
        <>
            <div className="m-5">
                <p>Properties for sale!</p>
            </div>
            <div className="d-flex flex-wrap justify-content-center">
                <Housecard></Housecard>
            </div>
        </>
    );
}

export default StartPage;
