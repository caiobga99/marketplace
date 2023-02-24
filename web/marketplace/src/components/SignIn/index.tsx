import { useForm } from "react-hook-form";
import * as val from "validator";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "../../lib/axios";
import { Header } from "../Header/index";

import "./style.css";

interface Datas {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  privacyTerms: boolean;
}

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [isSafeToReset, setIsSafeToReset] = useState<boolean>(false);
  const [messageOfSignIn, setMessageOfSignIn] = useState("");
  const watchPassword = watch("password");

  const onSubmit = async (data: Datas) => {
    setMessageOfSignIn("loading...");
    await api.post("/user/signIn", data).then(({ data }) => {
      setMessageOfSignIn(data);
      setTimeout(() => {
        setMessageOfSignIn("");
      }, 5000);
      if (data === "sucessful login.") {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    });

    setIsSafeToReset(true);
    console.log(data);
  };

  useEffect(() => {
    if (!isSafeToReset) return;
    reset({
      name: "",
      email: "",
      password: "",
    });
  }, [onSubmit]);

  return (
    <div className="container">
      <div className="header-container">
        <Header />
      </div>
      <div className="form-container">
        <div className="message">{messageOfSignIn}</div>
        <div className="form-group">
          <label>Name</label>
          <input
            className={errors?.name && "input-error"}
            type="text"
            placeholder="Your name"
            {...register("name", { required: true })}
          />
          {errors?.name?.type === "required" && (
            <p className="error-message">Name is required.</p>
          )}
        </div>
        <div className="form-group">
          <label>E-mail</label>
          <input
            className={errors?.email && "input-error"}
            type="email"
            placeholder="Your e-mail"
            {...register("email", {
              required: true,
              validate: (value) => val.default.isEmail(value),
            })}
          />
          {errors?.email?.type === "required" && (
            <p className="error-message">Email is required.</p>
          )}

          {errors?.email?.type === "validate" && (
            <p className="error-message">Email is invalid.</p>
          )}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className={errors?.password && "input-error"}
            type="password"
            placeholder="Password"
            {...register("password", { required: true, minLength: 7 })}
          />

          {errors?.password?.type === "required" && (
            <p className="error-message">Password is required.</p>
          )}

          {errors?.password?.type === "minLength" && (
            <p className="error-message">
              Password needs to have at least 7 characters.
            </p>
          )}
        </div>
        <div className="form-group">
          <button onClick={() => handleSubmit(onSubmit as any)()}>Login</button>
        </div>
      </div>
    </div>
  );
};
