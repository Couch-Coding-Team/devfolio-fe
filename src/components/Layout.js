import React from "react";
import PropTypes from "prop-types";
import Nav from "./Nav";
import Seo from "./Seo";

const Layout = ({ children, seo, location }) => (
  <>
    <Seo seo={seo} />
    <Nav location={location} />
    <main>{children}</main>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
