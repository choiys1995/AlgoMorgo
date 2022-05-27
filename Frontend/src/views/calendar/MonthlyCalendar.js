import React from 'react';
import axios from 'axios';
// reactstrap components
import {
  Container,
  
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import MyMonthMission from 'views/IndexSections/MyMonthMission';

// index page sections

class MonthlyCalendar extends React.Component {
  state = {
  }
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
                      <h3 className="mb-4 text-white">월간 미션 캘린더</h3>
                      <p>월 별 문제 풀이 현황을 캘린더 형태로 제공합니다.</p>
                      <p>날짜를 클릭하면 해당 날짜의 미션을 확인할 수 있습니다.</p>
                    </center>
                </div>
              </Container>
            </section>

            <section>
              <Container>
                <MyMonthMission />
              </Container>
            </section>
          </div>
          


        </main>
        {/* <SimpleFooter /> */}
      </>
    );
  }
}
    export default MonthlyCalendar;