import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { PlusCircle, SoccerBall } from 'phosphor-react-native'

import { Platform } from 'react-native'
import {New} from '../screens/new'
import { Pools } from '../screens/pools'

import { useTheme } from 'native-base'
import { Find } from '../screens/find'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {

    const {colors} = useTheme()
    
    return(
        <Navigator screenOptions={{
            headerShown: false,
            tabBarLabelPosition: 'beside-icon',
            tabBarActiveTintColor: colors.yellow[500],
            tabBarInactiveTintColor: colors.gray[300],
            tabBarStyle: {
                position: 'absolute',
                height: 87,
                borderTopWidth: 0,
                backgroundColor: colors.gray[800]
            },
            tabBarItemStyle:{
                position: 'relative',
                top: Platform.OS === 'android' ? -10 : 0
            }
        }}>
            <Screen
                name="new"
                component={New}
                options={{
                    tabBarIcon: ({color}) => <PlusCircle color={color} />,
                    tabBarLabel: 'Novo Bolão'

                }}
            />
            <Screen
                name="pools"
                component={Pools}
                options={{
                    tabBarIcon: ({color}) => <SoccerBall color={color} />,
                    tabBarLabel: 'Meus Bolões'


                }}
            />


            <Screen
                name="find"
                component={Find}
                options={{tabBarButton: () => null }}
            />
        </Navigator>
    )
}