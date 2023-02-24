import { Link, useLocation } from "react-router-dom";

import "./style.css";

export const Header = () => {
  const location = useLocation();

  const links = [
    {
      route: "/",
      title: "Home",
    },
    {
      route: "#",
      title: "#",
    },
    {
      route: "/signIn",
      title: "Sign In",
    },
    {
      route: "/signUp",
      title: "Sign Up",
    },
  ];

  return (
    <div className="header-container">
      {links.map((link) => {
        return (
          <Link
            to={link.route}
            className={location.pathname === link.route ? "currentUrl" : "link"}
          >
            <div>{link.title}</div>
          </Link>
        );
      })}
    </div>
  );
};
