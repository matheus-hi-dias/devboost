import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ReactNode, useEffect, useRef, useState } from "react";

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, idx: number) => ReactNode;
  className?: string;
}

export function Carousel<T>({
  items,
  renderItem,
  className,
}: CarouselProps<T>) {
  const [current, setCurrent] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [dragOffset, setDragOffset] = useState(0);

  const outerRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    function handleResize() {
      if (outerRef.current && itemRef.current) {
        const containerWidth = outerRef.current.offsetWidth;
        const itemWidth = itemRef.current.offsetWidth;
        if (itemWidth > 0) {
          const count = Math.floor(containerWidth / itemWidth);
          setVisibleCount(Math.max(1, count));
        }
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [items.length]);

  useEffect(() => {
    if (items.length <= visibleCount && current !== 0) {
      setCurrent(0);
    }
  }, [items.length, visibleCount, current]);

  function onTouchStart(e: React.TouchEvent | React.MouseEvent) {
    isDragging.current = true;
    setDragOffset(0);
    if ("touches" in e) {
      startX.current = e.touches[0].clientX;
    } else {
      startX.current = (e as React.MouseEvent).clientX;
    }
  }

  function onTouchMove(e: React.TouchEvent | React.MouseEvent) {
    if (!isDragging.current || startX.current === null) return;
    let clientX;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = (e as React.MouseEvent).clientX;
    }
    const diff = clientX - startX.current;
    setDragOffset(diff);
  }

  function onTouchEnd(e: React.TouchEvent | React.MouseEvent) {
    if (!isDragging.current || startX.current === null) return;
    let clientX;
    if ("changedTouches" in e) {
      clientX = e.changedTouches[0].clientX;
    } else {
      clientX = (e as React.MouseEvent).clientX;
    }
    const diff = clientX - startX.current;
    setDragOffset(0);

    const itemWidth = itemRef.current?.offsetWidth || 1;
    const gap = 16;
    const totalWidth = itemWidth + gap;
    const moved = Math.round(diff / totalWidth);

    let next = current - moved;
    if (items.length <= visibleCount) {
      next = 0;
    } else {
      if (next < 0) next = items.length - visibleCount;
      if (next > items.length - visibleCount) next = 0;
    }
    setCurrent(next);

    isDragging.current = false;
    startX.current = null;
  }

  const goPrev = () => {
    setCurrent(prev =>
      prev === 0 ? Math.max(0, items.length - visibleCount) : prev - 1,
    );
  };
  const goNext = () => {
    setCurrent(prev => (prev >= items.length - visibleCount ? 0 : prev + 1));
  };

  const isAllVisible = items.length <= visibleCount;

  return (
    <div className={`w-full select-none ${className || ""}`}>
      <div className="relative flex items-center">
        <button
          aria-label="Ver anterior"
          onClick={goPrev}
          className="flex items-center justify-center absolute left-0 z-10 bg-background rounded-full border shadow p-2 hover:bg-[hsl(var(--primary)/0.9)] transition cursor-pointer"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        <div
          ref={outerRef}
          className={`flex overflow-hidden w-full touch-pan-x px-12`}
          style={{ cursor: isDragging.current ? "grabbing" : "grab" }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseDown={onTouchStart}
          onMouseMove={onTouchMove}
          onMouseUp={onTouchEnd}
          onMouseLeave={onTouchEnd}
        >
          <div
            className={`flex gap-4 transition-transform duration-300 ease-in-out ${
              isAllVisible ? "justify-center w-full" : ""
            }`}
            style={{
              transform: isAllVisible
                ? "none"
                : `translateX(calc(-${
                    current * (itemRef.current?.offsetWidth || 0)
                  }px + ${dragOffset}px))`,
              transition: isDragging.current ? "none" : undefined,
            }}
          >
            {items.map((item, idx) => (
              <div
                key={idx}
                ref={idx === 0 ? itemRef : undefined}
                className="flex-shrink-0 flex justify-center"
              >
                {renderItem(item, idx)}
              </div>
            ))}
          </div>
        </div>

        <button
          aria-label="Ver próximo"
          onClick={goNext}
          className="flex items-center justify-center absolute right-0 z-10 bg-background rounded-full border shadow p-2 hover:bg-[hsl(var(--primary)/0.9)] transition cursor-pointer"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {Array.from({
          length: Math.max(1, items.length - visibleCount + 1),
        }).map((_, idx) => (
          <button
            key={idx}
            aria-label={`Ir para o slide ${idx + 1}`}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full ${
              idx === current ? "bg-primary" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
