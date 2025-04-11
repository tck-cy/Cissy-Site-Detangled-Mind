import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import api from "../config/api.js";

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    service: "therapy",
    paymentMethod: "credit-card",
  });

  //backend-debugging
  useEffect(() => {
    axios
      .get(api.checkAvailability)
      .then((res) => console.log("Backend connection successful"))
      .catch((err) => console.error("Connection failed:", err));
  }, []);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update the handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. First check availability
      const availabilityResponse = await axios.post(api.checkAvailability, {
        date: formData.date,
        time: formData.time,
      });

      if (!availabilityResponse.data.available) {
        throw new Error("Selected time slot is not available");
      }

      // 2. Create a booking record in your backend
      const bookingResponse = await axios.post(api.bookAppointment, {
        ...formData,
        paymentMethod: "credit-card",
        paymentStatus: "pending", // Mark as pending until payment completes
      });

      // 3. Only then proceed with Stripe payment
      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
      const { error } = await stripe.redirectToCheckout({
        lineItems: [
          { price: process.env.REACT_APP_STRIPE_PRICE_ID, quantity: 1 },
        ],
        mode: "payment",
        successUrl: `${window.location.origin}/booking-success?session_id={CHECKOUT_SESSION_ID}&bookingId=${bookingResponse.data.bookingId}`,
        cancelUrl: `${window.location.origin}/booking-canceled?bookingId=${bookingResponse.data.bookingId}`,
      });

      if (error) {
        throw error;
      }
    } catch (err) {
      setError(err.message);
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
                // min="09:00"
                // max="17:00"
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
                createOrder={async (data, actions) => {
                  try {
                    // First check availability
                    const availabilityResponse = await axios.post(
                      api.checkAvailability,
                      {
                        date: formData.date,
                        time: formData.time,
                      }
                    );

                    if (!availabilityResponse.data.available) {
                      throw new Error("Selected time slot is not available");
                    }

                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: "100.00",
                            currency_code: "USD",
                          },
                        },
                      ],
                    });
                  } catch (err) {
                    setError(err.message);
                    throw err;
                  }
                }}
                onApprove={async (data, actions) => {
                  try {
                    const details = await actions.order.capture();
                    await axios.post(api.bookAppointment, {
                      ...formData,
                      paymentId: details.id,
                      paymentMethod: "paypal",
                      paymentStatus: "completed",
                    });
                    setSuccess(true);
                  } catch (err) {
                    setError(err.response?.data?.error || err.message);
                  }
                }}
                onError={(err) => {
                  setError(err.message || "Payment failed");
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
