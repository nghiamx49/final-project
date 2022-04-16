import { FC, ReactChild } from "react";

interface BadgeProps {
  children: ReactChild;
  count?: number;
}

const Badge: FC<BadgeProps> = ({ children, count }) => {
  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#444",
        paddingTop: 10,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: "100%",
      }}
    >
      {children}
      <span
        style={{
          position: "absolute",
          top: -10,
          right: -5,
          background: "#f21361",
          padding: "0px 6px",
          borderRadius: "100%",
        }}
      >
        {count}
      </span>
    </div>
  );
};

export default Badge;
