import {Layout} from "./components/Layout";
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {HomePage} from "./components/HomePage";
import {ScanPage} from "./components/ScanPage";
import {navigationRef} from "./core/rootNavigation";
import {pageNames} from "./core/pageNames";
import {useFonts} from "expo-font";
import {Inter_400Regular} from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading/build/AppLoadingNativeWrapper";

const Stack = createNativeStackNavigator();

export default function App() {
    let [fontsLoaded] = useFonts({
        Inter_400Regular
    });

    if(!fontsLoaded) {
        return <AppLoading/>
    }

    return (
        <NavigationContainer ref={navigationRef}>
            <Layout>
              <Stack.Navigator initialRouteName="Home">
                  <Stack.Screen name={pageNames.home} component={HomePage}/>
                  <Stack.Screen name={pageNames.scan} component={ScanPage} />
              </Stack.Navigator>
            </Layout>
        </NavigationContainer>
    );
}