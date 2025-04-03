import React from 'react';
import { Container, Carousel } from 'react-bootstrap';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Dr. Mark changed my life. After years of struggling with anxiety, I finally found relief with his compassionate care.",
      author: "Sarah J."
    },
    {
      quote: "The best psychiatrist I've ever worked with. He truly listens and cares about his patients.",
      author: "Michael T."
    },
    {
      quote: "Professional, knowledgeable, and kind. I highly recommend Dr. Mark to anyone seeking mental health support.",
      author: "Lisa M."
    }
  ];

  return (
    <section className="py-5">
      <Container>
        <h2 className="text-center mb-5">Patient Testimonials</h2>
        <Carousel indicators={false} className="testimonial-carousel">
          {testimonials.map((testimonial, index) => (
            <Carousel.Item key={index}>
              <blockquote className="blockquote text-center">
                <p className="mb-4 fs-4">"{testimonial.quote}"</p>
                <footer className="blockquote-footer">{testimonial.author}</footer>
              </blockquote>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

export default Testimonials;