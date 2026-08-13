import { Button, Form, Container, Col } from 'react-bootstrap';

import type React from 'react';

import { CheckCircleFill } from 'react-bootstrap-icons';
import './styles/bidBox.scss';

type Props = {
    onBidding: () => void;
    setBidOffer: React.Dispatch<React.SetStateAction<string>>;
    bidSucsessfull: boolean;
    userBidPice: number;
    bidcurrency: string;
    setShowRemoveMulda: React.Dispatch<React.SetStateAction<boolean>>;
    bidBtnDisabled: boolean;
    setBidBtnDisabled: React.Dispatch<React.SetStateAction<boolean>>;
};

function BidBox({
    onBidding,
    setBidOffer,
    bidSucsessfull,
    userBidPice,
    bidcurrency,
    setShowRemoveMulda,
    bidBtnDisabled,
    setBidBtnDisabled,
}: Props) {
    return (
        <div className="bidBox p-3">
            <div className="bidcontent d-flex">
                <p className="fs-4">Interested? Make an offer</p>
                {userBidPice > -1 && (
                    <div className="userBid d-flex flex-row gap-3 mb-2 ms-lg-auto ">
                        <p>Your current bid:</p>
                        <p className="fw-bold">
                            {userBidPice} {bidcurrency}
                        </p>
                    </div>
                )}
            </div>

            <Container fluid className="p-0">
                <Form onSubmit={onBidding}>
                    <div className="bidcontent">
                        <Form.Label className="fw-bold">Your offer</Form.Label>
                        <Form.Control
                            className="bid-input mb-4 input-form"
                            id="BidAmount"
                            onChange={(event) => {
                                //Makes sure its not empty string, a number and is positive number. Makes send button disabled
                                if (
                                    event.target.value === '' ||
                                    Number.isNaN(Number(event.target.value)) ||
                                    Number(event.target.value) < 0
                                ) {
                                    setBidBtnDisabled(true);
                                    return;
                                } else {
                                    // If its a valid number enables button.
                                    setBidBtnDisabled(false);
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
                    </div>
                    <div className="bidbutton-box d-flex gap-6 w-100">
                        <Col xs={12} lg={6}>
                            <Button
                                className="primarybtn bidPlace-button w-100"
                                type="submit"
                                disabled={bidBtnDisabled}
                            >
                                Place offer
                            </Button>
                        </Col>
                        {userBidPice > -1 && (
                            <Col xs={12} lg={6} className="bidRemove-boxbtn">
                                <Button
                                    className="bidRemove-button  btn-danger "
                                    onClick={() => setShowRemoveMulda(true)}
                                >
                                    Remove bid
                                </Button>
                            </Col>
                        )}
                    </div>
                </Form>
            </Container>
        </div>
    );
}

export default BidBox;
