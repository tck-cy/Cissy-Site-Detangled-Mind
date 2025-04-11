import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero-section py-5 bg-primary text-white">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h1 className="display-4 fw-bold mb-4">
              Compassionate Psychiatric Care
            </h1>
            <p className="lead mb-4">
              Providing personalized mental health services to help you achieve
              wellness and balance in your life.
            </p>
            <Button
              as={Link}
              to="/BookAppointment"
              variant="light"
              size="lg"
              className="me-3"
            >
              Book an Appointment
            </Button>
            <Button as={Link} to="/about" variant="outline-light" size="lg">
              Learn More
            </Button>
          </Col>
          <Col md={6}>
            <img
              src="./pro-headshot-3.jpg"
              alt="pro-headshot-3.jpg"
              className="img-fluid rounded"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
