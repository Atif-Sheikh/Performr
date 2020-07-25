import React from 'react';
import { ActivityIndicator } from 'react-native';

export default function Loader({ size, color }) {
    return (
        <ActivityIndicator size={size || "large"} color={color || "#1d7488"} />
    );
};
