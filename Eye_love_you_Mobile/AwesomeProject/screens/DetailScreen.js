import React from 'react';
import { View, Text, Button } from 'react-native';

const DetailScreen = ({ navigation }) => {
    return (
        <View>
            <Text>디테일 화면</Text>
            <Button
                title="홈 화면으로 이동"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
};

export default DetailScreen;
