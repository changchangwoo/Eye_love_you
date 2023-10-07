// FontLoader.js

import React, { useEffect, useState } from 'react';
import LoadingScreen from '../screens/LoadingScreen';
import * as Font from 'expo-font';

const FontLoader = ({ children }) => {
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        async function loadCustomFont() {
            await Font.loadAsync({
                'FONT_LIGHT': require('../assets/fonts/NotoSansKR-Light.ttf'),
                'FONT_MEDIUM': require('../assets/fonts/NotoSansKR-Medium.ttf'),
                'FONT_BOLD': require('../assets/fonts/NotoSansKR-Bold.ttf'),
            });
            setFontLoaded(true);
        }

        loadCustomFont();
    }, []);

    if (!fontLoaded) {
        // 폰트가 로드되지 않았을 때 로딩 화면 등을 표시할 수 있습니다.
        return <LoadingScreen />
    }

    return <>{children}</>
};

export default FontLoader;
