import React from "react";
import PropTypes from "prop-types";
import Nav from "./Nav";
import Seo from "./Seo";
import Banner from "./Banner";

const Layout = ({ children, seo, location }) => (
  <>
    <Seo seo={seo} />
    {location.pathname === "/" && <Banner />}
    <Nav location={location} />
    <main>{children}</main>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
