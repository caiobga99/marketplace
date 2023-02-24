import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { SignUp } from "./components/SignUp/index";
import { SignIn } from "./components/SignIn/index";
import { Home } from "./components/Home/index";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
        </Routes>
      </Router>
    </div>
  );
}
