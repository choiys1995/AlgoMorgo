import React from "react";

// reactstrap components


// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import ProfileEditCard from 'views/IndexSections/ProfileEditCard';
import ProfileEditBody from 'views/IndexSections/ProfileEditBody';

class ProfileEdit extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <DemoNavbar />
        <main className="profileedit-page" ref="main">
        <div className="position-relative">
            <section className="section section-lg section-shaped pb-0">
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
            </section>
          </div>

          <ProfileEditCard />
          <ProfileEditBody />
        </main>
      </>
    );
  }
}

export default ProfileEdit;
