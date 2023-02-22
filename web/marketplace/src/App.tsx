import React from "react";
import { SignUp } from "./components/SignUp/index";
import { Header } from "./components/Header/index";
export default function App() {
  return (
    <div className="App">
      <Header/>
      <SignUp />
    </div>
  );
}
