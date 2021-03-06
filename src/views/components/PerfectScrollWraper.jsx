import React from "react";

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { history } from "store";

var ps;

class PerfectScrollWraper extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.myRef.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    window.addEventListener("resize", () => {
      ps.update();
    });
    history.listen(() => {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.myRef.current.scrollTop = 0;
      ps.update();
    });
  }

  render = () => {
    return (
      <div
        className="sidebar-wrapper p-0 m-0"
        style={{ position: "relative", top: 0, height: " 100vh" }}
        ref={this.myRef}
      >
        {this.props.children}
      </div>
    );
  };
}

export default PerfectScrollWraper;
