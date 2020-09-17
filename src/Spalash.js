import React, { Component } from 'react';
import {View, StyleSheet, Animated, Image } from 'react-native';

import Logo from './../assets/images/header_image.png';



class Spalash extends Component {

    state = {
        LogoAnimate: new Animated.Value(0),
        LogoText: new Animated.Value(0),
        SimpleText: new Animated.Value(0),
        loadingSpinner: false,
    };


    componentDidMount() {

        const { LogoAnimate, LogoText, SimpleText } = this.state;
        Animated.parallel([
            Animated.spring(LogoAnimate, {
                toValue: 1,
                tension: 8,
                friction: 1.13,
                duration: 2500,
            }).start(),

            
        ]).start(() => {
            this.timeOut = setTimeout(() => this.props.navigation.navigate('Second'), 1900);
        });
    }
    componentWillUnmount() {
        clearTimeout(this.timeOut);
    }

    switchToPage = () => {
        this.props.navigation.navigate('Second');
    };

    render() {
        return (
            <View style={styles.container}>
                <Animated.View
                    style={{
                        opacity: this.state.LogoAnimate,
                        top: this.state.LogoAnimate.interpolate({
                            inputRange: [0, 1],
                            outputRange: [80, 0]
                        }),
                    }}
                >
                    <Image style={styles.image} source={Logo} />
                </Animated.View>
                <Animated.View style={{
                    opacity: this.state.LogoText,
                }}
                >
                </Animated.View>
                <Animated.View style={{
                    opacity: this.state.SimpleText,
                }}
                >
                </Animated.View>
            </View>
        );
    }
}

export default Spalash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        color: '#002A25',
        fontSize: 30,
        marginTop: 1.1,
        fontWeight: '300',
    },
    simpleText: {
        color: '#002A25',
        fontSize: 17,
        marginTop: 1.1,
        fontWeight: '300',
    },
    image: {
        height: 400,
        width: 260,
        resizeMode: 'center',
    },
});