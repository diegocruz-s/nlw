import React from 'react';
import { NativeBaseProvider, VStack, Center, Text, StatusBar } from 'native-base';
import { THEME } from './src/styles/theme';
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Loading } from './src/components/Loading';
import { SignIn } from './src/screens/SignIn';
import { AuthContextProvider } from './src/context/AuthContext';
import { Pools } from './src/screens/Pools';
// VStack deixa as coisas na vertical
// Center já deixa no centro (alignItems="center" justifyContent="center")

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular, Roboto_500Medium, Roboto_700Bold
  })

  return (
    <NativeBaseProvider theme={THEME}>
        <AuthContextProvider>
          <StatusBar 
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          {fontsLoaded ? <SignIn /> : <Loading />}
        </AuthContextProvider>
    </NativeBaseProvider> 
  );
}

