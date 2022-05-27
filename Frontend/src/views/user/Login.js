
import React from "react";

// reactstrap components

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import LoginCard from 'views/IndexSections/LoginCard';

class Login extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <DemoNavbar />
        <main className="login-page" ref="main">
          <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-shaped pb-100">
              <div className="shape shape-style-1 shape-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div class="separator separator-bottom separator-skew">
              <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                <polygon class="fill-white" points="2560 0 2560 100 0 100">
                </polygon>
              </svg>
            </div>
              
            <LoginCard />
              
          </section>
          </div>
        </main>
      </>
    );
  }
}

export default Login;
