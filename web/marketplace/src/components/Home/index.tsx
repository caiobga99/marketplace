import "./style.css";
import { Header } from "../Header/index";
export const Home = () => {
  return (
    <div className="container">
      <div className="header-container">
        <Header />
      </div>
      <div className="home-container">
        <h1>Test</h1>
      </div>
    </div>
  );
};
