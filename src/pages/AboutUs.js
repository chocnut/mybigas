import React from 'react';
import AnimationRevealPage from 'helpers/AnimationRevealPage.js';
import tw from 'twin.macro';
import styled from 'styled-components'; //eslint-disable-line
import {css} from 'styled-components/macro'; //eslint-disable-line
import Header from 'components/headers/light.js';
import Footer from 'components/footers/FiveColumnWithInputForm.js';
import MainFeature1 from 'components/features/TwoColWithButton.js';
// import MainFeature2 from "components/features/TwoColSingleFeatureWithStats.js";
// import MainFeature3 from "components/features/TwoColSingleFeatureWithStats2.js";
import Features from 'components/features/ThreeColSimple.js';
// import Features from "components/features/ThreeColWithSideImage.js";
import TeamCardGrid from 'components/cards/ProfileThreeColGrid.js';

import SupportIconImage from 'images/support-icon.svg';
import ShieldIconImage from 'images/shield-icon.svg';
import CustomerLoveIconImage from 'images/simple-icon.svg';

const Subheading = tw.span`uppercase tracking-wider text-sm`;
export default () => {
  return (
    <AnimationRevealPage>
      <Header />
      <MainFeature1
        subheading={<Subheading>About MyBigas</Subheading>}
        heading='We are a modern online rice retailing business.'
        buttonRounded={false}
        primaryButtonText='See Products'
        primaryButtonUrl='/'
        description=''
        imageSrc='https://images.pexels.com/photos/164504/pexels-photo-164504.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
      />
      <Footer />
    </AnimationRevealPage>
  );
};
