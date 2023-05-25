import { useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const AuthorizedUser = ({children}) => {
    const location = useLocation();
    const token = useSelector((state) => state.token.value);
    
    if (token && location.pathname === "/Authorization") {
        return <Navigate to="/" />
    }

    return children;
}

export default AuthorizedUser