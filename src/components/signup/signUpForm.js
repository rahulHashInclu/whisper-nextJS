'use client'

import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function SignUpForm(){

    return(
        <form className="space-y-4">
                  <div className="relative">
                    <img src={userIcon} alt="user-icon" className={inputIconStyle} />
                    <Input
                      id="firstName"
                      placeholder="Name"
                      required
                      className={inputStyle}
                    />
                  </div>
        
                  <div className="relative">
                    <img src={emailIcon} alt="email-icon" className={inputIconStyle} />
                    <Input
                      id="email"
                      placeholder="Email"
                      type="email"
                      required
                      className={inputStyle}
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
                      placeholder="Repeat Password"
                      required
                      className={inputStyle}
                    />
                  </div>
        
                  <Button className="w-full py-6 bg-white opacity-25 text-black font-normal">
                    Sign up
                  </Button>
                </form>
    )
}