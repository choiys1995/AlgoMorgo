
import React from "react";
import { Link } from "react-router-dom";


// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

function Hero() {
    return (
      <>
        <div className="position-relative">
          {/* Hero for FREE version */}
          <section className="section section-hero section-shaped">
            {/* Background circles */}
            <div className="shape shape-style-1 shape-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="shape-container d-flex align-items-center pt-5">
              <div className="col px-0">
                <Row className="align-items-center justify-content-center">
                  <Col className="text-left" lg="7">
                    <h2 className="text-white font-weight-bold py-3">
                      맞춤 알고리즘 문제 추천이 필요하다면?
                    </h2>
                    <h5 className="text-white font-weight-bold py-1">
                      내게 부족한 알고리즘 역량은 무엇일까?
                    </h5>
                    <h5 className="text-white font-weight-bold py-1">
                      실력에 딱 맞는 문제 추천이 필요하다면?
                    </h5>
                    <Button className="btn-1 mt-4" color="success" type="button" to="/login-page" tag={Link}>
                      시작하기
                    </Button>
                  </Col>
                  <Col className="text-left" lg="4">
                  <img
                    alt="..."
                    className="img-fluid rounded shadow"
                    src={require("assets/img/theme/Heroimage.png")}
                    style={{ width: "95%" }}
                  />
                  </Col>
                </Row>
              </div>
            </Container>
            
          </section>
        </div>
      </>
    );
  }

export default Hero;
