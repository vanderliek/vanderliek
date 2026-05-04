"use client";

import { useRef, type CSSProperties, type MouseEvent, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

export function MagneticButton({ children, className, style, onClick }: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current!;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    el.style.transition = "transform 0.1s linear";
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const onMouseLeave = () => {
    const el = ref.current!;
    el.style.transition = "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    el.style.transform = "translate(0, 0)";
  };

  return (
    <button
      ref={ref}
      className={className}
      style={style}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  );
}
