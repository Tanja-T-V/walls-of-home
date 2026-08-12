import { Button, Form, Container, Stack } from 'react-bootstrap';

import type React from 'react';
import { useState } from 'react';

import { CheckCircleFill } from 'react-bootstrap-icons';
import './styles/bidBox.scss';

type Props = {
    onBidding: () => void;
    setBidOffer: React.Dispatch<React.SetStateAction<string>>;
    bidSucsessfull: boolean;
    userBidPice: number;
    bidcurrency: string;
    setShowRemoveMulda: React.Dispatch<React.SetStateAction<boolean>>;
};

function BidBox({
    onBidding,
    setBidOffer,
    bidSucsessfull,
    userBidPice,
    bidcurrency,
    setShowRemoveMulda,
}: Props) {
    const [isNotNumber, setIsNotNumber] = useState<boolean>(true);

    return (
        <div className="bidBox p-3">
            <p>Interested? Make an offer</p>
            {userBidPice > -1 && (
                <div className="userBid d-flex gap-3 mb-2 p-2">
                    <p>Your current bid:</p>
                    <p className="fw-bold">
                        {userBidPice} {bidcurrency}
                    </p>
                </div>
            )}

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

                    {bidSucsessfull && (
                        <div
                            className="bidsucsess toast show mb-4  shadow-sm"
                            role="alert"
                        >
                            <div className="toast-accent"></div>
                            <div className="toast-content toast-body d-flex">
                                <p className="m-0 fw-light fs-6">
                                    Bid successfully offerd!
                                </p>
                                <CheckCircleFill
                                    size={24}
                                    color="#198754"
                                    className="ms-auto"
                                />
                            </div>
                        </div>
                    )}

                    <Stack gap={6}>
                        <Button
                            className="primarybtn mb-3 w-100"
                            type="submit"
                            disabled={isNotNumber}
                        >
                            Place offer
                        </Button>
                        <Button
                            className="my-3 w-100 btn-danger"
                            onClick={() => setShowRemoveMulda(true)}
                        >
                            Remove bid
                        </Button>
                    </Stack>
                </Form>
            </Container>
        </div>
    );
}

export default BidBox;
