import { getAssetPath } from "@/lib/utils";

const signUp_bgImg_left = getAssetPath("/assets/signup-bgImg-left.png");
const signUp_bgImg_right = getAssetPath("/assets/signup-bgImg-right.png");
const signUp_bgImg_gradient = getAssetPath("/assets/signup-bgImg-gradient.png");

export default function SignUpCardHolder({ children }) {
  return (
    <div className="flex items-center justify-center w-full">
      <img
        src={signUp_bgImg_left}
        alt="bg-IMG"
        className="hidden lg:block w-auto max-w-full"
      />
      <img
        src={signUp_bgImg_gradient}
        alt="grad-bg"
        className="absolute w-full h-full object-cover"
      />
      <div className="relative z-20 w-full md:w-2/4 lg:w-1/4 px-4 md:px-0">
        {children}
      </div>
      <img
        src={signUp_bgImg_right}
        alt="bg-I9MG"
        className="hidden lg:block w-auto max-w-full"
      />
    </div>
  );
}
