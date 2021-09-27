import { sample } from "lodash";

const CITIES = [
  "서울",
  "상하이",
  "쿠알라룸푸르",
  "이스탄불",
  "베를린",
  "런던",
  "라고스",
  "뉴욕",
  "상파울로",
  "시드니",
];

const COLORS = [
  "하얀",
  "검은",
  "빨간",
  "주황",
  "노란",
  "초록",
  "파란",
  "남색",
  "보라",
];

const ACTIONS = [
  "자고 있는",
  "티비 보는",
  "배고픈",
  "운동하는",
  "걷고 있는",
  "행복한",
  "음악 듣는",
  "기뻐서 날뛰는",
  "복권 당첨 될 뻔한",
  "즐거운",
  "시계 보는",
];

const ANIMALS = [
  "쥐",
  "소",
  "호랑이",
  "토끼",
  "용",
  "뱀",
  "말",
  "양",
  "원숭이",
  "닭",
  "개",
  "돼지",
];

export const generateRandomName = () =>
  `${sample(CITIES)}의 ${sample(ACTIONS)} ${sample(COLORS)} ${sample(ANIMALS)}`;
