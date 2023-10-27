import {
    StyleSheet, StatusBar,
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
        fontFamily: 'FONT_LIGHT'
    },
    footer: {
        width: '100%',
        height: 100,
        backgroundColor: '#2F2E41',
        color: 'white',
        lineHeight: 30,
        textAlign: 'center',
        fontSize: 14,
        marginTop: 30,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35
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
    input_text: {
        fontFamily: 'FONT_BOLD',
        textAlign: 'left',
        fontSize: 15,
        width: '70%',
    },
    input_text_sub: {
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
    address_button_text: {
        color: 'white',
        fontFamily: 'FONT_LIGHT',
        lineHeight: 50,
        textAlign: 'center',
        fontSize: 15,

    },
    modal: {
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
        marginBottom: 20

    },
    content_box_2: {
        width: '100%',
        height: 150,
        backgroundColor: 'white',
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
        fontFamily: 'FONT_BOLD',
    },
    sub_text: {
        fontSize: 14,
        fontFamily: 'FONT_LIGHT',
        textAlign: 'center'
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
    address_button: {
        width: '40%',
        height: 50,
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: '#2F2E41',
        marginBottom: 30
    },
    address_button_text: {
        color: 'white',
        fontFamily: 'FONT_LIGHT',
        lineHeight: 50,
        textAlign: 'center',
        fontSize: 15,
    },
    description_text: {
        color: 'grey',
        textAlign: 'center',
        marginBottom: 15,
        fontFamily: 'FONT_MEDIUM'
    }
});

export const blink_style = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FBE3F0',
        height: '100%'

    },
    camera: {
        width: '100%',
        height: '50%',
    },
    processcheck: {
        fontSize: 20,
        fontFamily: 'FONT_LIGHT',
        textAlign: 'center',
        marginTop: 20,
        color: 'green'
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    notify_view: {
        width: '80%',
        height: '100%',
    },
    main_logo: {
        marginTop: 20,
        width: '100%',
        height: '30%',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 45,
        textAlign: 'center',
        fontFamily: 'FONT_BOLD',
    },
    logoSubText: {
        fontSize: 20,
        fontFamily: 'FONT_MEDIUM',
        lineHeight: 25,
        textAlign: 'center'
    },
    textBox: {
        width: '100%',
        height: '40%',
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        padding: 10,
        marginTop: 20,
        justifyContent: 'center',
    },
    notify_text: {
        fontFamily: 'FONT_LIGHT',
        fontSize: 15,
        textAlign: 'center',

    },
    start_button: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        backgroundColor: '#2F2E41',
        marginVertical: 40, // 수직 여백 조절
    },
    start_button_text: {
        color: 'white',
        fontFamily: 'FONT_LIGHT',
        lineHeight: 50,
        textAlign: 'center',
        fontSize: 15,
    },
    button_container: {
        width: '90%',
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 25
    },
    stop_button: {
        width: '48%',
        height: 80,
        borderRadius: 10,
        backgroundColor: '#FFB3D2',
    },
    stop_button_text: {
        fontFamily: 'FONT_MEDIUM',
        lineHeight: 50,
        textAlign: 'center',
        fontSize: 15,
    },
    pause_button: {
        width: '48%',
        height: 80,
        borderRadius: 10,
        backgroundColor: '#C5D3A3',
    },
    pause_button_text: {
        fontFamily: 'FONT_MEDIUM',
        lineHeight: 50,
        textAlign: 'center',
        fontSize: 15,
    },
    resume_button: {
        width: '48%',
        height: 80,
        borderRadius: 10,
        backgroundColor: '#AFDEFF',
    },
    description_text: {
        color: 'grey',
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: 'FONT_MEDIUM'
    },
    pause_container: {
        width: '80%',
        height: '50%',
        alignItems: 'center'
    },
    message: {
        fontSize: 20,
        fontFamily: 'FONT_BOLD'
    },
    data_container: {
        marginVertical: 20,
        width: '90%',
        height: '15%',
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        flexDirection: 'row',
    },
    data_container_1: {
        width: '20%',
        height: '100%',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20
    },
    data_container_2: {
        flexDirection: 'column',
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
    },
    data_container_3: {
        width: '20%',
        height: '100%',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20
    },
    data_text: {
        fontFamily: 'FONT_LIGHT',
        flexDirection: 'column',
        height: 30,
    },
    end_container: {
        width: '80%',
        height: '90%',
        alignItems: 'center'
    },
    end_logo: {
        fontSize: 30,
        fontFamily: 'FONT_BOLD'
    },
    end_text: {
        fontFamily: 'FONT_LIGHT',
        fontSize: 17,
        textAlign: 'center'
    }
});

export const result_style = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FBE3F0',
        height: '100%'

    },
    chart_container: {
        alignItems: 'center',
        width: '100%',
        height: '75%',
    },
    end_logo: {
        fontSize: 25,
        fontFamily: 'FONT_BOLD',
        textAlign: 'center'
    },
    description_text: {
        color: 'grey',
        textAlign: 'center',
        fontFamily: 'FONT_MEDIUM'
    },
    data_chart: {
        width: '100%',
        fontSize: 20,
        alignItems: 'center',
        flex: 1,
        borderRadius: 30,
        margin: 20,
        backgroundColor: 'white',
        padding: 10
    },
    chart_name: {
        width: '100%',
        height: '15%',
    },
    chart_name_text: {
        fontFamily: 'FONT_MEDIUM',
        fontSize: 25,
        textAlign: 'center',
        alignItems: 'center',

    },
    chart_data: {
        width: '100%',
        height: '60%',
        alignItems: 'center',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chart_descript: {
        width: '100%',
        height: '25%',
        textAlign: 'center',
    },
    chart_descript_text: {
        fontFamily: 'FONT_LIGHT',
        fontSize: 15,
        textAlign: 'center'
    },
    rank_chart: {
        width: '100%',
        fontSize: 20,
        alignItems: 'center',
        flex: 1,
        borderRadius: 30,
        margin: 20,
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rank_Text_sub: {
        fontSize: 20,
        fontFamily: 'FONT_LIGHT',
        textAlign: 'center',
        lineHeight: 30,
        marginTop: 40

    },
    rank_Text: {
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'FONT_BOLD',
        lineHeight: 40
    },
    rank_content: {
        alignItems: 'center',
        width: '100%',
        marginVertical: 20
    },
    rank_descript: {
        fontFamily: 'FONT_LIGHT',
        fontSize: 15,
        textAlign: 'center'

    },
    rank_descript2: {
        fontFamily: 'FONT_MEDIUM',
        fontSize: 17,
        textAlign: 'center',
    }
    ,
    address_button: {
        width: '70%',
        height: 50,
        borderRadius: 10,
        backgroundColor: '#2F2E41',
        marginBottom: 40
    },
    address_button_text: {
        color: 'white',
        fontFamily: 'FONT_LIGHT',
        lineHeight: 50,
        textAlign: 'center',
        fontSize: 15,

    },
});

export const map_style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FBE3F0',
    },
    map: {
        width: '100%',
        height: '100%',

    },
    map_title: {
        width: '100%',
        height: '6%',
        position: 'absolute',
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    map_title_font: {
        fontSize: 15,
        fontFamily: 'FONT_LIGHT',
        height: '100%',
        borderRadius: 10,
        marginTop: 20,
        width: '70%',
        textAlign: 'center',
        backgroundColor: 'rgba(251, 227, 240, 0.9)'
    },
    description: {
        width: '100%',
        height: '45%',
        backgroundColor: 'blue',
        borderRadius: 10,
        marginTop: '100%',
        zIndex: 1,
        position: 'absolute',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(251, 227, 240, 0.8)',

    },
    webview_style: {
        flex: 1,
    },
});

export const share_style = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FBE3F0',
        height: '100%'
    },
    share_box: {
        marginTop: 20,
        alignItems: 'center',
        width: '90%',
        height: '90%',
        backgroundColor: 'white',
        borderRadius: 20
    },
    share_title: {
        height: 50,
        width: '100%',
        marginTop: 20,
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'FONT_LIGHT',
        textAlign: 'center',
        lineHeight: 30,
        marginTop: 40
    },
    share_main: {
        height: '45%',
        width: '100%',
        padding: 20,
        display: 'flex',
        flexDirection: 'row'
    },
    share_main_left_box: {
        flex: 1,
    },
    share_main_right_box: {
        flex: 1,
    },
    share_main_text: {
        fontSize: 20,
        fontFamily: 'FONT_LIGHT',
        textAlign: 'center',
    },
    share_main_text_num: {
        fontSize: 20,
        fontFamily: 'FONT_MEDIUM',
        textAlign: 'center'
    }
});