import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, Alert } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode"
import { UserType } from "../UserContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const AddressScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [houseNo, setHouseNo] = useState("");
    const [street, setStreet] = useState("");
    const [landmark, setLandmark] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const { userId, setUserId } = useContext(UserType);

    useEffect(() => {
        const fetchUser = async () => {
            const token = await AsyncStorage.getItem("authToken");
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.userId;
            setUserId(userId)
        }

        fetchUser();
    }, []);
    console.log(userId)
    const handleAddAddress = () => {
        const address = {
            name,
            mobileNo,
            houseNo,
            street,
            landmark,
            postalCode
        }

        axios.post("http://localhost:8000/addresses", { userId, address }).then((response) => {
            Alert.alert("Success", "Addresses added successfully");
            setName("");
            setMobileNo("");
            setHouseNo("");
            setStreet("");
            setLandmark("");
            setPostalCode("");

            setTimeout(() => {
                navigation.goBack();
            }, 500)
        }).catch((error) => {
            Alert.alert("Error", "Failed to add address")
            console.log("error", error)
        })
    }

    return (
        <ScrollView style={{ marginTop: 50 }}>
            <View
                style={{
                    height: 50,
                    backgroundColor: "#00CED1"
                }}
            />
            <View style={{ padding: 10 }}>
                <Text
                    style={{
                        fontSize: 17,
                        fontWeight: "bold"
                    }}
                >
                    Add a new address
                </Text>
                <TextInput
                    style={{
                        padding: 10,
                        borderColor: "#D0D0D0",
                        borderWidth: 1,
                        marginTop: 10,
                        borderRadius: 5
                    }}
                    placeholderTextColor={"black"}
                    placeholder="United Status"
                />

                <View style={{ marginVertical: 10 }}>
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: "bold"
                        }}
                    >
                        Full name (First and last name)
                    </Text>
                    <TextInput
                        value={name}
                        onChangeText={(text) => setName(text)}
                        style={{
                            padding: 10,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            marginTop: 10,
                            borderRadius: 5
                        }}
                        placeholderTextColor={"black"}
                        placeholder="Enter your name"
                    />
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: "bold"
                        }}
                    >
                        Mobile number
                    </Text>
                    <TextInput
                        value={mobileNo}
                        onChangeText={(text) => setMobileNo(text)}
                        style={{
                            padding: 10,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            marginTop: 10,
                            borderRadius: 5
                        }}
                        placeholderTextColor={"black"}
                        placeholder="Mobile No"
                    />
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: "bold"
                        }}
                    >
                        Flat, house No, building, company...
                    </Text>
                    <TextInput
                        value={houseNo}
                        onChangeText={(text) => setHouseNo(text)}
                        style={{
                            padding: 10,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            marginTop: 10,
                            borderRadius: 5
                        }}
                        placeholderTextColor={"black"}
                        placeholder=""
                    />
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: "bold"
                        }}
                    >
                        Area, street, sector, village...
                    </Text>
                    <TextInput
                        value={street}
                        onChangeText={(text) => setStreet(text)}
                        style={{
                            padding: 10,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            marginTop: 10,
                            borderRadius: 5
                        }}
                        placeholderTextColor={"black"}
                        placeholder=""
                    />
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: "bold"
                        }}
                    >
                        Landmark
                    </Text>
                    <TextInput
                        value={landmark}
                        onChangeText={(text) => setLandmark(text)}
                        style={{
                            padding: 10,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            marginTop: 10,
                            borderRadius: 5
                        }}
                        placeholderTextColor={"black"}
                        placeholder=""
                    />
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: "bold"
                        }}
                    >
                        Postalcode
                    </Text>
                    <TextInput
                        value={postalCode}
                        onChangeText={(text) => setPostalCode(text)}
                        style={{
                            padding: 10,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            marginTop: 10,
                            borderRadius: 5
                        }}
                        placeholderTextColor={"black"}
                        placeholder="Enter your postalcode"
                    />
                </View>

                <Pressable
                    onPress={handleAddAddress}
                    style={{
                        backgroundColor: "#FFC72C",
                        padding: 19,
                        borderRadius: 6,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 20,
                    }}
                >
                    <Text style={{ fontWeight: "bold" }}>Add Address</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

export default AddressScreen;

const styles = StyleSheet.create({})