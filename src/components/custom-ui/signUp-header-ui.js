

export default function SignupHeaderUi(){
    const signUpTitleBgImg = '/assets/signup-card-title-bgImg.png';
    const signUpTitleImg = '/assets/signup-card-title-img.png';
    return(
        <div className="flex justify-center items-center relative w-1/3 h-10 mt-6 mx-auto">
            <img src={signUpTitleBgImg} alt="signup-title-bgimg" className="absolute w-full" />
            <div className="relative z-22 h-10 w-10 flex justify-center items-center bg-[#1F2022] rounded-lg">
                <img src={signUpTitleImg} alt="signup-title-img" className="h-8 w-8"/>
            </div>
        </div>
    )
}

// the div container for signUpTitleImg is not correctly taking the entire width gap between each sides of the signUpTitleBgImg imageConfigDefault. Adjust the width and height for that