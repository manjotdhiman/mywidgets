import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import KnobScreen from '../screens/KnobScreen';
import { colors } from '../Constants/theme';
import PyramidScreen from '../screens/PyramidScreen';
const Stack = createNativeStackNavigator();

function AppStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.secondaryColor

                },
                headerTitleStyle: { color: colors.textButtonColor },
                headerTintColor: colors.textButtonColor

            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: "My Widgets" }} />
            <Stack.Screen name="KnobScreen" component={KnobScreen} options={{ title: "Knob Screen" }} />
            <Stack.Screen name="PyramidScreen" component={PyramidScreen} options={{ title: "Pyramid Screen" }} />
        </Stack.Navigator>
    );
}
const MainStackNavigator = () => {

    return (
        <NavigationContainer>
        <AppStack />
        </NavigationContainer>
    )
}
export default MainStackNavigator;