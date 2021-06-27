import { useMemo } from 'react';
import { useTheme, Theme } from '@react-navigation/native';

const getGlobalStyles = (props) => ({
    container: {
        flex: 1,
        backgroundColor: props.colors.backgroundColor,
    },
});

export function useColors() {
    const { colors, dark } = useTheme();
    return { colors, dark };
}   