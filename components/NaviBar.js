import React from "react";

export default function NaviBar(props) {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        {props.appName}
      </a>
    </nav>
  );
}
