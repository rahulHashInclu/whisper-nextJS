import SignUp from "@/components/signUp";

export default function SignupPage(){
    const signUp_bgImg_left = '/assets/signup-bgImg-left.png';
    const signUp_bgImg_right = '/assets/signup-bgImg-right.png';
    const signUp_bgImg_gradient = '/assets/signup-bgImg-gradient.png'

    return(
        <div className="flex justify-center items-center min-h-screen bg-signup-bg relative">
            <img src={signUp_bgImg_left} alt="bg-IMG"/>
            <img src={signUp_bgImg_gradient} alt="grad-bg" className="absolute"/>
            <div className="relative z-20">
                <SignUp />
            </div>
            <img src={signUp_bgImg_right} alt="bg-I9MG"/>
        </div>
        
    )
}