//Mobile App Devt (CIT2269) Assignment 2
//author: Razel Ventura, s0541328
//date: 2024-02-12
//App.js
//brief: This is the main page that shows the entire game. The timer, scoring, game over condition, and New Game/Give Up buttons are handled here. 

import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Button, Alert, Text, Image, TouchableOpacity } from 'react-native';
import MinesweeperBoard from './components/MinesweeperBoard';
import instructionsText from './components/Instructions';

const difficulties = {
    easy: { gridSize: 3, mineCount: 1 },
    intermediate: { gridSize: 4, mineCount: 2 },
    difficult: { gridSize: 5, mineCount: 3 },
};

const minesweptLogo = require('./assets/minesweptLogo.png');

const App = () => {
    const [difficulty, setDifficulty] = useState('easy');
    const [key, setKey] = useState(0);
    const [timer, setTimer] = useState(0);
    const [baseTimeScore, setBaseTimeScore] = useState(500);
    const [revealScore, setRevealScore] = useState(0);
    const [finalScore, setFinalScore] = useState(0);
    const timerRef = useRef(null);
    const [highScore, setHighScore] = useState(0);
    const showInstructions = () => {
        Alert.alert("Instructions", instructionsText, [{ text: "OK" }]);
    };
    const [revealMines, setRevealMines] = useState(false);

    useEffect(() => {
        return () => stopTimer();
    }, []);

    const startTimer = () => {
        if (timerRef.current !== null) return;
        setTimer(0);
        timerRef.current = setInterval(() => {
            setTimer(t => t + 1);
            setBaseTimeScore(score => score - 1 * difficulties[difficulty].mineCount);
        }, 1000);
    };

    const stopTimer = () => {
        if (timerRef.current !== null) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const updateScoreForReveal = () => {
        setRevealScore(currentScore => currentScore + 10 * difficulties[difficulty].mineCount);
    };

    const handleGameOver = (result) => {
        stopTimer(); // Stop the timer when the game is over
        setRevealMines(true);
        let final = baseTimeScore + revealScore; // Calculate final score
        setFinalScore(final);

        let message = '';
        if (result === 'win') {
            // Check if the final score is higher than the high score
            if (final > highScore) {
                setHighScore(final);
                message = `Congratulations, you won! New high score: ${final}`;
            } else {
                message = `Congratulations, you won! Score: ${final}`;
            }
        } else if (result === 'lose') {
            if (final > highScore) {
                setHighScore(final);
                message = `You hit a mine! But you set a new high score: ${final}`;
            } else {
                message = `You hit a mine! Score: ${final}`;
            }
        }

        Alert.alert('Game Over', message, [{ text: 'OK', onPress: newGame }]);
    };

    const giveUp = () => {
        stopTimer();
        setRevealMines(true);
        let final = baseTimeScore + revealScore; // Calculate final score upon giving up
        setFinalScore(final);
        if (final > highScore) {
            setHighScore(final);
            Alert.alert('Game Over', `You gave up but you set a new high score: ${final}`, [{ text: 'OK', onPress: newGame }]);
        } else {
            Alert.alert('Game Over', `You gave up. Score: ${final}`, [{ text: 'OK', onPress: newGame }]);
        }
    };

    const newGame = () => {
        setKey(prevKey => prevKey + 1);
        setTimer(0); // Reset the timer
        setRevealMines(false);
        startTimer(); // Start the timer for the new game
        setBaseTimeScore(500); // Reset base score
        setRevealScore(0); // Reset reveal score
        // Note: High score is not reset unless tunnel is reset
    };

    const changeDifficulty = (newDifficulty) => {
        stopTimer(); // Stop the current timer
        setDifficulty(newDifficulty);
        newGame(); // Start a new game, which also resets scores but keeps high score
    };

    return (
        <View style={styles.container}>
            <Image style={{ height: 100 }}
                source={minesweptLogo}
                resizeMode="contain"
            />
            <Button title="How to Play Mines Wept" onPress={showInstructions} />
            <View style={styles.containerDifficulty}>
                <Button title="New Game" onPress={newGame} />
                <Text>   or   </Text>
                <Button title="Give Up" onPress={giveUp} />
            </View>
            <Text>Time (seconds): {timer}</Text>
            <Text> Mines: {difficulties[difficulty].mineCount} </Text>
            <Text> Current High Score: {highScore}</Text>

            <View style={styles.containerDifficulty}>
                {Object.keys(difficulties).map((level) => (
                    <TouchableOpacity
                        key={level}
                        style={[
                            styles.button,
                            difficulty === level ? styles.selectedButton : {}
                        ]}
                        onPress={() => changeDifficulty(level)}
                    >
                        <Text style={styles.buttonText}>{level}</Text>
                    </TouchableOpacity>
                ))}
            </View>


            <MinesweeperBoard
                key={key}
                gridSize={difficulties[difficulty].gridSize}
                mineCount={difficulties[difficulty].mineCount}
                onGameOver={handleGameOver}
                startTimer={startTimer}
                updateScoreForReveal={updateScoreForReveal}
                revealMines={revealMines}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    containerDifficulty: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        padding: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        margin: 5,
    },
    selectedButton: {
        backgroundColor: '#004c8c',
        padding: 10,
        borderRadius: 5,
        margin: 5,
        borderWidth: 2,
        borderColor: '#ffffff',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        alignItems: 'center',
    },
});

export default App