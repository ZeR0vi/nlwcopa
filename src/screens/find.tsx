import { VStack, Heading, Text } from "native-base";
import { Header } from '../components/Header'
import {  Input  } from '../components/Input'
import { Button } from "../components/button";

import Logo from '../assets/logo.svg'

export function Find(){
    return(
        <VStack flex={1} bgColor="gray.900">
            <Header
            title="Procurar um Bolão"
            showBackButton
            />

            <VStack mt={8} mx={5} alignItems="center">


                <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
                    Encontre um bolão através de seu código único
                </Heading>

                <Input
                    placeholder="Qual é o código do bolão?"
                    mb={2}
                />
                <Button
                title="BUSCAR BOLÃO"
                />

               

            </VStack>

        </VStack>
    )
}