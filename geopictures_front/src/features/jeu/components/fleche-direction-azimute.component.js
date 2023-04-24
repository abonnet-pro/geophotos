import React, { useState, useEffect } from 'react';
import { Image, View} from 'react-native';
import { Magnetometer } from 'expo-sensors';


export default function FlecheDirectionAzimute({ angleDiffByNord }) {

    const [subscription, setSubscription] = useState(null);
    const [magnetometer, setMagnetometer] = useState(0);

    useEffect(() => {
        _toggle();
        return () => {
            _unsubscribe();
        };
    }, []);

    const _toggle = () => {
        if (subscription) {
            _unsubscribe();
        } else {
            _subscribe();
        }
    };

    const _subscribe = () => {
        setSubscription(
            Magnetometer.addListener((data) => {
                setMagnetometer(_angle(data));
            })
        );
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    const _angle = (magnetometer) => {
        let angle = 0;
        if (magnetometer) {
            let { x, y, z } = magnetometer;
            if (Math.atan2(y, x) >= 0) {
                angle = Math.atan2(y, x) * (180 / Math.PI);
            } else {
                angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
            }
        }

        return Math.round(angle);
    };

    const _degree = (magnetometer) => {
        return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
    };

    return (
        <View>
            <Image source={require("../../../../assets/up-arrow.png")} style={{
                height: 100,
                width:100,
                marginLeft:'auto',
                marginRight:'auto',
                marginTop:'auto',
                marginBottom:'auto',
                alignItems: 'center',
                transform: [{ rotate: -(_degree(magnetometer - (angleDiffByNord ? angleDiffByNord : 0))) + 'deg' }]
            }} />
        </View>

    )
}
