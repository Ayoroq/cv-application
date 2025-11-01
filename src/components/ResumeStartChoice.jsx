export default function ResumeChoice({onSelectChoice}){
    return(
        <div className="resume-choice">
            <div className="new-data choice" onClick={() => onSelectChoice('new')}>
                <p></p>
                <p>New Blank Resume</p>
            </div>
            <div className="import-data choice" onClick={() => onSelectChoice('import')}>
                <p></p>
                <p>Import Resume</p>
            </div>
        </div>
    )
}