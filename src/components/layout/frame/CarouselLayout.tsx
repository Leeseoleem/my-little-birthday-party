import { useMemo, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import clsx from "clsx";
import CarouselArrowButton from "../../ui/Button/CarouselArrowButton";

export type CarouselItemType = number | string;

export type CarouselItem<T extends CarouselItemType = CarouselItemType> = {
  type: T;
  imageSrc: string;
};

interface CarouselLayoutProps<T extends CarouselItemType = CarouselItemType> {
  items: CarouselItem<T>[];
  type: T;
  onTypeChange: (type: T) => void;

  enableAutoplay?: boolean;
  autoplayStopOnInteraction?: boolean;

  // hover 확대 같은 “기본 이미지 효과”를 props로 켜고 끄고 싶을 때
  enableHoverScale?: boolean;

  // 이미지 클릭이 필요할 때만 연결
  onItemClick?: (item: CarouselItem<T>) => void;
}

export default function CarouselLayout<
  T extends CarouselItemType = CarouselItemType
>({
  items,
  type,
  onTypeChange,
  enableAutoplay = false,
  autoplayStopOnInteraction = true,

  enableHoverScale = false,
  onItemClick,
}: CarouselLayoutProps<T>) {
  const emblaOptions = useMemo(
    () => ({
      loop: true,
      align: "center" as const,
      slidesToScroll: 1,
      skipSnaps: false,
    }),
    []
  );

  const plugins = useMemo(() => {
    const activePlugins = [];
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

  const typeToIndex = useMemo(() => {
    const map = new Map<CarouselItemType, number>();
    items.forEach((item, index) => map.set(item.type, index));
    return map;
  }, [items]);

  const indexToType = useCallback(
    (index: number) => items[index]?.type,
    [items]
  );

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
  }, [emblaApi, items.length]);

  useEffect(() => {
    if (!emblaApi) return;

    const targetIndex = typeToIndex.get(type);
    if (targetIndex === undefined) return;

    if (emblaApi.selectedScrollSnap() === targetIndex) return;
    emblaApi.scrollTo(targetIndex);
  }, [emblaApi, type, typeToIndex]);

  const syncFromEmbla = useCallback(() => {
    if (!emblaApi) return;

    const selectedIndex = emblaApi.selectedScrollSnap();
    const selectedType = indexToType(selectedIndex);
    if (selectedType === undefined) return;
    if (selectedType === type) return;

    onTypeChange(selectedType);
  }, [emblaApi, indexToType, onTypeChange, type]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", syncFromEmbla);
    emblaApi.on("reInit", syncFromEmbla);

    syncFromEmbla();

    return () => {
      emblaApi.off("select", syncFromEmbla);
      emblaApi.off("reInit", syncFromEmbla);
    };
  }, [emblaApi, syncFromEmbla]);

  const onPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const onNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const selectedIndex = emblaApi?.selectedScrollSnap();
  const selectedType =
    selectedIndex !== undefined ? indexToType(selectedIndex) : undefined;

  return (
    <section className="flex h-full min-h-0 items-center justify-center gap-4 py-4">
      <div className="shrink-0">
        <CarouselArrowButton
          direction="left"
          onClick={onPrev}
          isDisabled={!emblaApi}
        />
      </div>

      <div className="relative flex items-center h-full min-h-0">
        <div className="flex-1 h-full min-h-0">
          <div ref={emblaRef} className="overflow-hidden mx-auto h-full">
            <div className="flex h-full min-h-0 touch-pan-y touch-pinch-zoom will-change-transform">
              {items.map((item) => {
                const isSelected = selectedType === item.type;

                return (
                  <div
                    key={String(item.type)}
                    className="flex-[0_0_50%] max-h-full"
                  >
                    <div className="flex h-full min-h-0 px-2 items-center justify-center">
                      <button
                        type="button"
                        onClick={() => onItemClick?.(item)}
                        disabled={!isSelected || !onItemClick}
                        className={clsx(
                          "h-full min-h-0",
                          isSelected && enableHoverScale
                            ? "pointer-events-auto"
                            : "pointer-events-none"
                        )}
                      >
                        <img
                          draggable={false}
                          src={item.imageSrc}
                          alt={`${String(item.type)}`}
                          className={clsx(
                            "block object-contain bg-center select-none",
                            // 최대 높이는 400px, 하지만 부모가 더 작으면 부모(100%)를 따름
                            "max-h-[min(400px,100%)]",
                            "drop-shadow-md drop-shadow-black/30",
                            isSelected && enableHoverScale
                              ? "transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105 hover:-translate-y-1 active:-translate-y-1 hover:drop-shadow-xl active:drop-shadow-xl"
                              : "pointer-events-none"
                          )}
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
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
