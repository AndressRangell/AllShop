import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    KeyboardAvoidingView,
    TextInput,
    Pressable
} from "react-native";
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigation = useNavigation();

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "white",
                alignItems: "center"
            }}
        >
            <View>
                <Image
                    style={{
                        width: 150,
                        height: 100
                    }}
                    source={{
                        uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png"
                    }}
                />
            </View>
            <KeyboardAvoidingView>
                <View style={{ alignItems: "center" }} >
                    <Text
                        style={{
                            fontsize: 17,
                            fontWeight: "bold",
                            marginTop: 12,
                            color: "#041E42"
                        }}
                    >
                        Login In to your Account
                    </Text>
                </View>
                <View style={{ marginTop: 70 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            backgroundColor: "#D0D0D0",
                            paddingVertical: 5,
                            borderRadius: 5,
                            marginTop: 30
                        }}
                    >
                        <Ionicons
                            style={{ marginLeft: 8 }}
                            name="ios-person"
                            size={24}
                            color="gray"
                        />
                        <TextInput
                            value={name}
                            onChangeText={(text) => setName(text)}
                            style={{
                                color: "gray",
                                marginVertical: 10,
                                marginStart: 5,
                                width: 300,
                                fontsize: name ? 16 : 16
                            }}
                            placeholder="Enter your name"
                        />
                    </View>
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            backgroundColor: "#D0D0D0",
                            paddingVertical: 5,
                            borderRadius: 5,
                            marginTop: 30
                        }}
                    >
                        <MaterialIcons
                            style={{ marginLeft: 8 }}
                            name="email"
                            size={24}
                            color="gray"
                        />
                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            style={{
                                color: "gray",
                                marginVertical: 10,
                                marginStart: 5,
                                width: 300,
                                fontsize: email ? 16 : 16
                            }}
                            placeholder="Enter your email"
                        />
                    </View>
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            backgroundColor: "#D0D0D0",
                            paddingVertical: 5,
                            borderRadius: 5,
                            marginTop: 30
                        }}
                    >
                        <AntDesign
                            style={{ marginLeft: 8 }}
                            name="lock1"
                            size={24}
                            color="gray"
                        />
                        <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                            style={{
                                color: "gray",
                                marginVertical: 10,
                                marginStart: 5,
                                width: 300,
                                fontsize: password ? 16 : 16
                            }}
                            placeholder="Enter your password"
                        />
                    </View>
                </View>
                <View
                    style={{
                        marginTop: 12,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}
                >
                    <Text>Keep me logged in</Text>
                    <Text
                        style={{
                            color: "#007FFF",
                            fontweight: "500"
                        }}
                    >
                        Forgot password
                    </Text>
                </View>
                <View style={{ marginTop: 80 }} />
                <Pressable
                    style={{
                        width: 200,
                        backgroundColor: "#FEBE10",
                        borderRadius: 6,
                        marginLeft: "auto",
                        marginRight: "auto",
                        padding: 15
                    }}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            color: "white",
                            fontsize: 16,
                            fontWeight: "bold"
                        }}
                    >
                        Register
                    </Text>
                </Pressable>
                <Pressable
                    style={{ marginTop: 15 }}
                    onPress={() => navigation.goBack()}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            color: "gray",
                            fontSize: 16
                        }}
                    >
                        Already have an account? Sign In
                    </Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})