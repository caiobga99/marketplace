import { Link } from "react-router-dom";

import "./style.css";

export const Header = () => {
  return (
    <div className="header-container">
      <Link to="#">
        <div>Home</div>
      </Link>
      <Link to="#">
        <div>XXXXXXX</div>
      </Link>
      <Link to="/signIn">
        <div>Sign In</div>
      </Link>
      <Link to="/signUp">
        <div>Sign Up</div>
      </Link>
    </div>
  );
};
