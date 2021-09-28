import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery, useTheme } from "@material-ui/core";
import ArrowCircle from "../../components/ArrowCircle";

const data = [
  {
    title: <strong>일주일 동안 React 협업 프로젝트 맛보기</strong>,
    color: "black",
    bgColor: "#0ACF83",
    link: "https://eunbeelee.notion.site/React-2e2088b4797d4167af547f17a71abfc3",
    eventName: "일주일 협업 프로젝트 클릭",
  },
  {
    title: <strong>DevFoliOh! 팀에게 서비스 의견을 들려주세요.</strong>,
    color: "white",
    bgColor: "#1302F4",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSdUywHRLDyQyskS8rD5aDn9T5n8WemqvJG6qnFngf2AjmPL0A/viewform",
    eventName: "서비스 의견 보내기 클릭",
  },
  {
    title: <strong>매주 새로운 포트폴리오가 업데이트 됩니다 👇👇👇</strong>,
    color: "white",
    bgColor: "black",
  },
];

const Banner = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  return (
    <Slider autoplay speed={500} slidesToShow={1} slidesToScroll={1}>
      {data.map((el, idx) => (
        <div key={idx}>
          <div
            style={{
              backgroundColor: el.bgColor,
              color: el.color,
              padding: "12px 0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: isSm ? "10px" : "16px",
              cursor: el.link ? "pointer" : "initial",
            }}
            onClick={() => {
              if (el.link) {
                window.gtag("event", el.eventName);
                window.open(el.link, "_blank");
              }
            }}
          >
            {el.title}
            {el.link && <ArrowCircle style={{ marginLeft: "8px" }} />}
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Banner;
