import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

export const ProtectedRoute = () => {
    const token = Cookies.get('token');
    if(token === undefined) return <Navigate to="/" />;
    return <Outlet />;

}
