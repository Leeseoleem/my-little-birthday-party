import { useMemo, useCallback, useEffect } from "react";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import CarouselArrowButton from "../../ui/Button/CarouselArrowButton";

export type CarouselItemType = number | string;

// Carousel에 표시할 아이템 타입 정의
export type CarouselItem = {
  type: CarouselItemType; // 고유 식별자
  imageSrc: string; // 표시할 이미지 경로
};

interface CarouselLayoutProps {
  items: CarouselItem[];

  type: CarouselItemType; // 현재 선택된 아이템
  onTypeChange: (type: CarouselItemType) => void; // 아이템 변경 콜백

  // 사용 가능
  enableWheel?: boolean; // 휠 제스처 사용 여부
  enableAutoplay?: boolean; // 자동 스크롤 사용 여부
  autoplayStopOnInteraction?: boolean; // 상호작용 시 자동 스크롤 중지 여부
}

export default function CarouselLayout({
  items,
  type,
  onTypeChange,
  enableAutoplay = false,
  autoplayStopOnInteraction = true,
}: CarouselLayoutProps) {
  // Embla 기본 설정
  const emblaOptions = useMemo(
    () => ({
      loop: true,
      align: "center" as const,
      slidesToScroll: 1,
      skipSnaps: false,
    }),
    []
  );

  // Embla 플러그인 설정
  const plugins = useMemo(() => {
    const activePlugins = [];

    // 자동 스크롤 플러그인
    if (enableAutoplay) {
      activePlugins.push(
        Autoplay({
          stopOnInteraction: autoplayStopOnInteraction,
          delay: 3000,
        })
      );
    }

    return activePlugins;
  }, [autoplayStopOnInteraction, enableAutoplay]);

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, plugins);

  // type <-> index 매핑
  const typeToIndex = useMemo(() => {
    const map = new Map<CarouselItemType, number>();
    items.forEach((item, index) => {
      map.set(item.type, index);
    });
    return map;
  }, [items]);

  const indexToType = useCallback(
    (index: number) => items[index]?.type,
    [items]
  );

  // 아이템이 변경된 경우 Embla 재초기화
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
  }, [emblaApi, items.length]);

  // 외부에서 type이 변경된 경우 해당 인덱스로 이동
  useEffect(() => {
    if (!emblaApi) return;

    const targetIndex = typeToIndex.get(type); // 해당 type의 인덱스 조회
    if (targetIndex === undefined) return; // 유효하지 않은 type 방지

    if (emblaApi.selectedScrollSnap() === targetIndex) return; // 이미 해당 인덱스인 경우 무시

    emblaApi.scrollTo(targetIndex);
  }, [emblaApi, type, typeToIndex]);

  // Embla의 현재 선택된 인덱스가 변경된 경우 외부 값 변경
  const syncFromEmbla = useCallback(() => {
    if (!emblaApi) return;

    const selectedIndex = emblaApi.selectedScrollSnap();
    const selectedType = indexToType(selectedIndex);

    if (selectedType === undefined) return; // 유효하지 않은 인덱스 방지
    if (selectedType === type) return; // 이미 해당 type인 경우 무시

    onTypeChange(selectedType);
  }, [emblaApi, indexToType, onTypeChange, type]);

  // Embla 선택 변경 이벤트 등록
  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", syncFromEmbla);
    emblaApi.on("reInit", syncFromEmbla);

    // 초기 1회 동기화
    syncFromEmbla();

    return () => {
      emblaApi.off("select", syncFromEmbla);
      emblaApi.off("reInit", syncFromEmbla);
    };
  }, [emblaApi, syncFromEmbla]);

  // 화살표 버튼
  const onPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const onNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="flex-1 flex h-full min-w-0 items-center justify-center gap-4 py-4">
      <div className="shrink-0">
        <CarouselArrowButton
          direction="left"
          onClick={onPrev}
          isDisabled={!emblaApi}
        />
      </div>
      <div className="relative flex flex-1 items-center h-full">
        <div className="flex-1 h-full">
          <div ref={emblaRef} className="overflow-hidden mx-auto h-full ">
            <div className="flex h-full touch-pan-y touch-pinch-zoom will-change-transform">
              {items.map((item) => (
                <div key={String(item.type)} className="flex-[0_0_70%] min-w-0">
                  <div className="flex h-full px-2 py-4 items-center justify-center">
                    <img
                      src={item.imageSrc}
                      alt={`${String(item.type)}`}
                      className="block max-h-full w-auto object-contain drop-shadow-md drop-shadow-black/30 pointer-events-none select-none"
                      draggable={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="shrink-0">
        <CarouselArrowButton
          direction="right"
          onClick={onNext}
          isDisabled={!emblaApi}
        />
      </div>
    </section>
  );
}
