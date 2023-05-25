import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import {View, Image, StyleSheet} from 'react-native';

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
          title: 'Seja bem vindo ao \n PriceFinder',
          subtitle: 'Economize tempo e dinheiro com as melhores ofertas em nosso aplicativo de comparação de preços de produtos e supermercados.',
        },
        {
          backgroundColor: '#CBDAFF',
          image: <Image
            source={require('../../assets/onboarding2.png')}
          />,
          title: 'Descubra as melhores ofertas com o PriceFinder',
          subtitle: 'Descrição detalhada para a segunda tela de boas-vindas.',
        },
        {
          backgroundColor: '#407BFF',
          title: 'Onboarding 3',
          subtitle: 'Descrição detalhada para a terceira tela de boas-vindas.',
        },
      ]}
    />
  );
}

export default OnboardingScreen;