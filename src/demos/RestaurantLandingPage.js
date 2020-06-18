import React from 'react';
import tw from 'twin.macro';
import AnimationRevealPage from 'helpers/AnimationRevealPage.js';
import Hero from 'components/hero/TwoColumnWithVideo.js';
import TabGrid from 'components/cards/TabCardGrid.js';
import Footer from 'components/footers/FiveColumnWithInputForm.js';

export default () => {
  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
  const imageCss = tw`rounded-4xl`;

  return (
    <AnimationRevealPage>
      <Hero
        heading={
          <>
            Delicious & Affordable
            <HighlightedText>Rice Near You.</HighlightedText>
          </>
        }
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        imageSrc='https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
        imageCss={imageCss}
        imageDecoratorBlob={true}
        primaryButtonText='Order Now'
      />
      {/* TabGrid Component also accepts a tabs prop to customize the tabs and its content directly. Please open the TabGrid component file to see the structure of the tabs props.*/}
      <TabGrid
        heading={
          <>
            Checkout our <HighlightedText>rice.</HighlightedText>
          </>
        }
      />
      <Footer />
    </AnimationRevealPage>
  );
};
