import SignIn from "@/components/signIn";
import SignUpCardHolder from "@/components/custom-ui/signUpCardHolder";

export default function SignInPage(){

    return(
        <div className="flex justify-center items-center min-h-screen w-full bg-signup-bg relative">
            <SignUpCardHolder>
                <SignIn />
            </SignUpCardHolder>
        </div>
    )

}