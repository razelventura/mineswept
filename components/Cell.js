//Mobile App Devt (CIT2269) Assignment 2
//author: Razel Ventura, s0541328
//date: 2024-02-12
//Cell.js
//brief: This component handles the styling of each cell.  

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const Cell = ({ isMine, isRevealed, onPress, onLongPress, size, isFlagged, adjacentMines }) => {
    const cellStyle = {
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
        backgroundColor: isRevealed ? (isMine ? 'red' : 'green') : 'grey',
    };

    const getContent = () => {
        if (isFlagged) {
            return '🚩';
        }
        if (isRevealed) {
            if (isMine) {
                return '💥';
            } else if (adjacentMines > 0) {
                return '😯';
            } else {
                return '😃';
            }
        }
        return '';
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            onLongPress={isRevealed ? () => { } : onLongPress} // Ignore if revealed
            style={cellStyle}
            disabled={isRevealed} // Disable press if revealed
        >
            <Text style={styles.text}>{getContent()}</Text>
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        color: '#fff',
        textAlign: 'center',
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Cell;