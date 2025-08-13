import React from "react";

interface ArrowProps {
  direction?: "up" | "down" | "left" | "right";
  size?: number;
  color?: string;
}

const Arrow: React.FC<ArrowProps> = ({
  direction = "right",
  size = 12,
  color = "black",
}) => {
  const directions: Record<string, React.CSSProperties> = {
    up: { transform: "rotate(-135deg)" },
    right: { transform: "rotate(45deg)" },
    down: { transform: "rotate(45deg) scaleY(-1)" },
    left: { transform: "rotate(-135deg) scaleY(-1)" },
  };

  const style: React.CSSProperties = {
    display: "inline-block",
    width: `${size}px`,
    height: `${size}px`,
    borderTop: `2px solid ${color}`,
    borderRight: `2px solid ${color}`,
    ...directions[direction],
  };

  return <span style={style} />;
};

export default Arrow;
