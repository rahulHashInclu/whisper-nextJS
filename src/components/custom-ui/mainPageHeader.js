
const headerImage = '/assets/signup-card-title-img.png';
const whisperMainText = '/assets/WHISPER.png';

export default function MainPageHeader(){

    return(
        <div className="flex gap-2 justify-center items-center">
            <img src={headerImage} alt="header-img"/>
            <img src={whisperMainText} alt="whisper-main-text"/>
        </div>
    )
}