import SignUpCardHolder from "@/components/custom-ui/signUpCardHolder";
import AuthCard from "@/components/signup/AuthCard";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-signup-bg relative">
      <SignUpCardHolder>
        {/* <SignIn /> */}
        <AuthCard initialType="signin" />
      </SignUpCardHolder>
    </div>
  );
}
