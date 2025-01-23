import SignUpCardHolder from "@/components/custom-ui/signUpCardHolder";
import AuthCard from "@/components/signup/AuthCard";

export default function SignupPage() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-signup-bg relative">
      {/* <SignUpCardHolder>{<SignUp />}</SignUpCardHolder> */}
      <SignUpCardHolder>
        <AuthCard initialType="signup" />
      </SignUpCardHolder>
    </div>
  );
}
