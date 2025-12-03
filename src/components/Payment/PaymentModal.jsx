import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const PaymentModal = ({ show, onHide, onPaymentSuccess, amount = 499 }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiry: '',
        cvc: '',
        name: ''
    });

    const handleChange = (e) => {
        setPaymentDetails({
            ...paymentDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        setTimeout(() => {
            setLoading(false);
            if (paymentDetails.cardNumber.length < 16) {
                setError('Invalid card number. Please try again.');
            } else {
                onPaymentSuccess();
                onHide();
            }
        }, 1500);
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Secure Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert variant="info">
                    Complete payment of ₹{amount} to proceed with download/sharing.
                </Alert>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Cardholder Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            value={paymentDetails.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Card Number</Form.Label>
                        <Form.Control
                            type="text"
                            name="cardNumber"
                            placeholder="0000 0000 0000 0000"
                            value={paymentDetails.cardNumber}
                            onChange={handleChange}
                            maxLength="16"
                            required
                        />
                    </Form.Group>
                    <div className="d-flex gap-3">
                        <Form.Group className="mb-3 flex-grow-1">
                            <Form.Label>Expiry Date</Form.Label>
                            <Form.Control
                                type="text"
                                name="expiry"
                                placeholder="MM/YY"
                                value={paymentDetails.expiry}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 flex-grow-1">
                            <Form.Label>CVC</Form.Label>
                            <Form.Control
                                type="text"
                                name="cvc"
                                placeholder="123"
                                value={paymentDetails.cvc}
                                onChange={handleChange}
                                maxLength="3"
                                required
                            />
                        </Form.Group>
                    </div>
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? 'Processing...' : `Pay ₹${amount}`}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default PaymentModal;
