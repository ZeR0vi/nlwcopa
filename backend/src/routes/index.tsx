import { NavigationContainer } from '@react-navigation/native'

import { AppRoutes } from './app.routes'

import { SignIn } from '../screens/signin'
import { useAuth } from '../hook/useAuth'

export function Routes(){
  const {user} = useAuth()  
  
  return (
      

    <NavigationContainer>
      {user.name ? <AppRoutes/> : <SignIn/>}
    </NavigationContainer>
    );
}