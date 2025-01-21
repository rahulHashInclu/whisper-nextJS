import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { BASE_PATH } from "@/helper/constants";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export function formValidation({email, password}){
  const errors = {}

  //Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!email){
    errors.email = 'Email is required';
  }
  else if(!emailRegex.test(email)){
    errors.email = 'Please enter a valid email';
  }

  // Password validation
  if (!password){
    errors.password = 'Password is required';
  }
  else{
    if (password.length < 6){
      errors.password = 'Password must be at least 6 characters long';
    }

    // Check for at least one numeric character
    if (!/\d/.test(password)) {
      errors.password = 'Password must contain at least one numeric character';
    }

    // Check for at least one uppercase character
    if (!/[A-Z]/.test(password)) {
      errors.password = 'Password must contain at least one uppercase letter';
    }

    // Check for at least one special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.password = 'Password must contain at least one special character';
    }
  }

  const isValid = Object.keys(errors).length === 0;
  return {
    isValid,
    errors
  }
}

export function getAssetPath(path){
  return `${BASE_PATH}${path}`
}

export const getUserInitials = (userName) => {
  if(userName){
      const userAvatarFallback = userName.charAt(0)+userName.charAt(1);
      return userAvatarFallback.toUpperCase();
  }
  return 'NA';
}