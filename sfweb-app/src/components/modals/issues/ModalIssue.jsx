import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../modal.css'
import { fetchYourReport } from '../../../services/axios/AxiosReport';

const ModalIssue = ({closeModal, postId, accountId}) => {
    
    const issues = useSelector((state)=>state.issue);

    const [yourRP, setYourRP] = useState()
    const [reportIssues, setReportIssues] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const getYourReports = async() => {
        const response = await fetchYourReport(postId,accountId);
        if(response.isError)
            setErrorMessage(response.message);
        else{
            setErrorMessage("");
            setIsLoading(false);
            setYourRP(response)
        }
    }

    const handleContextSelected = async(e) => {
        if(e.target.checked)
            setReportIssues((prevList)=>prevList.concat(e.target.value));
        else
            setReportIssues((prevList)=>prevList.filter(id=>id!=e.target.value));
    }

    const handleFormSubmit = async(e) => {
        e.preventDefault();
        const formData = {
            account_id: accountId,
            list_issue_id: reportIssues,
            post_id: postId
        }
    } 

    useEffect(()=>{
        getYourReports()
    },[])

    useEffect(()=>{
        console.log("Report issues: ", reportIssues);
        
    },[reportIssues])
  
    return (
        <div className="modal-container">
            <div className="modal-box">
                <div className="modal-wrapper">
                    <h2>Report</h2>
                    <form>
                        {!issues.isInitError && issues.context.map((cnt)=>{
                            return(
                            <div key={cnt.id} className="issue-context-group">
                                <input name={"context-"+cnt.id} type="checkbox" onClick={(e)=>handleContextSelected(e)} value={cnt.id}/>
                                <label htmlFor={"context-"+cnt.id}>{cnt.name}</label>
                            </div>)
                        })}
                    </form>
                    <div className="modal-action">
                        <button className='btn-close' type='button' onClick={()=>closeModal()}>Close</button>
                        <button className='btn-submit' type='submit'>Submit</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default ModalIssue