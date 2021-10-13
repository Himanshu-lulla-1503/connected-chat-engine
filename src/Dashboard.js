import React,{useContext} from 'react'
import {authContext} from './App';


function Dashboard() {
    const authValue=useContext(authContext);
    return (
        <>
        <h1>Hello {authValue.loginStatus.user.providerData[0].displayName}</h1>
        <button onClick={authValue.handlelogout}>Logout</button>
        </>
    )
}

export default Dashboard
