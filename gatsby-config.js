require("dotenv").config({ path: `.env` });
module.exports = {
  siteMetadata: {
    title: "DevFoliOh! - 개발자 토이프로젝트 모아보기 서비스",
    description:
      "다른 개발자들은 어떤 포트폴리오를 만들었을까? 개발자들의 포트폴리오 혹은 토이 프로젝트를 한눈에 모아보세요.",
  },
  plugins: [
    "gatsby-plugin-top-layout",
    "gatsby-plugin-react-helmet",
    // "gatsby-plugin-mui-emotion",
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-1W81K7RMHF"],
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `images`,
    //     path: `${__dirname}/src/images`,
    //   },
    // },
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: process.env.API_URL || "http://localhost:1337",
        collectionTypes: ["project"],
        // singleTypes: [`homepage`, `global`],
        queryLimit: 1000,
      },
    },
    // "gatsby-plugin-image",
    // "gatsby-transformer-sharp",
    // "gatsby-plugin-sharp",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "DevFoliOh! - 개발자 토이프로젝트 모아보기 서비스",
        short_name: "DevFoliOh!",
        start_url: "/",
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/favicon.png`,
      },
    },
    "gatsby-plugin-offline",
  ],
};
