

const signUp_and_signInPage_base_style = "flex justify-center items-center min-h-screen bg-signup-bg relative";
const span_url = "text-white cursor-pointer hover:underline";
const label_text_base_styles = "text-white font-normal leading-4";
const meet_record_btn = "border border-[#FFFFFF29] bg-[#FFFFFF0D]";
const meet_connect_btn = "bg-[#D9D9D9] text-mainpage-bg";


export const themeStyles = {
    layout: {
      signUpPageContainer: "flex justify-center items-center min-h-screen bg-signup-bg relative",
    },
    text: {
      link: "text-white cursor-pointer hover:underline",
      label: "text-white font-normal text-xs",
    },
    button: {
        meet_connect: "bg-gray-300 text-mainpage-bg",
        meet_record: "border border-slate-600"
    }
}

export {
    span_url,
    label_text_base_styles,
    meet_record_btn,
    meet_connect_btn
}