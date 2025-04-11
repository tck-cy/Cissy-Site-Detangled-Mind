import React, { useState } from "react";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    service: "therapy",
    paymentMethod: "credit-card",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Check availability
      const availabilityResponse = await axios.post("/api/check-availability", {
        date: formData.date,
        time: formData.time,
      });

      if (!availabilityResponse.data.available) {
        throw new Error("Selected time slot is not available");
      }

      // Only handle form submission for credit card (PayPal handles its own flow)
      if (formData.paymentMethod === "credit-card") {
        const stripe = await loadStripe(
          process.env.REACT_APP_STRIPE_PUBLIC_KEY
        );
        await stripe.redirectToCheckout({
          lineItems: [
            { price: process.env.REACT_APP_STRIPE_PRICE_ID, quantity: 1 },
          ],
          mode: "payment",
          successUrl: `${window.location.origin}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/booking-canceled`,
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Book an Appointment</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && (
        <Alert variant="success">
          Appointment booked successfully! Check your email for confirmation.
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                min="09:00"
                max="17:00"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Service</Form.Label>
          <Form.Select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="therapy">Therapy Session</option>
            <option value="consultation">Initial Consultation</option>
            <option value="followup">Follow-up Session</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Payment Method</Form.Label>
          <div>
            <Form.Check
              type="radio"
              id="credit-card"
              label="Credit Card"
              name="paymentMethod"
              value="credit-card"
              checked={formData.paymentMethod === "credit-card"}
              onChange={handleChange}
              inline
            />
            <Form.Check
              type="radio"
              id="paypal"
              label="PayPal"
              name="paymentMethod"
              value="paypal"
              checked={formData.paymentMethod === "paypal"}
              onChange={handleChange}
              inline
            />
          </div>
        </Form.Group>

        {formData.paymentMethod === "paypal" && (
          <div className="mb-4">
            <PayPalScriptProvider
              options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
            >
              <PayPalButtons
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: "100.00", // Set your price here
                        },
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  const details = await actions.order.capture();
                  // Handle successful payment
                  await axios.post("/api/book-appointment", {
                    ...formData,
                    paymentId: details.id,
                    paymentMethod: "paypal",
                  });
                  setSuccess(true);
                }}
              />
            </PayPalScriptProvider>
          </div>
        )}

        {formData.paymentMethod === "credit-card" && (
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Processing..." : "Proceed to Payment"}
          </Button>
        )}
      </Form>
    </Container>
  );
};

export default BookAppointment;
