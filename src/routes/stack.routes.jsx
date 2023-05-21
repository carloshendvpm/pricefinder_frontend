import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";


const { Screen, Navigator } = createNativeStackNavigator();

export function StackRoutes(){
  return (
    <Navigator>
      <Screen 
        name="Home" 
        component={Home} 
      />
    </Navigator>
  )
}
