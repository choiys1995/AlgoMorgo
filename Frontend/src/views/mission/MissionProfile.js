import React from "react";
// nodejs library that concatenates classes

// reactstrap components
import {
  Container,
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";

// index page sections
import MissionInfo from 'views/IndexSections/MissionInfo.js';
import MissionBadge from 'views/IndexSections/MissionBadge.js';

class MissionProfile extends React.Component {
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
        <main className="missionprofile-page" ref="main">
          <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-shaped pb-5">
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
                    <center>
                      <p className="h3 text-white"><i class="ni ni-paper-diploma mr-2"></i>미션 프로필</p>
                    </center>
                </div>
              </Container>
            </section>

            <MissionInfo />
            
 
          </div>
        </main>
      </>
    );
  }
}

export default MissionProfile;
