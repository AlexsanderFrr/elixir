import React, { useEffect } from 'react';
import { View, ImageBackground, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type SplashScreenProps = {
    navigation: StackNavigationProp<any>;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Login'); // Navega para a tela de Login
        }, 5000);
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../assets/backgroundsuco.png')}
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Image
                    source={require('../../assets/logo.png')}
                    style={{
                        width: 292,
                        height: 47,
                    }}
                />
            </ImageBackground>
        </View>
    );
};

export default SplashScreen;
