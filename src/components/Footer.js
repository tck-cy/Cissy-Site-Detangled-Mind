import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <h5>Detangled Mind</h5>
            <p>
              Providing compassionate, evidence-based psychiatric care to help
              you achieve mental wellness and improved quality of life.
            </p>
          </Col>
          <Col md={4} className="mb-4 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/services" className="text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="/about" className="text-white">
                  About
                </a>
              </li>
              <li>
                <a href="/Contact" className="text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="/BookAppointment" className="text-white">
                  Book Appointment
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Info</h5>
            <address>
              123 Wellness Way, Suite 200
              <br />
              Anytown, ST 12345
              <br />
              <abbr title="Phone">P:</abbr> (555) 123-4567
              <br />
              <abbr title="Email">E:</abbr> info@detangledmind.com
            </address>
          </Col>
        </Row>
        <hr className="my-4" />
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              &copy; {2022} Detangled Mind. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
