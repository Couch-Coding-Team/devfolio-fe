import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, image, canonical }) => {
  return (
    <Helmet titleTemplate="%s">
      <html lang="ko_KR" />
      <title>{title} - Devfolio</title>
      <meta name="description" content={description} />
      {canonical ? <link rel="canonical" href={canonical} /> : null}

      <meta property="og:site_name" content="Devfolio" />
      <meta property="og:title" content={`${title} - Devfolio`} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {canonical ? <meta property="og:url" content={canonical} /> : null}
      {image ? <meta property="og:image" content={image} /> : null}
    </Helmet>
  );
};

export default Meta;
