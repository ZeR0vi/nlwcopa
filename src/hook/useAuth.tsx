import { useContext } from 'react';

import { AuthContextProvider, AuthContextDataProps, AuthContext  } from '../contexts/authContext';


export function useAuth(): AuthContextDataProps {
    const context = useContext(AuthContext);

    return context
}