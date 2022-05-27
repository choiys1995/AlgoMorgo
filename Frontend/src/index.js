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
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import PrivateRoute from "views/helper/PrivateRoute";
import PublicRoute from "views/helper/PublicRoute";
import Index from "views/Index.js";
import Guide from "views/Guide.js";
import Algorithm from "views/Algorithm.js";
import Landing from "views/examples/Landing.js";
import Login from "views/user/Login.js";
import Profile from "views/user/Profile.js";
import ProfileEdit from 'views/user/ProfileEdit';
import Register from "views/user/Register.js";
import DailyMission from "views/mission/DailyMission.js";
import MissionProfile from "views/mission/MissionProfile.js";
import WeeklyCalendar from "views/calendar/WeeklyCalendar.js";
import MonthlyCalendar from "views/calendar/MonthlyCalendar.js";


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={props => <Index {...props} />} />
      <PublicRoute path="/login-page" exact component={Login} />
      <PrivateRoute
        path="/profile-page"
        exact
        component={Profile}
      />
      <PrivateRoute
        path="/profileedit-page"
        exact
        component={ProfileEdit}
      />
      <PublicRoute
        path="/register-page"
        exact
        component={Register}
      />
      <PrivateRoute
        path="/dailymission-page"
        exact
        component={DailyMission}
      />
      <PrivateRoute
        path="/missionprofile-page"
        exact
        component={MissionProfile}
      />
      <PrivateRoute
        path="/weeklycalendar-page"
        exact
        component={WeeklyCalendar}
      />
      <PrivateRoute
        path="/monthlycalendar-page"
        exact
        component={MonthlyCalendar}
      />
      <Route
        path="/guide-page"
        exact
        render={props => <Guide {...props} />}
      />
      <Route
        path="/algorithm-page"
        exact
        render={props => <Algorithm {...props} />}
      />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
