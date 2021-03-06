import React from "react";
import { Link } from "react-router-dom";

export interface ButtonRouterLinkProps {
  to: string;
  type?: "primary" | "ghost" | "dashed" | "link" | "text" | "default";
  danger?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void; /* asdasdd eslint-disable-line no-unused-vars */
  children?: React.ReactNode;
}

const ButtonRouterLink: React.FC<ButtonRouterLinkProps> = ({
  to,
  type = "default",
  danger,
  onClick,
  children,
}: ButtonRouterLinkProps) => {
  return (
    <Link
      className={`ant-btn ant-btn-${type ?? "default"} ${
        danger ? "ant-btn-dangerous" : ""
      }`}
      to={to}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default ButtonRouterLink;
