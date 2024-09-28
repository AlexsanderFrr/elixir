import React, { useState, useEffect, useContext } from 'react';
import { View, Text, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthContext } from '../context/authContext';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

// Define o tipo para os dados do formulário
interface LoginFormData {
    email: string;
    password: string;
}

type LoginScreenProps = {
    navigation: StackNavigationProp<any>;
};

const schema = yup.object({
    email: yup.string().email("Email Inválido").required("Informe seu email"),
    password: yup.string().min(6, "A senha deve ter pelo menos 6 dígitos").required("Informe sua senha")
});

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const { login, loginSocial, isLoading } = useContext(AuthContext);
    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: yupResolver(schema)
    });
    const [passwordVisible, setPasswordVisible] = useState(true);

    const onSubmit = (data: LoginFormData) => {
        login(data.email, data.password);
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <View>
                <Text>Bem vindo a</Text>
                <Image source={require('../../assets/logo.png')} />
            </View>

            <View>
                <Text>Faça login na sua conta</Text>

                {errors.email && <Text>{errors.email?.message}</Text>}
                <View>
                    <Ionicons name="mail-outline" size={24} />
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder='Email'
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                            />
                        )}
                    />
                </View>

                {errors.password && <Text>{errors.password?.message}</Text>}
                <View>
                    <Ionicons name="lock-closed-outline" size={24} />
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Senha"
                                secureTextEntry={passwordVisible}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                            />
                        )}
                    />
                    <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                        <FontAwesome name={passwordVisible ? "eye-slash" : "eye"} size={24} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                    {isLoading ? <ActivityIndicator size="small" /> : <Text>Entrar</Text>}
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;
