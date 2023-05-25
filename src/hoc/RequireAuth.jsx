import { useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const RequireAuth = ({children}) => {
    const location = useLocation();
    const token = useSelector((state) => state.token.value);

    if (!token) {
        return <Navigate to="/" state={{from: location}} />
    }

    return children;
}

export default RequireAuth