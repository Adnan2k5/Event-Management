import {jwtDecode} from 'jwt-decode';

const getUserFromToken = (token) => {
    if (!token) return null;

    try {
        const decodedToken = jwtDecode(token);
        return decodedToken;
    } catch (error) {
        console.error('Invalid token', error);
        return null;
    }
};

export default getUserFromToken;
