import React, {useEffect, useRef, useState} from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import AnimationRevealPage from 'helpers/AnimationRevealPage.js';
import {useRouteMatch} from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import {css} from 'styled-components/macro';
import {ReactComponent as SvgDotPatternIcon} from '../images/dot-pattern.svg';
import Header from 'components/headers/light.js';
import Footer from 'components/footers/FiveColumnWithInputForm.js';

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-primary-500 text-gray-100 rounded-lg relative`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }
  input,
  textarea {
    ${tw`w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 text-gray-100 hocus:border-pink-400 focus:outline-none transition duration-200`};

    ::placeholder {
      ${tw`text-gray-500`}
    }
  }
`;

const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const Input = tw.input``;
const Select = tw.select`block bg-white appearance-none w-full py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`;
const Option = tw.option``;
const TextArea = tw.textarea`h-24 sm:h-full resize-none`;
const SubmitButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;

const SvgDotPattern1 = tw(
  SvgDotPatternIcon
)`absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 -z-10 opacity-50 text-primary-500 fill-current w-24`;

const SuccessContainer = tw.div`bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md`;

export default () => {
  const match = useRouteMatch();
  const {id} = match.params;
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [riceTypeId, setRiceTypeId] = useState(id);
  const [quantity, setQuantity] = useState(1);
  const [phone, setPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(undefined);
  const [isError, setIsError] = useState(undefined);
  const db = useRef(null);

  useEffect(() => {
    /* eslint no-undef:0 */
    const firebaseConfig = {
      apiKey: 'AIzaSyBkiu3y62-TfrEPmGCiclUo7QxxOcJoAD4',
      authDomain: 'mybigasco.firebaseapp.com',
      databaseURL: 'https://mybigasco.firebaseio.com',
      projectId: 'mybigasco',
      storageBucket: 'mybigasco.appspot.com',
      messagingSenderId: '992438513266',
      appId: '1:992438513266:web:7f7fc22e645c001f2bdceb',
      measurementId: 'G-FKG0J1EDJ7',
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    const fireStore = firebase.firestore();
    db.current = fireStore.collection('orders');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, Math.random(10).toString());

      await db.current.doc().set({
        fullName,
        email,
        deliveryAddress,
        riceTypeId,
        quantity,
        phone,
      });
      setFullName('');
      setEmail('');
      setDeliveryAddress('');
      setRiceTypeId('');
      setQuantity('');
      setPhone('');
      setIsSuccess(true);
    } catch (e) {
      setIsError(true);
    }
  };

  return (
    <>
      <AnimationRevealPage>
        <Header />
        <Container>
          <Content>
            <FormContainer>
              {isSuccess && (
                <SuccessContainer role='alert'>
                  <div tw='flex'>
                    <div tw='py-1'>
                      <svg
                        tw='fill-current h-6 w-6 text-teal-500 mr-4'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                      >
                        <path d='M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z' />
                      </svg>
                    </div>
                    <div>
                      <p tw='font-bold'>Order Successfully Placed</p>
                      <p tw='text-sm'>
                        We will contact you soon for verification.
                      </p>
                    </div>
                  </div>
                </SuccessContainer>
              )}
              {isError && (
                <div
                  tw='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
                  role='alert'
                >
                  <strong tw='font-bold'>Holy smokes! &nbsp;</strong>
                  <span tw='block sm:inline'>
                    Something seriously bad happened.
                  </span>
                </div>
              )}
              <div tw='mx-auto max-w-4xl' style={{marginTop: 10}}>
                <h2>Order Form</h2>
                <form onSubmit={handleSubmit}>
                  <TwoColumn>
                    <Column>
                      <InputContainer>
                        <Label htmlFor='name-input'>Your Name</Label>
                        <Input
                          id='name-input'
                          type='text'
                          name='fullName'
                          placeholder='E.g. Juan Dela Cruz'
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </InputContainer>
                      <InputContainer>
                        <Label htmlFor='email-input'>Your Email Address</Label>
                        <Input
                          id='email-input'
                          type='email'
                          name='email'
                          placeholder='E.g. juandelacruz@gmail.com'
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </InputContainer>
                      <InputContainer>
                        <Label htmlFor='email-input'>
                          Your Delivery Address
                        </Label>
                        <Input
                          id='delivery-address-input'
                          type='text'
                          name='delivery_address'
                          placeholder='E.g. Susano Rd, Caloocan'
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                        />
                      </InputContainer>
                    </Column>
                    <Column>
                      <InputContainer>
                        <Label htmlFor='name-input'>Rice</Label>
                        <Select
                          id='rice-input'
                          name='rice'
                          style={{color: '#000'}}
                          value={riceTypeId}
                          onChange={(e) => setRiceTypeId(e.target.value)}
                        >
                          <Option value='1'>Dinurado Mindoro (25kg)</Option>
                          <Option value='2'>Hobi Denorado (25kg)</Option>
                          <Option value='3'>Super Angelica (25kg)</Option>
                          <Option value='4'>Jasmine (25kg)</Option>
                          <Option value='5'>Sakura (25kg)</Option>
                          <Option value='6'>Blueberry (50kg)</Option>
                          <Option value='7'>Sweet Hasmine (50kg)</Option>
                          <Option value='8'>Coco Pandan (25kg)</Option>
                          <Option value='9'>Lotus Blossoms (50kg)</Option>
                          <Option value='10'>Super Sinandomeng (50kg)</Option>
                          <Option value='11'>Lady Angelica (50kg)</Option>
                        </Select>
                      </InputContainer>
                      <InputContainer>
                        <Label htmlFor='name-input'>How Many?</Label>
                        <Select
                          id='quantity-select'
                          name='quantity'
                          style={{color: '#000'}}
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        >
                          <Option value='1'>1</Option>
                          <Option value='2'>2</Option>
                          <Option value='3'>3</Option>
                          <Option value='4'>4</Option>
                          <Option value='5'>5</Option>
                          <Option value='6'>6</Option>
                          <Option value='7'>7</Option>
                          <Option value='8'>8</Option>
                          <Option value='9'>9</Option>
                          <Option value='10'>10</Option>
                        </Select>
                      </InputContainer>
                      <InputContainer>
                        <Label htmlFor='email-input'>Your Mobile Number</Label>
                        <Input
                          id='email-input'
                          type='tel'
                          name='phone'
                          placeholder='E.g. 09123456789'
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </InputContainer>
                    </Column>
                  </TwoColumn>
                  <SubmitButton type='submit' value='Submit'>
                    Submit
                  </SubmitButton>
                </form>
              </div>
              <SvgDotPattern1 />
            </FormContainer>
          </Content>
        </Container>
        <Footer />
      </AnimationRevealPage>
    </>
  );
};
