import React from "react";

// reactstrap components
import {
  Card,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";

// index page sections


class Guide extends React.Component {
  state = {};
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <DemoNavbar />
        <main className="daily-mission-page" ref="main">
          <div className="position-relative">
            {/* 설명 페이지 */}
            <section className="section section-lg section-shaped pb-4">
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
              <Container className="py-lg-md d-flex">
                <div className="col px-0">
                    <center className="text-white">
                      <h3 className="mb-4 text-white">가이드</h3>
                      <p>알고 모르고를 처음 사용하시는 분들을 위한 사용 가이드입니다.</p>
                    </center>
                </div>
              </Container>
            </section>
            
            <section className="my-5">
              <Container>
                <Row className="py-3 align-items-center">
                  <Col sm="2">
                  </Col>
                  <Col sm="8">
                    <details className="mb-4">
                      <summary className="display-4">
                        회원가입 시 백준 아이디를 꼭 입력해야 하나요?
                      </summary>
                    
                      <div className="my-4">
                        <Card className="shadow ml-5" style={{ width: "80%" }}>
                          <CardBody className="px-5" >
                            <h6 className="h6">
                              알고 모르고는 백준 사용자를 대상으로 빅데이터 분석을 통해
                              다양한 미션이나 캘린더, 선호 알고리즘 패턴을 제공하고 있습니다.
                              백준 아이디를 입력하시면 알고 모르고를 100% 이용하실 수 있습니다.
                            </h6>
                            <img
                              alt="..."
                              className="img-fluid rounded shadow my-4"
                              src={require("assets/img/guide/RegisterExample.jpg")}
                              style={{ width: "100%" }}
                            />
                          </CardBody>
                        </Card>
                      </div>
                    </details>
                    <details className="my-4">
                      <summary className="display-4">
                        프로필의 태그 분포는 무엇인가요?
                      </summary>
                    
                      <div className="my-4">
                        <Card className="shadow ml-5" style={{ width: "80%" }}>
                          <CardBody className="px-5" >
                            <h6 className="h6">
                              알고 모르고는 사용자의 백준 문제 풀이 기록을 분석하여 선호하는
                              알고리즘을 도출하고 있습니다. 문제 풀이 빈도, 정답률을 근거로
                              한눈에 선호 알고리즘을 알아보실 수 있도록 태그 그래프를 제공합니다.
                            </h6>
                            <img
                              alt="..."
                              className="img-fluid rounded shadow my-4"
                              src={require("assets/img/guide/profileguide.png")}
                              style={{ width: "100%" }}
                            />
                          </CardBody>
                        </Card>
                      </div>
                    </details>
                    <details className="my-4">
                      <summary className="display-4">
                        미션 문제는 어떤 기준으로 선정되나요?
                      </summary>
                    
                      <div className="my-4">
                        <Card className="shadow ml-5" style={{ width: "80%" }}>
                          <CardBody className="px-5" >
                            <h6 className="h6">
                              알고 모르고는 백준 문제풀이 기록과 코딩 테스트 출제율을 근거로
                              사용자의 취약 알고리즘 분야의 문제를 미션 문제로 지정합니다.
                              풀었던 문제 난이도와 정답률을 근거로 실력 맞춤 문제들이
                              출제되니 기회를 놓치지 마세요!
                            </h6>
                            <h6 className="h6 mt-3">
                              미션 갱신 버튼을 통해 마음에 들지 않는 문제를 갱신할 수 있으며
                              문제를 풀고 미션 완료 버튼을 통해 하루 최대 3문제를 성공하실 수
                              있습니다.
                            </h6>
                            <img
                              alt="..."
                              className="img-fluid rounded shadow my-4"
                              src={require("assets/img/guide/dailymissionguide.png")}
                              style={{ width: "100%" }}
                            />
                          </CardBody>
                        </Card>
                      </div>
                    </details>
                    <details className="my-4">
                      <summary className="display-4">
                        미션 문제는 어떻게 확인하나요?
                      </summary>
                    
                      <div className="my-4">
                        <Card className="shadow ml-5" style={{ width: "80%" }}>
                          <CardBody className="px-5" >
                            <h6 className="h6">
                              메인 페이지와 미션, 그리고 캘린더에서 확인하실 수 있습니다.
                              미션 페이지에서는 나의 미션 프로필과 완료한 미션 확인을,
                              캘린더 페이지에서는 월간, 주간 미션 현황을 확인하실 수 있습니다.
                            </h6>
                            <img
                              alt="..."
                              className="img-fluid rounded shadow my-4"
                              src={require("assets/img/guide/mission_image.jpg")}
                              style={{ width: "100%" }}
                            />
                            <center>
                              <h6>미션 페이지</h6>
                            </center>
                            <img
                              alt="..."
                              className="img-fluid rounded shadow my-4"
                              src={require("assets/img/guide/calendarguide.png")}
                              style={{ width: "100%" }}
                            />
                            <center>
                              <h6>캘린더 페이지</h6>
                            </center>
                          </CardBody>
                        </Card>
                      </div>
                    </details>
                    
                    
                  </Col>
                  <Col sm="2">
                  </Col>
                </Row>

                
              </Container>
            </section>
          </div>
          


        </main>
        {/* <SimpleFooter /> */}
      </>
    );
  }
}
    export default Guide;
