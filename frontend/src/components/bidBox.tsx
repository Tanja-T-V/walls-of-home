import { Button, Form, Row, Col } from 'react-bootstrap';

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
        <div className="bidBox m-2 p-2">
            <p>Bid on facility</p>
            <Form className="bidboxTwo" onSubmit={onBidding}>
                <Row className="align-items-center">
                    <Form.Label>Bid amount</Form.Label>
                    <Col xs="auto" className="mb-2">
                        <Form.Control
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
                    </Col>
                    <Col xs="auto" className="mb-2">
                        <Button type="submit" disabled={isNotNumber}>
                            Send bid
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default BidBox;
