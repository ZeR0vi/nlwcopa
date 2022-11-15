import { VStack, Heading, Text } from "native-base";
import { Header } from '../components/Header'
import {  Input  } from '../components/Input'
import { Button } from "../components/button";

import Logo from '../assets/logo.svg'

export function New(){
    return(
        <VStack flex={1} bgColor="gray.900">
            <Header
            title="Criar novo Bolão"
            />

            <VStack mt={8} mx={5} alignItems="center">

                <Logo

                />

                <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
                    Crie seu próprio bolão da copa e compartilhe entre amigos!
                </Heading>

                <Input
                    placeholder="Qual é o nome do seu bolão?"
                    mb={2}
                />
                <Button
                title="CRIAR MEU BOLÃO"
                />

                <Text color="gray.200" fontSize="sm" textAlign="center" mt={4} px={10}>
                    Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas.
                </Text>

            </VStack>

        </VStack>
    )
}