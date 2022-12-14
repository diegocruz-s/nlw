import React from 'react';
import { NativeBaseProvider, VStack, Center, Text, Icon } from 'native-base';
import Logo from '../assets/logo.svg'
import { Button } from '../components/Button';
import { Fontisto } from '@expo/vector-icons'
import { useAuth } from '../../hooks/useAuth';

export function SignIn(){

    const { user, signIn } = useAuth();

    return(
        <Center flex={1} bgColor="gray.900" p={7}>
            <Logo width={212} height={40} />
            <Button 
                onPress={signIn}
                type="SECONDARY"
                title="Entrar com Google" 
                leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
                mt={12}
            />
            <Text color="white" textAlign="center" mt={4}>
                Não utilizamos nenhuma informação além {'\n'} do seu e-mail para criação de sua conta.
            </Text>
        </Center>
    )
}