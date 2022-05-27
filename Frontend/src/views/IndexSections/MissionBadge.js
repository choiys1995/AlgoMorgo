
import React from "react";


// reactstrap components
import {
  Card,
  CardImg,
  Container,
  Row,
  Col
} from "reactstrap";

function MissionBadge() {
    return (
      <>
        <section className="section">
            <Container>
              <Row className="row-grid align-items-center">
                <Col md="4">
                  <Card className="bg-default shadow border-0">
                    <CardImg
                      alt="..."
                      src={require("assets/img/algo/gold.jpg")}
                      top
                    />
                    <blockquote className="card-blockquote">
                      <h4 className="display-6 font-weight-bold text-white">
                        <center>총<br /> 미션 수행일</center>
                      </h4>
                      <p className="lead text-italic text-white">
                      <center>59일</center>
                      </p>
                    </blockquote>
                  </Card>
                  </Col>
                  <Col md="4">
                  <Card className="bg-default shadow border-0">
                    <CardImg
                      alt="..."
                      src={require("assets/img/algo/gold.jpg")}
                      top
                    />
                    <blockquote className="card-blockquote">
                      <h4 className="display-6 font-weight-bold text-white">
                        <center>연속<br /> 미션 수행일</center>
                      </h4>
                      <p className="lead text-italic text-white">
                      <center>17일</center>
                      </p>
                    </blockquote>
                  </Card>
                  </Col>
                  <Col md="4">
                  <Card className="bg-default shadow border-0">
                    <CardImg
                      alt="..."
                      src={require("assets/img/algo/gold.jpg")}
                      top
                    />
                    <blockquote className="card-blockquote">
                      <h4 className="display-6 font-weight-bold text-white">
                        <center>완료한 <br />데일리 미션</center>
                      </h4>
                      <p className="lead text-italic text-white">
                      <center>25개</center>
                      </p>
                    </blockquote>
                  </Card>
                  </Col>
              </Row>
            </Container>
          </section>

      </>
    );
  }

export default MissionBadge;