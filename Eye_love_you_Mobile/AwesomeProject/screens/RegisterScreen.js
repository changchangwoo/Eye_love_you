import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Image } from 'react-native';
import { register_style, styles } from '../styles/Css.js';
import CustomButton from '../styles/CustomButton';

const RegisterScreen = ({ navigation }) => {
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');
  const [inputNName, setInputNName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputAddr, setInputAddr] = useState('');
  const [postcode, setPostcode] = useState('');
  const [address, setAddress] = useState('');

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
      <ScrollView style={register_style.scroll_view}>
        <View style={register_style.top_content}>
          <Image
            source={require('../assets/imgs/checking_il.png')}
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
          <View style={register_style.input_Box}>
            <Text style={register_style.input_text}>
              주소
            </Text>
            <TextInput
              style={register_style.input}
              onChangeText={handleInputAddr}
              value={inputAddr}
              placeholder="주소"
            />
            <TextInput
              style={register_style.input}
              placeholder="상세 주소"
            />
            <TextInput
              style={register_style.input}
              placeholder="우편번호"
            />
          </View>
          <View style= {{marginTop: 100,}}/>
          <CustomButton title="회원가입"
                    style={register_style.button}
                    textStyle={register_style.button_text}
                    onPress={register_style} />
        </View>
      </ScrollView>
    </View>
  );

}

export default RegisterScreen;
