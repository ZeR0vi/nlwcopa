import { createContext, ReactNode, useState, useEffect } from "react";
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import { usePropsResolution } from "native-base";

import { api } from '../services/api'

WebBrowser.maybeCompleteAuthSession();

interface UserProps{
    name: string,
    avatar: string,

}

export interface AuthContextDataProps{
    user: UserProps;
    signIn: () => Promise<void>
    isUserLoading: Boolean
}
export const AuthContext = createContext({} as AuthContextDataProps )

interface AuthProviderProps {
    children: ReactNode;
}


export function AuthContextProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps>({} as UserProps)
    const [isUserLoading, setIsUserLoanding] = useState(false)

  const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '587966359799-bvnktoftlq0p5n5lvuc8kf8jibbr9r7p.apps.googleusercontent.com',
        redirectUri: AuthSession.makeRedirectUri({useProxy: true}),
        scopes: ['profile', 'email']
    })

    async function signIn() {
        try{
            setIsUserLoanding(true)
            await promptAsync()
        }catch(err){
            console.log(err)
            throw err
        } finally{
            setIsUserLoanding(false)
        }
    }

    async function signInWithGoogle(access_token: string){
        try{
            setIsUserLoanding(true)

          const tokenResponse =  await api.post('/users', { access_token })
          api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}` 

          const userInfoResponse = await api.get('/me')
          setUser(userInfoResponse.data.user)

        }catch(err){
            console.log(err)
        }finally{
            setIsUserLoanding(false)

        }
    }

    useEffect(() => {
        if(response?.type === 'success' && response.authentication?.accessToken){
            signInWithGoogle(response.authentication.accessToken)
        }

    }, [response])

    return(
        <AuthContext.Provider value={{
            signIn,
            isUserLoading,
            user,
        }}>
            {children}
        </AuthContext.Provider>
    )
}