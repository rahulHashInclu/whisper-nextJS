"use client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCallback, useEffect, useState } from "react";
import { formValidation } from "@/lib/utils";
import { signUpUser } from "@/helper/requests";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const userIcon = "/assets/icons/User-icon.svg";
const emailIcon = "/assets/icons/Email-icon.svg";
const passwordIcon = "/assets/icons/Password-lock-icon.svg";

const inputStyle =
  "bg-[#0F0F0F] border border-[#3B3D41] rounded pl-12 py-3 text-white placeholder:text-gray-400";
const inputIconStyle = "absolute left-4 top-3 h-5 w-5";

export default function AuthForm({ initialType }) {
  const isSignin = initialType === "signin";
  const isSignup = initialType === "signup";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const router = useRouter();

  const handleChange = useCallback(
    (e) => {
      const { id, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));

      if (formErrors[id]) {
        setFormErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[id];
          return newErrors;
        });
      }
    },
    [formErrors]
  );

  const handleSubmission = async (e) => {
    e.preventDefault();
    // Reset previous errors
    setFormErrors({});
    setGlobalError("");

    if (isSignup) {
      if (formData.password !== formData.confirmPassword) {
        setFormErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
        return;
      }

      if (!formData.name) {
        setFormErrors((prev) => ({
          ...prev,
          name: "Please enter a name",
        }));
        return;
      }
      if (formData.name.length < 3) {
        setFormErrors((prev) => ({
          ...prev,
          name: "Name must be at least 3 characters long",
        }));
        return;
      }
    }

    const validationResult = formValidation(formData);
    if (!validationResult.isValid) {
      setFormErrors(validationResult.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      if (isSignup) {
        const response = await signUpUser(
          formData.name,
          formData.email,
          formData.password,
          formData.confirmPassword
        );
        console.log("Signup API response...", response);
        if (response?.ok && response?.status === 200) {
          setIsSubmitting(false);
        }
        else{
            setGlobalError('Signup failed. Please try again');
            toast.error('Sign-up failed. Please try again');
        }
      } else {
        const email = formData.email;
        const password = formData.password;
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        if (result.error) {
          console.error("Next-Auth Error:", result.error);
        } else {
          // Successful login
          router.push("/mainPages/upload");
        }
      }
    } catch (err) {
      setGlobalError("Signup failed, please try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
      console.log('Form data values change...', formData)
  }, [formData])

  useEffect(() => {
      console.log('Form errors...', formErrors);
  }, [formErrors])

  return (
    <form className="space-y-4" onSubmit={handleSubmission}>
      {isSignup && (
        <div className="relative">
          <img src={userIcon} alt="user-icon" className={inputIconStyle} />
          <Input
            id="name"
            placeholder="Name"
            required
            className={inputStyle}
            onChange={handleChange}
          />
        </div>
      )}

      <div className="relative">
        <img src={emailIcon} alt="email-icon" className={inputIconStyle} />
        <Input
          id="email"
          placeholder="Email"
          type="email"
          required
          className={inputStyle}
          onChange={handleChange}
        />
      </div>

      <div className="relative">
        <img
          src={passwordIcon}
          alt="password-icon"
          className={inputIconStyle}
        />
        <Input
          id="password"
          type="password"
          placeholder="Password"
          required
          className={inputStyle}
          onChange={handleChange}
        />
      </div>

      {isSignup && (
        <div className="relative">
          <img
            src={passwordIcon}
            alt="password-icon"
            className={inputIconStyle}
          />
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Repeat Password"
            required
            className={inputStyle}
            onChange={handleChange}
          />
        </div>
      )}

      <Button
        className="w-full py-6 bg-white opacity-25 text-black font-normal"
        type="submit"
      >
        {isSignup ? "Sign Up" : "Sign In"}
      </Button>
    </form>
  );
}
