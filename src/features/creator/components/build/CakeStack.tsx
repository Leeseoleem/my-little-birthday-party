export default function CakeStack({ cakeSrc }: { cakeSrc: string }) {
  return (
    <div className="relative w-full max-w-[520px] aspect-5/4">
      {/* 1) 케이크 판 */}
      <img
        src="/assets/cakes/cake-plate.png"
        alt="plate"
        className="absolute bottom-0 left-1/2 w-full -translate-x-1/2
                   select-none pointer-events-none z-1"
        draggable={false}
      />

      {/* 2) 케이크 */}
      <img
        src={cakeSrc}
        alt="cake"
        className="
          absolute
          left-1/2
          bottom-[15%] 
          w-[72%]
          -translate-x-1/2
          select-none pointer-events-none
          z-2
        "
        draggable={false}
      />
    </div>
  );
}
