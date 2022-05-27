
import React from "react";


// reactstrap components
import {
  Button,
  Card,
  Container,
  Row,
  Col
} from "reactstrap";

function MissionComplete() {
    return (
      <>
        <section className="section section-lg pt-0">
        <Container className="py-lg-md d-flex">
                <div className="col px-0">
                    <center>
                      
                      <Col lg="4">
                      <Button
                        block
                        className="btn-white"
                        color="default"
                        href=""
                        size="lg"
                        
                      >
                        미션 완료 확인하기
                      </Button>
                    </Col>
                    </center>
                </div>
              </Container>
          </section>
            
      </>
    );
  }

export default MissionComplete;