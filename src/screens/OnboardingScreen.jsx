import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import { Image } from "react-native";

const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      bottomBarHighlight={false}
      bottomBarColor="transparent"
      bottomBarHighlightColor="transparent"
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.navigate("Login")}
      pages={[
        {
          backgroundColor: "#fff",
          image: <Image source={require("../../assets/onboarding1.png")} />,
          title: "Seja bem vindo ao \n PriceFinder",
          subtitle:
            "Economize tempo e dinheiro com as melhores ofertas em nosso aplicativo de comparação de preços de produtos e supermercados.",
        },
        {
          backgroundColor: "#CBDAFF",
          image: <Image source={require("../../assets/onboarding2.png")} />,
          title: "Descubra as melhores ofertas com o PriceFinder",
          subtitle:
            "Nosso aplicativo te ajuda a encontrar as melhores ofertas de produtos e supermercados próximos a você.",
        },
        {
          image: <Image source={require("../../assets/onboarding3.png")} />,
          backgroundColor: "#407BFF",
          title: "Comece a economizar agora mesmo!",
          subtitle:
            "Com nosso aplicativo, além de encontrar seus produtos com rapidez e eficâcia, você vai conseguir economizar nas suas compras.",
        },
      ]}
    />
  );
};

export default OnboardingScreen;
