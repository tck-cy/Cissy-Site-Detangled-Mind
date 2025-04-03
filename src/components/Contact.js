import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Contact = () => {
  return (
    <section className="py-5">
      <Container>
        <Row>
          <Col md={6} className="mb-4 mb-md-0">
            <h2 className="mb-4">Contact Us</h2>
            <p>
              <strong>Phone:</strong> (555) 123-4567<br />
              <strong>Email:</strong> info@markspsychiatry.com<br />
              <strong>Address:</strong> 123 Wellness Way, Suite 200, Anytown, ST 12345
            </p>
            <p>
              Office hours: Monday-Friday, 9am-5pm<br />
              Emergency services available 24/7
            </p>
          </Col>
          <Col md={6}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Your name" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Your email" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="tel" placeholder="Your phone number" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Your message" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Send Message
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;