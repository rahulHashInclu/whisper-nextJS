import SignUp from "@/components/signup/signUp";
import SignUpCardHolder from "@/components/custom-ui/signUpCardHolder";

export default function SignupPage() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-signup-bg relative">
      <SignUpCardHolder>{<SignUp />}</SignUpCardHolder>
    </div>
  );
}
