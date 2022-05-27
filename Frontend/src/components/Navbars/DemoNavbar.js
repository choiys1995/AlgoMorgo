
import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";

class DemoNavbar extends React.Component {
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }
  state = {
    collapseClasses: "",
    collapseOpen: false
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out"
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: ""
    });
  };

  render() {
    // const history = useHistory()
    const nickName = localStorage.getItem("nickName")
    const logout = (e) =>{
      localStorage.clear()
      // history.replace("/login-page")
      window.location.replace("/login-page")
    }
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              { 
                nickName == null ?
                <NavbarBrand className="mr-lg-2" to="/" tag={Link}>
                <img
                  alt="..."
                  src={require("assets/img/brand/algomorgo-title.png")}
                />
                </NavbarBrand>
                :
                <NavbarBrand className="mr-lg-2" to="/dailymission-page" tag={Link}>
                <img
                  alt="..."
                  src={require("assets/img/brand/algomorgo-title.png")}
                />
                </NavbarBrand>
              }
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse
                toggler="#navbar_global"
                navbar
                className={this.state.collapseClasses}
                onExiting={this.onExiting}
                onExited={this.onExited}
              >
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-collection d-lg-none mr-1" />
                      <span className="nav-link-inner--text">미션</span>
                    </DropdownToggle>
                    {
                      nickName == null ?
                      <DropdownMenu>
                        <DropdownItem to="/login-page" tag={Link}>
                        미션 프로필
                        </DropdownItem>
                        <DropdownItem to="/login-page" tag={Link}>
                        데일리 미션
                        </DropdownItem>
                      </DropdownMenu>
                      :
                      <DropdownMenu>
                        <DropdownItem to="/missionprofile-page" tag={Link}>
                        미션 프로필
                        </DropdownItem>
                        <DropdownItem to="/dailymission-page" tag={Link}>
                        데일리 미션
                        </DropdownItem>
                      </DropdownMenu>
                    }
                  </UncontrolledDropdown>
                </Nav>
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-collection d-lg-none mr-1" />
                      <span className="nav-link-inner--text">캘린더</span>
                    </DropdownToggle>
                    {
                      nickName == null ?
                      <DropdownMenu>
                        <DropdownItem to="/login-page" tag={Link}>
                          주간 캘린더
                        </DropdownItem>
                        <DropdownItem to="/login-page" tag={Link}>
                          월간 캘린더
                        </DropdownItem>
                      </DropdownMenu>
                      :
                      <DropdownMenu>
                        <DropdownItem to="/weeklycalendar-page" tag={Link}>
                          주간 캘린더
                        </DropdownItem>
                        <DropdownItem to="/monthlycalendar-page" tag={Link}>
                          월간 캘린더
                        </DropdownItem>
                      </DropdownMenu>
                    }
                  </UncontrolledDropdown>
                </Nav>
                <Nav className="ml-lg-left" navbar>
                  <NavItem>
                    <NavLink to="/algorithm-page" tag={Link}>
                      알고리즘 설명 <span className="sr-only">(current)</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/guide-page" tag={Link}>
                      가이드 <span className="sr-only">(current)</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    {
                     nickName == null ?
                     <div></div>
                     :
                     <NavLink to="/profile-page" tag={Link}>
                      마이페이지<span className="sr-only">(current)</span>
                    </NavLink>  
                    }
                  </NavItem>
                </Nav>
                <Nav className="ml-lg-auto" navbar>
                  <NavItem>
                    {
                     nickName == null ?
                     <div></div>
                     :
                     <NavLink to="/profile-page" tag={Link}>
                      {nickName}님 환영합니다. <span className="sr-only">(current)</span>
                    </NavLink>  
                    }
                  </NavItem>
                  <NavItem>
                    {nickName == null ? 
                    <NavLink to="/login-page" tag={Link}>
                      로그인 <span className="sr-only">(current)</span>
                    </NavLink>
                    :
                    <NavLink onClick={logout}>
                      로그아웃 <span className="sr-only">(current)</span>
                    </NavLink>
                    }
                  </NavItem>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default DemoNavbar;
