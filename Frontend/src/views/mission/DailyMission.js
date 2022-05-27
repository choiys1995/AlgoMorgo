import React, { useCallback, useState } from "react";
import axios from "axios";

// nodejs library that concatenates classes

// reactstrap components
import {
  Container,
  Col,
  Button,
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";

// index page sections
import MissionCard from 'views/IndexSections/MissionCard.js';
import MissionComplete from 'views/IndexSections/MissionComplete.js';

class DailyMission extends React.Component {
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
        <main className="dailymission-page" ref="main">
          

          <MissionCard />
          

        </main>
      </>
    );
  }
}

export default DailyMission;
