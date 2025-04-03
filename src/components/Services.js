import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Services = () => {
  const services = [
    {
      title: "Psychiatric Evaluation",
      description: "Comprehensive assessment to understand your mental health needs and develop a personalized treatment plan.",
      icon: "bi bi-clipboard2-pulse"
    },
    {
      title: "Medication Management",
      description: "Careful monitoring and adjustment of medications to ensure optimal treatment outcomes.",
      icon: "bi bi-capsule"
    },
    {
      title: "Psychotherapy",
      description: "Evidence-based talk therapy approaches to help you work through challenges and improve mental wellbeing.",
      icon: "bi bi-chat-square-text"
    },
    {
      title: "Anxiety & Depression Treatment",
      description: "Specialized care for anxiety disorders, depression, and mood-related conditions.",
      icon: "bi bi-emoji-frown"
    }
  ];

  return (
    <section id="services" className="py-5">
      <Container>
        <h2 className="text-center mb-5">Our Services</h2>
        <Row>
          {services.map((service, index) => (
            <Col md={6} lg={3} key={index} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center">
                  <i className={`${service.icon} fs-1 text-primary mb-3`}></i>
                  <Card.Title>{service.title}</Card.Title>
                  <Card.Text>{service.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Services;