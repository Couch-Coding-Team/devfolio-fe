import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";

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
    link: "https://couchcoding.kr/portfolio/?utm_medium=referral&utm_source=devfolio",
    eventName: "포트폴리오 멘토링 문의 클릭",
  },
  {
    title: <strong>DevFolio 팀에게 서비스 의견을 들려주세요.</strong>,
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
  return (
    <Slider speed={500} slidesToShow={1} slidesToScroll={1}>
      {data.map((el, idx) => (
        <div key={idx}>
          <div
            style={{
              backgroundColor: el.bgColor,
              color: el.color,
              padding: "20px 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {el.title}
            {el.link && (
              <ArrowForwardOutlinedIcon
                fontSize="small"
                color="black"
                onClick={() => {
                  window.gtag("event", el.eventName);
                  window.open(el.link, "_blank");
                }}
                style={{ cursor: "pointer", marginLeft: "4px" }}
              />
            )}
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Banner;
