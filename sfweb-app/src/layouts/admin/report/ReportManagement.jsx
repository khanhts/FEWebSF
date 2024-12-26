import React from 'react'
import { fetchAllReports } from '../../../services/axios/AxiosReport';

const ReportManagement = () => {
    const [reports, setReports] = useState([]);
    const [isCheckedAll, setIsCheckedAll] = useState(false);
    const [isUncheckedAll, setIsUncheckedAll] = useState(false);
    const [selectList, setSelectList] = useState([]);
    const [error, setError] = useState();

    const handleSelect = (e) => {
        setSelectList((prevList)=>prevList.concat(e));
    }

    const handleDeselect = (e) => {
        setSelectList((prevList)=>prevList.filter(value => value!=e))
    }

    const handleCheckAll = () => {
        setIsUncheckedAll(false);
        setIsCheckedAll(true);
    }

    const handleCancelCheckAll = () => {
        setIsCheckedAll(false);
    }

    const handleUnCheckAll = () => {
        setIsCheckedAll(false);
        setIsUncheckedAll(true);
    }

    const handleCancelUncheckAll = () => {
        setIsUncheckedAll(false);
    }

    const initUpgradeRequestList = async() => {
        const respone = await fetchAllReports();
        setReports(respone.data)
    }

    const handleAcceptClicked = async(value) => {
        const response = await acceptUpgradeRequest(value);
        if(!response.isError){
            setError(null);
            setRequests((prevList)=>prevList.filter(request => request.id!=value));
        }
        else{
            setError(response.message);
        }
    }

    useEffect(()=>{
        initUpgradeRequestList()
    },[])
  return (
    <div>ReportManagement</div>
  )
}

export default ReportManagement