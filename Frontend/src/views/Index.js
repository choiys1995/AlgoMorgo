/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";

// index page sections
import Hero from "./IndexSections/Hero.js";

class Index extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <Hero />
          <section className="section my-5">
            <Container>
              <h3 className="font-weight-bold">부족한 알고리즘 역량을 체크!</h3>
              <h3 className="font-weight-bold">알고리즘, 난이도 기반으로 맞춤 문제를 제공합니다.</h3>
              <img
                alt="..."
                className="img-fluid rounded shadow my-4"
                src={require("assets/img/guide/mission_image.jpg")}
                style={{ width: "100%" }}
              />
            </Container>
          </section>
          <section className="section my-5">
            <Container>
              <h3 className="font-weight-bold">확실한 목표 수립으로 코딩 열정 충전!</h3>
              <h3 className="font-weight-bold">일일 미션 문제 풀고 실력 Up!</h3>
              <img
                alt="..."
                className="img-fluid rounded shadow my-4"
                src={require("assets/img/guide/missionprofileguide.png")}
                style={{ width: "100%" }}
              />
            </Container>
          </section>
          <section className="section my-5">
            <Container>
              <h3 className="font-weight-bold">내가 푼 문제들을 살펴보며 자가 진단 Check</h3>
              <h3 className="font-weight-bold">월간, 주간 기록표를 살펴보며 계획 세우고 의욕 충전~</h3>
              <img
                alt="..."
                className="img-fluid rounded shadow my-4"
                src={require("assets/img/guide/calendar_image.jpg")}
                style={{ width: "100%" }}
              />
            </Container>
          </section>
        </main>
      </>
    );
  }
}

export default Index;
