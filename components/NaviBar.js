import React from "react";
import { css } from "linaria";

const styles = {
  navTxt: css`
  padding: 10px;
  color: #FFF;
  font-size: 2rem;
  width: 100%;
  text-decoration: none;
  text-align: center;
  &:hover{
    color: #FFF;
  }
 `
};

export default function NaviBar(props) {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <a className={styles.navTxt} href="/">
        {props.appName}
      </a>
    </nav>
  );
}
