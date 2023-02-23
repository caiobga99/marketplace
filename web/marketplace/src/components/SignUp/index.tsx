import { useForm } from "react-hook-form";
import * as val from "validator";
import { useState, useEffect } from "react";
import { api } from "../../lib/axios";
import "./style.css";

interface Datas {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  privacyTerms: boolean;
}

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [isSafeToReset, setIsSafeToReset] = useState<boolean>(false);
  const [messageOfSignUp, setMessageOfSignUp] = useState("");
  const watchPassword = watch("password");

  useEffect(() => {
    if (!isSafeToReset) return;
    reset();
  }, [reset]);
  const onSubmit = async (data: Datas) => {
    await api.post("/user/signUp", data).then(({ data }) => {
      setMessageOfSignUp(data);
    });

    reset({
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      privacyTerms: "",
    });
    setIsSafeToReset(true);
    console.log(data);
  };

  return (
    <div className="form-container">
      <div className="message">{messageOfSignUp}</div>
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
        <label>Password confirmation</label>
        <input
          className={errors?.passwordConfirmation && "input-error"}
          type="password"
          placeholder="Repeat your password"
          {...register("passwordConfirmation", {
            required: true,
            validate: (value) => value === watchPassword,
          })}
        />
        {errors?.passwordConfirmation?.type === "required" && (
          <p className="error-message">Password confirmation is required.</p>
        )}

        {errors?.passwordConfirmation?.type === "validate" && (
          <p className="error-message">Passwords does not match.</p>
        )}
      </div>
      <div className="form-group">
        <div className="checkbox-group">
          <input
            type="checkbox"
            {...register("privacyTerms", {
              validate: (value) => value === true,
            })}
          />
          <label>I agree with the privacy terms.</label>
        </div>

        {errors?.privacyTerms?.type === "validate" && (
          <p className="error-message">
            You must agree with the privacy terms.
          </p>
        )}
      </div>
      <div className="form-group">
        <button onClick={() => handleSubmit(onSubmit as any)()}>
          Create an Account
        </button>
      </div>
      |
    </div>
  );
};
