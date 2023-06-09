import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { Login } from "../screens/Login";
import OnboardingScreen from "../screens/OnboardingScreen";
import Cadastro from "../screens/Cadastro";
import { ProductsScreen } from "../screens/ProductsScreen";
import { CadastraProduto } from "../screens/CadastraProduto";
import { ProductDetails } from "../screens/ProductDetails";

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
        options={{ title: 'Mercados' }}
      />
      <Screen 
        name="Products" 
        component={ProductsScreen} 
        options={{ title: 'Produtos cadastrados' }}
      />
      <Screen
        name="CadastraProduto"
        component={CadastraProduto}
        options={{ title: 'Cadastrar produto' }}
      />
      <Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{ title: 'Detalhes do produto' }}
      />
    </Navigator>
  )
}
