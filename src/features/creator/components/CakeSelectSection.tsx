import CarouselLayout, {
  type CarouselItem,
} from "../../../components/layout/frame/CarouselLayout";

import BottomActionSlot from "../../../components/layout/frame/BottomActionSlot";

import CakeMenuCard from "./CakeMenuCard";
import type { CakeType } from "../../types/cake.types";
import { CAKE_MENU } from "../data/cakeMenu.data";

import type { CommonLinkButtonProps } from "../../../components/ui/Button/CommonLinkButton";

type CakeSelectProps = {
  type: CakeType; // 현재 선택된 케이크
  onTypeChange: (next: CakeType) => void;
  buttonProps: Omit<CommonLinkButtonProps, "label">;
};

export default function CakeSelectSection({
  type,
  onTypeChange,
  buttonProps,
}: CakeSelectProps) {
  // 케이크 메뉴 데이터를 CarouselItem 형태로 변환
  const items: CarouselItem<CakeType>[] = CAKE_MENU.map((cake) => ({
    type: cake.type,
    imageSrc: cake.imageSrc,
  }));

  const menuTitle =
    CAKE_MENU.find((cake) => cake.type === type)?.menuName || "";
  const menuDescription =
    CAKE_MENU.find((cake) => cake.type === type)?.description || "";
  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="overflow-hidden mx-auto">
        <CarouselLayout<CakeType>
          items={items}
          type={type}
          onTypeChange={onTypeChange}
          enableWheel={false}
        />
      </div>
      <BottomActionSlot hasBottomPadding={false}>
        <CakeMenuCard
          menuContent={{
            title: menuTitle,
            description: menuDescription,
          }}
          buttonProps={buttonProps}
        />
      </BottomActionSlot>
    </div>
  );
}
