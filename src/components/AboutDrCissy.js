import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { FaGraduationCap, FaUserMd, FaAward, FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";

const AboutDrCissy = () => {
  return (
    <section id="about" className="py-5 bg-light">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="mb-4 mb-md-0">
            <Image
              src="./yellow-stethoscope.jpg" // Replace with actual image path
              alt="Dr. Atwine Cissy"
              fluid
              rounded
              className="shadow"
            />
          </Col>
          <Col md={6}>
            <h2 className="mb-4">About Dr. Atwine Cissy</h2>
            <p className="lead">
              Board-certified psychiatrist specializing in compassionate,
              evidence-based mental health care.
            </p>

            <div className="about-highlights mb-4">
              <div className="d-flex align-items-center mb-3">
                <FaUserMd className="text-primary me-3" size={24} />
                <div>
                  <h5 className="mb-0">Psychiatric Expertise</h5>
                  <p className="mb-0 text-muted">
                    15+ years of clinical experience
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-center mb-3">
                <FaGraduationCap className="text-primary me-3" size={24} />
                <div>
                  <h5 className="mb-0">Education</h5>
                  <p className="mb-0 text-muted">
                    MD, Makerere University; Residency at Johns Hopkins
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-center mb-3">
                <FaAward className="text-primary me-3" size={24} />
                <div>
                  <h5 className="mb-0">Specializations</h5>
                  <p className="mb-0 text-muted">
                    Mood disorders, anxiety, PTSD, and women's mental health
                  </p>
                </div>
              </div>
            </div>

            <p>
              Dr. Cissy takes a holistic approach to mental wellness, combining
              cutting-edge psychiatric treatments with personalized
              psychotherapy tailored to each patient's unique needs and
              circumstances.
            </p>

            <p>
              Her practice focuses on creating a safe, non-judgmental
              environment where patients can explore their concerns and work
              toward meaningful, lasting change.
            </p>

            <Button
              as={Link}
              to="/BookAppointment"
              variant="primary"
              size="lg"
              className="mt-3"
            >
              Schedule a Consultation
            </Button>
          </Col>
        </Row>

        {/* Professional Journey Section */}
        <Row className="mt-5 pt-5">
          <Col>
            <h3 className="text-center mb-5">Professional Journey</h3>
            <div className="timeline">
              <div className="timeline-item">
                <h4>Medical Degree</h4>
                <p className="text-muted">Makerere University, Kampala</p>
                <p>2005-2011</p>
              </div>
              <div className="timeline-item">
                <h4>Psychiatry Residency</h4>
                <p className="text-muted">Johns Hopkins Hospital, Baltimore</p>
                <p>2012-2016</p>
              </div>
              <div className="timeline-item">
                <h4>Private Practice</h4>
                <p className="text-muted">Kampala, Uganda</p>
                <p>2016-Present</p>
              </div>
            </div>
          </Col>
        </Row>

        {/* Philosophy Section */}
        <Row className="mt-5 py-5">
          <Col md={6}>
            <h3 className="mb-4">Treatment Philosophy</h3>
            <p>
              Dr. Cissy believes in treating the whole person, not just
              symptoms. Her approach integrates:
            </p>
            <ul className="fa-ul">
              <li className="mb-2">
                <span className="fa-li">
                  <FaBook className="text-primary" />
                </span>
                Evidence-based medication management
              </li>
              <li className="mb-2">
                <span className="fa-li">
                  <FaBook className="text-primary" />
                </span>
                Cognitive-behavioral and psychodynamic therapies
              </li>
              <li className="mb-2">
                <span className="fa-li">
                  <FaBook className="text-primary" />
                </span>
                Lifestyle and wellness strategies
              </li>
              <li className="mb-2">
                <span className="fa-li">
                  <FaBook className="text-primary" />
                </span>
                Culturally sensitive care
              </li>
            </ul>
          </Col>
          <Col md={6}>
            <Image
              src="/pro-headshot-2.jpg"
              alt="Dr. Cissy's office"
              fluid
              rounded
              className="shadow"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutDrCissy;
