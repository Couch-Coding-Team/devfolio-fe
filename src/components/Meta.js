import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, image, canonical, keywords }) => {
  return (
    <Helmet titleTemplate="%s">
      <html lang="ko_KR" />
      <title>{title} - DevFoliOh!</title>
      <link rel="canonical" href={canonical} />
      <meta name="description" content={description} />
      {/* TODO: fetch from DB */}
      <meta name="keywords" content={keywords} />

      <meta property="og:site_name" content="DevFoliOh!" />
      <meta property="og:title" content={`${title} - DevFoliOh!`} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
    </Helmet>
  );
};

export default Meta;
