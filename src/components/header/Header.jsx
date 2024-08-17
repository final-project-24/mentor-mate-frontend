import "./Header.css";
import React from "react";
import DevNav from "../dev-nav/DevNav";

export default function Header() {
  return (
    <>
      <header id="header">
        <DevNav />
        <p>Header: part of layout component</p>
      </header>
    </>
  );
}
