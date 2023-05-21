import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';

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
          backgroundColor: '#fff',
          title: 'Bem-vindo(a) ao PriceFinder',
          subtitle: 'O seu aplicativo de comparação e cadastro de preços de produtos e supermercados! Aqui você encontrará as melhores ofertas e poderá economizar tempo e dinheiro nas suas compras.',
        },
        {
          backgroundColor: '#fe6e58',
          title: 'Onboarding 2',
          subtitle: 'Descrição detalhada para a segunda tela de boas-vindas.',
        },
        {
          backgroundColor: '#999',
          title: 'Onboarding 3',
          subtitle: 'Descrição detalhada para a terceira tela de boas-vindas.',
        },
      ]}
    />
  );
}

export default OnboardingScreen;