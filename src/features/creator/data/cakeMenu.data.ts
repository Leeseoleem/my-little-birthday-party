import type { CakeMenuItem } from "../types/cake.types";

export const CAKE_MENU: CakeMenuItem[] = [
  {
    type: "party",
    imageSrc: "/assets/cakes/party.png",
    menuName: "클래식 파티 케이크",
    description:
      "생일 하면 가장 먼저 떠오르는, 모두에게 익숙한 파티의 시작을 담은 케이크입니다.",
  },
  {
    type: "party-double",
    imageSrc: "/assets/cakes/party-double.png",
    menuName: "스페셜 데이 케이크",
    description:
      "조금 더 특별한 하루를 위해 준비한, 기념일 다운 풍성함이 느껴지는 케이크입니다.",
  },
  {
    type: "simple",
    imageSrc: "/assets/cakes/simple.png",
    menuName: "미니멀 케이크",
    description:
      "꾸밈을 덜어낸 대신, 생일의 의미와 마음에 집중한 가장 담백한 케이크입니다.",
  },
  {
    type: "cheese",
    imageSrc: "/assets/cakes/cheese.png",
    menuName: "소프트 치즈 케이크",
    description:
      "부드러운 맛처럼, 조용하고 따뜻한 생일 인사를 전하고 싶을 때 어울리는 케이크입니다.",
  },
  {
    type: "choco-banana",
    imageSrc: "/assets/cakes/choco-banana.png",
    menuName: "스윗 초코 바나나 케이크",
    description:
      "달콤한 조합으로 생일의 즐거움과 웃음을 함께 전하는 케이크입니다.",
  },
];
