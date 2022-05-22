import {Layout} from "./components/Layout";
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {HomePage} from "./components/pages/HomePage";
import {ScanPage} from "./components/pages/ScanPage";
import {navigationRef} from "./core/rootNavigation";
import {pageNames} from "./core/pageNames";
import {useFonts} from "expo-font";
import {Inter_400Regular} from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading/build/AppLoadingNativeWrapper";
import {HistoryProvider} from "./components/HistoryContext";

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
                <HistoryProvider>
                    <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen name={pageNames.home} component={HomePage}/>
                        <Stack.Screen name={pageNames.scan} component={ScanPage} />
                    </Stack.Navigator>
                </HistoryProvider>
            </Layout>
        </NavigationContainer>
    );
}