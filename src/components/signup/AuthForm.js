"use client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCallback, useEffect, useState } from "react";
import { formValidation } from "@/lib/utils";
import { signUpUser } from "@/helper/requests";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useSession } from "next-auth/react";
import { getAssetPath } from "@/lib/utils";

const userIcon = getAssetPath("/assets/icons/User-icon.svg");
const emailIcon = getAssetPath("/assets/icons/Email-icon.svg");
const passwordIcon = getAssetPath("/assets/icons/Password-lock-icon.svg");

const inputStyle =
  "bg-[#0F0F0F] border border-[#3B3D41] rounded pl-12 py-3 text-white placeholder:text-gray-400";
const inputIconStyle = "absolute left-4 top-3 h-5 w-5";
const errorMsgStyle = "text-sm text-red-700 mt-1 font-medium";

export default function AuthForm({ initialType }) {
  const isSignin = initialType === "signin";
  const isSignup = initialType === "signup";
  const {data: session, status} = useSession();

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
  const [showPassword, setShowPassword] = useState(false);

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
        //loading toast for signup
        const signupPromise = toast.promise(
          signUpUser(
            formData.name,
            formData.email,
            formData.password,
            formData.confirmPassword
          ),
          {
            loading: 'Creating your account...',
          }
        );
        // const response = await signupPromise(
        //   formData.name,
        //   formData.email,
        //   formData.password,
        //   formData.confirmPassword
        // );
        const response = await signupPromise;
        console.log("Signup API response...", response);
        const errorText = await response.json();
        if(errorText?.error){
          toast.error(errorText.error);
        }
        else if (response?.ok && response?.status === 200) {
          setIsSubmitting(false);
          toast.success("Account created successfully!");
          router.push('/signin');
        }
         else {
          // const errorText = await response.json();
          // // const errorData = JSON.parse(errorText);
          // console.log("ERROR RESPONSE". errorText);
          setGlobalError("Signup failed. Please try again");
          toast.error("Sign-up failed. Please try again");
        }
      } else {
        const email = formData.email;
        const password = formData.password;
        const signinPromise = toast.promise(
          signIn(
            "credentials", {
              email,
              password,
              redirect: false,
            }
          ),
          {
            loading: 'Logging in...',
            // success: 'Successfully logged in',
            // error: 'Login failed. Please try again!'
          }
        )
        // const result = await signIn("credentials", {
        //   email,
        //   password,
        //   redirect: false,
        // });
        const result = await signinPromise;
        if (result.error) {
          console.error("Next-Auth Error:", result.error);
          toast.error('Login failed. Please try again!');
        } else {
          // Successful login
          console.log('Sign in successful, redirecting...');
          toast.success('Successfully logged in');
          console.log('Session :', session);
          console.log('auth status', status);
          // await new Promise(res => setTimeout(res, 1000));
          router.push("/upload");
        }
      }
    } catch (err) {
      setGlobalError("Signup failed, please try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    console.log("Form data values change...", formData);
  }, [formData]);

  useEffect(() => {
    console.log("Form errors...", formErrors);
  }, [formErrors]);

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
            maxLength={20}
          />
          {formErrors["name"] && (
          <p className={errorMsgStyle}>{formErrors["name"]}</p>
        )}
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
          maxLength={30}
        />
        {formErrors["email"] && (
          <p className={errorMsgStyle}>{formErrors["email"]}</p>
        )}
      </div>
      <div className="relative">
        <img
          src={passwordIcon}
          alt="password-icon"
          className={inputIconStyle}
        />
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          required
          className={inputStyle}
          onChange={handleChange}
          maxLength={20}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2 text-gray-400 hover:text-gray-300 focus:outline-none"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
        {formErrors["password"] && (
          <p className={errorMsgStyle}>{formErrors["password"]}</p>
        )}
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
            type={showPassword ? "text" : "password"}
            placeholder="Repeat Password"
            required
            className={inputStyle}
            onChange={handleChange}
            maxLength={20}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-300 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
          {formErrors["confirmPassword"] && (
            <p className={errorMsgStyle}>{formErrors["confirmPassword"]}</p>
          )}
        </div>
      )}

      <Button
        className="w-full py-6 bg-white opacity-25 text-black hover:text-white hover:opacity-80 font-normal"
        type="submit"
      >
        {isSignup ? "Sign Up" : "Sign In"}
      </Button>
    </form>
  );
}
