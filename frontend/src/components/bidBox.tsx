import { Button, Form, Container } from 'react-bootstrap';

import type React from 'react';
import { useState } from 'react';

import './styles/bidBox.scss';

type Props = {
    onBidding: () => void;
    setBidOffer: React.Dispatch<React.SetStateAction<string>>;
};

function BidBox({ onBidding, setBidOffer }: Props) {
    const [isNotNumber, setIsNotNumber] = useState<boolean>(true);

    return (
        <div className="bidBox p-3">
            <p>Interested? Make an offer</p>
            <Container className="p-0">
                <Form onSubmit={onBidding}>
                    <Form.Label>Your offer</Form.Label>
                    <Form.Control
                        className="mb-4 input-form"
                        id="BidAmount"
                        onChange={(event) => {
                            //Makes sure its not empty string, a number and is positive number. Makes send button disabled
                            if (
                                event.target.value === '' ||
                                Number.isNaN(Number(event.target.value)) ||
                                Number(event.target.value) < 0
                            ) {
                                setIsNotNumber(true);
                                return;
                            } else {
                                // If its a valid number enables button.
                                setIsNotNumber(false);
                                return setBidOffer(event.target.value);
                            }
                        }}
                    />

                    <Button
                        className="primarybtn w-100"
                        type="submit"
                        disabled={isNotNumber}
                    >
                        Place offer
                    </Button>
                </Form>
            </Container>
        </div>
    );
}

export default BidBox;
