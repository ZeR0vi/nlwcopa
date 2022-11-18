import { VStack, Icon } from "native-base";
import { Header } from '../components/Header';
import { Button } from '../components/button';
import { Octicons } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import { NavigationArrow } from "phosphor-react-native";

export function Pools() {

    const navigation = useNavigation();

    return(
        <VStack flex={1} bgColor="gray.900">

            <Header
            title="Meus Bolões"
            />

            <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
                <Button
                title="BUSCAR BOLÃO POR CÓDIGO"
               
                leftIcon={<Icon as={Octicons} name="search" color="black" size="md"/>}
                onPress={() => navigation.navigate('find')}
                />
            </VStack>

        </VStack>
    )
}