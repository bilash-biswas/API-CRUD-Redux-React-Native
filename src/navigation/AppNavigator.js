import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../api/api_screen/HomeScreen";
import AddStudentScreen from "../api/api_screen/AddStudentScreen";
import UpdateStudentScreen from "../api/api_screen/UpdateStudentScreen";


const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Student List" component={HomeScreen} />
                <Stack.Screen name="Add New Student" component={AddStudentScreen} />
                <Stack.Screen name="Update Student" component={UpdateStudentScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
