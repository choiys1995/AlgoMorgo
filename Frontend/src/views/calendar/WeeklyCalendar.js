import React from "react";
import axios from 'axios';
// reactstrap components
import {
  Container,
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";

// index page sections

import MyWeekMission from "views/IndexSections/MyWeekMission.js";
import MyWeekSchedule from "views/IndexSections/MyWeekSchedule.js";

class WeeklyCalendar extends React.Component {
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
            {/* shape Hero */}
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
                      <h3 className="mb-4 text-white">주간 캘린더 미션</h3>
                      <p>주간 문제 풀이 현황을 제공합니다.</p>
                      <p>상단에서 오늘의 미션을 확인할 수 있습니다.</p>
                    </center>
                </div>
              </Container>
            </section>
            <section>
              <Container>
                <MyWeekMission />
                <MyWeekSchedule />
              </Container>
            </section>
          </div>
          


        </main>
        
      </>
    );
  }
}
    export default WeeklyCalendar;