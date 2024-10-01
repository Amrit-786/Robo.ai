const { Navigate } = require("react-router-dom");


const PrivateRoute = ({children})=>{
    const token = localStorage.getItem('token');

    //if there's no token, redirect to the login page
    return token ? children : <Navigate to='/auth'/>
}

export default PrivateRoute;