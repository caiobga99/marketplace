import { Link, useLocation } from "react-router-dom";

import "./style.css";

export const Header = () => {
  interface ILinks {
    route: string;
    title: string;
  }

  const location = useLocation();

  const links: ILinks[] = [
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
            <div>
              <h3>{link.title}</h3>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
