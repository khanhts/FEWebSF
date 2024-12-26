import React from 'react'

const ModalProfileChange = ({closeModal, account}) => {
    return (
        <div className="modal-container">
            <div className="modal-profile-box">
                <h2 className="modal-header">UPDATE YOUR PROFILE INFO</h2>
                <div className='modal-content-wrapper'>
                    {console.log(account)
                    }
                    <form>
                        <div className='form-group'>
                            <label htmlFor="fullname">Fullname</label>
                            <input type="text" name='fullname' defaultValue={account.fullname}/>
                        </div>
                        <div className="form-group">
                            <p>Gender</p>
                            <div className="gender-checkbox-container">
                                 <div className="gender-checkbox">
                                    <label htmlFor="gender-male">Male</label>
                                    <input type="checkbox" name='gender-male' checked={account.gender==1?true:false} value={1}/>
                                </div>
                                <div className="gender-checkbox">
                                    <label htmlFor="gender-female">Female</label>
                                    <input type="checkbox" name='gender-female' checked={account.gender==0?true:false} value={0}/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <input type="text" name='country' defaultValue={account.country}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input type="text" name='address' defaultValue={account.address}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="language">Language</label>
                            <input type="text" name='language' defaultValue={account.language}/>
                        </div>
                    </form>
                </div>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    )
}

export default ModalProfileChange