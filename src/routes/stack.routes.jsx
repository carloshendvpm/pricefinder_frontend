import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { Login } from "../screens/Login";
import OnboardingScreen from "../screens/OnboardingScreen";
import Cadastro from "../screens/Cadastro";


const { Screen, Navigator } = createNativeStackNavigator();

export function StackRoutes(){
  return (
    <Navigator>
      <Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={
          {
            headerShown: false
          }
        }
      />
      <Screen
        name="Login"
        component={Login}
      />
      <Screen
        name="Cadastro"
        component={Cadastro}
      />
      <Screen 
        name="Home" 
        component={Home} 
      />
    </Navigator>
  )
}
