import React from 'react'
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import Menu_Light from '../../assets/icons/menu_light.png';
import Menu_Dark from '../../assets/icons/menu_dark.png';
import { useColors } from '../util/hooks';
import { widthToDp, heightToDp } from '../themes/fontsManager';

const { width, height } = Dimensions.get('screen');
const ScreenHeader = (props) => {
    const { colors, dark } = useColors();
    const { toggleDrawer, hideImage } = props;
    return (
        <View style={{
            height: height * 0.08,
            flexDirection: 'row',
            width: width
        }}>
            <TouchableOpacity style={{ flex: 0.2 }} onPress={props.toggleDrawer}>
                <Image 
                    source={dark ? Menu_Dark : Menu_Light}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            <View style={{ flex: 0.7 }}></View>
            <View style={{ flex: 0.2, marginRight: 10 }}>
                {(typeof hideImage === "undefined") && (
                    <View style={styles.CircleImage}>
                        <Image
                            source={{ uri: 'https://thumbs.dreamstime.com/b/close-up-portrait-nice-person-bristle-show-finger-okey-sign-isolated-pink-color-background-203466939.jpg' }}
                            style={styles.ImageStyles}
                        />
                    </View>
                )}
            </View>
        </View>
    )
}

export default ScreenHeader;

const styles = StyleSheet.create({
    CircleImage: {
        width: widthToDp(13),
        height: widthToDp(13),
        borderRadius: 300,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: 'gray'    
    },
    ImageStyles: {
        width: '100%',
        height: '100%',
        borderRadius: widthToDp('100%') / 2,
        borderWidth: 3,
    }
});
