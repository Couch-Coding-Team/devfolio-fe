import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, image, canonical }) => {
  return (
    <Helmet titleTemplate="%s">
      <html lang="ko_KR" />
      <title>{title} - Devfolio</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:site_name" content="Devfolio" />
      <meta property="og:title" content={`${title} - Devfolio`} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
    </Helmet>
  );
};

export default Meta;
