import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery, useTheme } from "@material-ui/core";
import ArrowCircle from "../../components/ArrowCircle";

const data = [
  {
    title: (
      <span>
        포트폴리오 제작에 어려움을 겪고 계신가요?{" "}
        <strong>포트폴리오 멘토링 문의</strong>
      </span>
    ),
    color: "black",
    bgColor: "#0ACF83",
    link: "https://couchcoding.kr/portfolio?utm_source=devfolio&utm_medium=banner",
    eventName: "포트폴리오 멘토링 문의 클릭",
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
