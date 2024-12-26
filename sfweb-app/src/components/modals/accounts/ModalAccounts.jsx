import React from 'react'
import { IMG_BASE_URL } from '../../../utils/const/UrlConst'
import { useDispatch } from 'react-redux'
import { logoutAction } from '../../../redux/actions/authAction';
import { useAuth } from '../../../services/auth/AuthProvider';
import { accountSignInAction } from '../../../redux/actions/accountAction';

const ModalAccounts = ({accountList}) => {
    const {setToken} = useAuth();
    const dispatch = useDispatch();

    const handleAccountSignIn = (e) => {
        dispatch(accountSignInAction(accountList[e.target.value]))
    }

    const handleSignOut = () => {
        dispatch(logoutAction())
        setToken(null);
    };

    return (
        <div className="modal-container">
        <div className="modal-box">
            <div className="modal-wrapper">
                <div>
                    <h2>Select account to sign in</h2>
                    {accountList.map((account, index)=>
                    <div className='account-card' key={account.id}>
                        <div className="left-card">
                            <img className='avatar-image' src={IMG_BASE_URL+account.url_avatar} alt="avatar" />
                            <p>{account.fullname}</p>
                        </div>
                        <div className="right-card">
                            <button className='btn-sign-in-account' type='button' value={index} onClick={(e)=>handleAccountSignIn(e)}>Sign in as</button>
                        </div>
                    </div>
                    )}
                </div>
                </div>
                <button className='btn-sign-out' type='button' onClick={()=>handleSignOut()}>Sign out</button>
            </div>
        </div>
    );
}

export default ModalAccounts