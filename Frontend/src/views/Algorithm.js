import React from "react";

// reactstrap components
import {
  Card,
  CardBody,
  Container,
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";

// index page sections


class Algorithm extends React.Component {
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
                      <h3 className="mb-4 text-white">알고리즘 설명</h3>
                      <p>알고리즘 개념 설명은 Java로 제공됩니다.</p>
                      <p>알고리즘 카테고리를 선택하시면 개념 설명과 간단 코드 예제가 제공됩니다.</p>
                    </center>
                </div>
              </Container>
            </section>

            <section className="my-5">
              <Container>
                <details className="mb-4">
                  <summary className="display-4">
                    순열
                  </summary>
                  <div className="my-4">
                    <Card className="shadow ml-5" style={{ width: "100%" }}>
                      <CardBody className="px-5" >
                        <img
                          alt="..."
                          className="img-fluid rounded shadow my-4"
                          src={require("assets/img/guide/permutation.png")}
                          style={{ width: "100%" }}
                        />
                      </CardBody>
                    </Card>
                  </div>
                </details>
                <details className="mb-4">
                  <summary className="display-4">
                    조합
                  </summary>
                  <div className="my-4">
                    <Card className="shadow ml-5" style={{ width: "100%" }}>
                      <CardBody className="px-5" >
                        <img
                          alt="..."
                          className="img-fluid rounded shadow my-4"
                          src={require("assets/img/guide/combination.png")}
                          style={{ width: "100%" }}
                        />
                      </CardBody>
                    </Card>
                  </div>
                </details>
                <details className="mb-4">
                  <summary className="display-4">
                    부분집합
                  </summary>
                  <div className="my-4">
                    <Card className="shadow ml-5" style={{ width: "100%" }}>
                      <CardBody className="px-5" >
                        <img
                          alt="..."
                          className="img-fluid rounded shadow my-4"
                          src={require("assets/img/guide/subset.png")}
                          style={{ width: "100%" }}
                        />
                      </CardBody>
                    </Card>
                  </div>
                </details>
              </Container>
            </section>
          </div>
          


        </main>
        {/* <SimpleFooter /> */}
      </>
    );
  }
}
    export default Algorithm;