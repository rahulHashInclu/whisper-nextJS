"use client"

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CardDescription } from "../ui/card";
import { useState, useCallback, useEffect } from "react";
import { formValidation } from "@/lib/utils";
import { signInUser } from "@/helper/requests";
import toast from "react-hot-toast";

const userIcon = "/assets/icons/User-icon.svg";
const emailIcon = "/assets/icons/Email-icon.svg";
const passwordIcon = "/assets/icons/Password-lock-icon.svg";

const inputStyle =
  "bg-[#0F0F0F] border border-[#3B3D41] rounded pl-12 py-3 text-white placeholder:text-gray-400";
const inputIconStyle = "absolute left-4 top-3 h-5 w-5";

export default function SignInForm() {

    const [formData, setFormData] = useState({
    email:'',
    password:'',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [globalError, setGlobalError] = useState('');

    const handleChange = useCallback((e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));

        if (formErrors[id]) {
            setFormErrors(prev => {
            const newErrors = {...prev};
            delete newErrors[id];
            return newErrors;
            });
        }
    }, [formErrors]);

    const handleSubmission = async (e) => {
        e.preventDefault();
        toast.success('Sucess toast...')
        setFormErrors({});
        setGlobalError('');

        const validationResult = formValidation(formData);
        if(!validationResult.isValid){
            setFormErrors(validationResult.errors);
            return;
        }

        setIsSubmitting(true);
        try{
            const response = await signInUser(formData.email, formData.password);
            console.log('Sign in user response...', response);
        }
        catch(err){
            setGlobalError('Signup failed, please try again');
        }
        finally{
            setIsSubmitting(false);
        }
    }

    useEffect(() => {
        console.log('Form data values change...', formData)
    }, [formData])
    useEffect(() => {
        console.log('Form errors...', formErrors);
    }, [formErrors])

  return (
    <form className="space-y-4" onSubmit={handleSubmission}>
      <div className="relative">
        <img src={emailIcon} alt="email-icon" className={inputIconStyle} />
        <Input
          id="email"
          placeholder="Email address"
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
      <CardDescription>Forgot Password ?</CardDescription>

      <Button className="w-full py-6 bg-white opacity-25 text-black font-normal" type="submit">
        Sign In
      </Button>
    </form>
  );
}
