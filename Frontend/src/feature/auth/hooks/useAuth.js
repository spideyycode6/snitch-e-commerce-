import { setError, setLoading, setUser } from '../states/auth.slice'
import { registerUser, loginUser } from '../service/auth.api'
import { useDispatch } from 'react-redux'


export const useAuth = () => {
    const dispatch = useDispatch();

    async function registerHandler({ firstName, lastName, email, password, contact }) {
        try {
            dispatch(setLoading(true));
            const data = await registerUser({ firstName, lastName, email, password, contact });

            if (data?.success) {
                dispatch(setUser(data.user));
                dispatch(setError(null));
                return data;
            }

            dispatch(setError(data?.message || 'Registration failed'));
            return data;
        } catch (error) {
            dispatch(setError(error?.response?.data?.message || error.message || 'Registration failed'));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function loginHandler({ email, password }) {
        try {
            dispatch(setLoading(true));
            const data = await loginUser({ email, password });

            if (data?.success) {
                dispatch(setUser(data.user));
                dispatch(setError(null));
                return data;
            }

            dispatch(setError(data?.message || 'Login failed'));
            return data;
        } catch (error) {
            dispatch(setError(error?.response?.data?.message || error.message || 'Login failed'));
        } finally {
            dispatch(setLoading(false));
        }
    }

    function logoutHandler() {
        dispatch(setUser(null));
        dispatch(setError(null));
    }

    return{registerHandler, loginHandler, logoutHandler}
}