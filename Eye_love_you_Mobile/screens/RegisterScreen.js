import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Image, Modal } from 'react-native';
import { register_style, styles } from '../styles/Css.js';
import CustomButton from '../styles/CustomButton';
import Postcode from '@actbase/react-daum-postcode';

const RegisterScreen = ({ navigation }) => {
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');
  const [inputNName, setInputNName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputAddr, setInputAddr] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedPostcode, setSelectedPostcode] = useState('');


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddressSelect = (data) => {
    setSelectedAddress(data.address);
    setSelectedPostcode(data.zonecode);
    toggleModal();
  };

  const onClickRegistser = async () => {
    console.log(inputId, inputPw, inputNName, inputEmail, selectedAddress)
    try {
      const response = await fetch('172.29.49.228:8080/signup', {
        // PC작업 http://192.168.25.33:8080/signup
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
          userId: inputId,
          password: inputPw,
          name: inputNName,
          email: inputEmail,
          homeAddress: selectedAddress
        }),
      });
      const data = await response.text(); // 서버에서 반환된 텍스트 데이터를 가져옴
      console.log(data)
      if (data === '성공') {
        console.log('회원가입 성공')
        navigation.replace('Login');
      } else {
        alert();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputId = (text) => {
    setInputId(text);
  };

  const handleInputPw = (text) => {
    setInputPw(text);
  };

  const handleInputNName = (text) => {
    setInputNName(text);
  };

  const handleInputEmail = (text) => {
    setInputEmail(text);
  };

  const handleInputAddr = (text) => {
    setInputAddr(text);
  };


  return (
    <View style={register_style.container}>
      <Modal style={register_style.modal}
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <Postcode
          style={{
            flex: 1,
            width: '100%',
            margin: 'auto'
          }}
          onSelected={(data) => handleAddressSelect(data)}
        />
      </Modal>
      <ScrollView style={register_style.scroll_view}>
        <View style={register_style.top_content}>
          <Image
            source={require('../assets/imgs/register_il.png')}
            style={register_style.image}
          />
        </View>
        <View style={register_style.detail_content}>
          <Text style={register_style.login_text}>회원 가입</Text>
          <View style={register_style.input_Box}>
            <Text style={register_style.input_text}>
              아이디
            </Text>
            <TextInput
              style={register_style.input}
              onChangeText={handleInputId}
              value={inputId}
            />
          </View>
          <View style={register_style.input_Box}>
            <Text style={register_style.input_text}>
              비밀번호
            </Text>
            <TextInput
              style={register_style.input}
              onChangeText={handleInputPw}
              value={inputPw}
              secureTextEntry={true}
            />
          </View>
          <View style={register_style.input_Box}>
            <Text style={register_style.input_text}>
              닉네임
            </Text>
            <Text style={register_style.input_text_sub}>
              닉네임은 회원정보로 표기됩니다
            </Text>
            <TextInput
              style={register_style.input}
              onChangeText={handleInputNName}
              value={inputNName}
            />
          </View>
          <View style={register_style.input_Box}>
            <Text style={register_style.input_text}>
              이메일
            </Text>
            <TextInput
              style={register_style.input}
              onChangeText={handleInputEmail}
              value={inputEmail}
            />
          </View>
          <View style={register_style.address_Box}>
            <Text style={register_style.input_text}>
              주소
            </Text>
            <Text style={register_style.input_text_sub}>
              주소는 내 주변 안과 찾기에서 사용됩니다
            </Text>
            <CustomButton
              title="주소 검색하기"
              style={register_style.address_button}
              textStyle={register_style.address_button_text}
              onPress={toggleModal} />
            <TextInput
              style={register_style.input}
              onChangeText={(text) => setSelectedAddress(text)} // 선택한 주소를 변경할 때 필요한 경우
              value={selectedAddress}
              placeholder="주소"
            />
            <TextInput
              style={register_style.input}
              value={selectedPostcode}
              placeholder="우편 번호"
            />
            <TextInput
              style={register_style.input}
              placeholder="상세 주소"
            />
          </View>
          <CustomButton title="회원가입"
            style={register_style.button}
            textStyle={register_style.button_text}
            onPress={onClickRegistser} />
        </View>
        <View style={{ marginTop: 30, }} />
      </ScrollView>
    </View>
  );

}

export default RegisterScreen;
