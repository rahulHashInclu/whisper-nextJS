const signUp_bgImg_left = "/assets/signup-bgImg-left.png";
const signUp_bgImg_right = "/assets/signup-bgImg-right.png";
const signUp_bgImg_gradient = "/assets/signup-bgImg-gradient.png";

export default function SignUpCardHolder({ children }) {
  return (
    <div className="flex items-center justify-center w-full">
      <img src={signUp_bgImg_left} alt="bg-IMG" />
      <img src={signUp_bgImg_gradient} alt="grad-bg" className="absolute" />
      <div className="relative z-20 w-1/4">{children}</div>
      <img src={signUp_bgImg_right} alt="bg-I9MG" />
    </div>
  );
}
