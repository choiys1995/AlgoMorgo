
import React, { useState } from "react";


// reactstrap components
import { Button, Container, Row, Col, Card } from "reactstrap";

function ProfileEditCard() {
  const [inputs] = useState({  
    userId: localStorage.getItem("userId")
  })
  const { userId } = inputs
  
    return (
      <>
        <Container>
              <Card className="bg-default border-0 mt-5">
                <div className="p-4">
                  <Row className="align-items-center">
                    <Col className="ml-lg-auto" lg="1">
                      <a
                        href="#"
                      >
                      <img
                        alt="..."
                        className="img-fluid rounded-circle"
                        src={require("assets/img/theme/user_icon.png")}
                        style={{ width: "75px" }}
                                  />
                      </a>
                    </Col>
                    <Col lg="10">
                      <h3 className="text-white">
                        {userId} 님의 프로필입니다.
                      </h3>  
                    </Col>  
                    <Col className="ml-lg-auto" lg="1">
                      
                    </Col>
                  </Row>
                </div>
              </Card>
            </Container>

            
      </>
    );
  }

export default ProfileEditCard;
