import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const About = () => {
  return (
    <section id="about" className="py-5 bg-light">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <Image 
              src="https://images.unsplash.com/photo-1550831107-1553da8c8464" 
              alt="Dr. Mark" 
              fluid 
              rounded 
              className="mb-4 mb-md-0"
            />
          </Col>
          <Col md={6}>
            <h2 className="mb-4">About Dr. Mark</h2>
            <p>
              Dr. Mark is a board-certified psychiatrist with over 15 years of experience in mental health care. 
              He completed his medical degree at Harvard Medical School and his psychiatric residency at Johns Hopkins Hospital.
            </p>
            <p>
              Dr. Mark believes in a holistic approach to mental health, combining evidence-based medical treatments 
              with compassionate psychotherapy tailored to each individual's unique needs.
            </p>
            <p>
              His practice focuses on creating a safe, non-judgmental space where patients can explore their concerns 
              and work toward meaningful change and improved quality of life.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;