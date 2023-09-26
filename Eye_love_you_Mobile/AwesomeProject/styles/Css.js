import { StyleSheet,   StatusBar,
} from 'react-native';

export const styles = StyleSheet.create({
    loading_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FBE3F0'
    },
    loading_text: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'NEXON Lv2 Gothic Medium'
    },
    footer: {
        width: '100%',
        height: '10%',
        backgroundColor: '#2F2E41',
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
        marginTop: 30
    }
});

export const splash_style = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FBE3F0',
    },
    logoSubText: {
        fontSize: 30,
        fontFamily: 'FONT_LIGHT',
        lineHeight: 70,
    },
    logoText: {
        fontSize: 45,
        textAlign: 'center',
        fontFamily: 'FONT_BOLD',
        lineHeight: 50
    },
});

export const login_style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: StatusBar.currentHeight,
    },
    top_content: {
        width: '100%',
        height: 280,
        backgroundColor: '#FBE3F0',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    detail_content: {
        width: '100%',
        height: '60%',
        alignItems: 'center',
    },
    image: {
        width: '90%',
        height: '60%',
        resizeMode: 'contain',
    },
    login_text: {
        fontSize: 40,
        fontFamily: 'FONT_BOLD',
        marginVertical: 10, // 수직 여백 조절
    },
    input: {
        width: '70%',
        height: 40,
        fontSize: 15,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 10, // 수직 여백 조절
        textAlign: 'center'
    },
    custom_marginTop: {
        marginTop: 15
    },
    button: {
        fontSize: 20,
        marginTop: 10,
        width: '70%',
        height: 50,
        borderRadius: 10
    },
    registerbutton: {
        marginTop: 30,
        backgroundColor: '#2F2E41',
        width: '70%',
        height: 40,
        borderRadius: 10
    },
    button_text: {
        fontFamily: 'FONT_BOLD',
        fontSize: 15
    },
    registerbutton_text: {
        color: 'white',
        fontSize: 13,
        fontFamily: 'FONT_LIGHT'
    }
});

export const register_style = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        flexGrow: 1

    },
    scroll_view: {
        width: '100%',
        flex: 1
    },
    top_content: {
        backgroundColor: '#FBE3F0',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        height: 280,
    },
    detail_content: {
        alignItems: 'center',
    },
    image: {
        width: '90%',
        height: 250,
        resizeMode: 'contain',
    },
    login_text: {
        fontSize: 40,
        fontFamily: 'FONT_BOLD',
        marginVertical: 0, // 수직 여백 조절
    },
    input_Box: {
        width: '100%',
        alignItems: 'center',
        height: 100,
        marginBottom: 10

    },
    address_Box: {
        width: '100%',
        alignItems: 'center',
        height: 250,
    },
    input_text : {
        fontFamily: 'FONT_BOLD',
        textAlign: 'left',
        fontSize: 15,
        width: '70%',
    },
    input_text_sub : {
        fontFamily: 'FONT_MEDIUM',
        textAlign: 'left',
        fontSize: 13,
        width: '70%',
        color: 'grey',
        marginVertical: -15, // 수직 여백 조절
        marginBottom: 0

    },
    input: {
        width: '70%',
        height: 40,
        fontSize: 12,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,// 수직 여백 조절
        textAlign: 'center',
        marginBottom: 10
    },
    custom_marginTop: {
        marginTop: 15
    },
    button: {
        fontSize: 20,
        marginTop: 100,
        width: '70%',
        height: 50,
        borderRadius: 10,

    },
    button_text: {
        fontFamily: 'FONT_BOLD',
        fontSize: 15,
    },
    address_button: {
        width: '70%',
        height: 50,
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: '#2F2E41',
        marginBottom: 30

    },
    address_button_text : {
        color: 'white',
        fontFamily: 'FONT_LIGHT',
        lineHeight: 50,
        textAlign: 'center',
        fontSize: 15,

    },
    modal : {
        width: '100%',
        height: '100%',
    }
});

export const main_style = StyleSheet.create({
    container: {
        backgroundColor: '#F8F9FA',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    },
    content_box_1: {
        width: '100%',
        height: 150,
        margin: 'auto',
        alignItems: 'center', // 텍스트를 가운데 정렬하기 위해 추가
        justifyContent: 'center', // 텍스트를 가운데 정렬하기 위해 추가
        backgroundColor: '#FBE3F0',
        borderRadius: 40,
        marginBottom: 20
    },
    content_box_2: {
        width: '100%',
        height: 150,
        backgroundColor: 'white',
        borderRadius: 40,
        alignItems: 'center', // 텍스트를 가운데 정렬하기 위해 추가
        justifyContent: 'center', // 텍스트를 가운데 정렬하기 위해 추가
        marginBottom: 20,
        border: '1px solid'

    },
    content_box_3: {
        width: '100%',
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FBE3F0',
        borderRadius: 40,
        marginBottom: 20,
    },
    image: {
        margin: 'auto',
        resizeMode: 'contain',
        width: '40%',
        height: 200
    },
    textContainer: {
        position: 'absolute',
        top: 10, // 텍스트의 위치를 조절합니다. 원하는 위치로 수정 가능
        left: 0,
        right: 0,
        alignItems: 'center', // 가로 중앙 정렬
    },
    text: {
        fontSize: 20,
        fontFamily: 'FONT_MEDIUM',
    },
    scroll_view: {
        width: '100%',
        flex: 1,
    },
    main_logo: {
        width: '100%',
        height: 300,
        backgroundColor: '#FFB3D2',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        marginBottom: 20,
        alignItems: 'center',
    },
    logoSubText: {
        marginTop: 50,
        fontSize: 20,
        fontFamily: 'FONT_LIGHT',
        lineHeight: 30,
    },
    logoText: {
        fontSize: 35,
        textAlign: 'center',
        fontFamily: 'FONT_BOLD',
        lineHeight: 50
    },
});
