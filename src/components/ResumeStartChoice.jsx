import add from '../assets/add.svg'
import upload from '../assets/upload.svg'

export default function ResumeChoice({onSelectChoice}){
    return(
        <div className="resume-choice-container">
            <div className="new-data choice" onClick={() => onSelectChoice('new')}>
                <img src={add} alt="Image of a plus sign" />
                <p>New Blank Resume</p>
            </div>
            <div className="import-data choice" onClick={() => onSelectChoice('import')}>
                <img src={upload} alt="Image of a file upload sign" />
                <p>Import Resume</p>
            </div>
        </div>
    )
}