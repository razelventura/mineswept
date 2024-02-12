//Mobile App Devt (CIT2269) Assignment 2
//author: Razel Ventura, s0541328
//date: 2024-02-12
//MinesweeperBoard.js
//brief: This component handles the board/grid, the placing of the mine, and the revealing of each cell.  

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Cell from './Cell';

const MinesweeperBoard = ({ gridSize, mineCount, onGameOver, startTimer, updateScoreForReveal, revealMines }) => {
    const [grid, setGrid] = useState([]);

    // Calculate cell size based on screen width and gridSize
    const screenWidth = Dimensions.get('window').width;
    const cellSize = (screenWidth - 4 * gridSize) / gridSize; // Grid fills the screen width

    const toggleFlag = (index) => {
        setGrid((prevGrid) => {
            return prevGrid.map((cell, i) => {
                if (i === index && !cell.isRevealed) { // Only toggle flag if it is not revealed
                    return { ...cell, isFlagged: !cell.isFlagged };
                }
                return cell;
            });
        });
    };


    const revealAllMines = () => {
        setGrid((currentGrid) =>
            currentGrid.map((cell) => ({
                ...cell,
                isRevealed: cell.isMine ? true : cell.isRevealed,
            }))
        );
    };

    useEffect(() => {
        if (revealMines) {
            revealAllMines();
        }
    }, [revealMines]);

    useEffect(() => {
        initializeGrid();
    }, [gridSize, mineCount]);

    const calculateAdjacentMines = (index, grid, gridSize) => {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        let mines = 0;

        // Directions to check for mines: top, top-right, right, bottom-right, bottom, bottom-left, left, top-left
        const directions = [
            [-1, 0], [-1, 1], [0, 1], [1, 1],
            [1, 0], [1, -1], [0, -1], [-1, -1],
        ];

        directions.forEach(([dRow, dCol]) => {
            const newRow = row + dRow;
            const newCol = col + dCol;
            const newIndex = newRow * gridSize + newCol;
            if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize && grid[newIndex].isMine) {
                mines++;
            }
        });

        return mines;
    };

    const initializeGrid = () => {
        let newGrid = Array.from({ length: gridSize * gridSize }, (_, index) => ({
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            adjacentMines: 0,
        }));

        // Randomly place mines
        let minesPlaced = 0;
        while (minesPlaced < mineCount) {
            let randomIndex = Math.floor(Math.random() * gridSize * gridSize);
            if (!newGrid[randomIndex].isMine) {
                newGrid[randomIndex].isMine = true;
                minesPlaced++;
            }
        }

        // Calculate adjacent mines for each cell
        newGrid = newGrid.map((cell, index) => ({
            ...cell,
            adjacentMines: calculateAdjacentMines(index, newGrid, gridSize),
        }));

        setGrid(newGrid);
    };


    const revealCell = (index) => {
        let newGrid = [...grid];

        // Check if the cell is flagged using the index
        if (newGrid[index].isFlagged) {
            return; // Do not proceed if the cell is flagged
        }

        //Reveal cells if they are not flagged
        newGrid[index].isRevealed = true;
        setGrid(newGrid);

        // Check if revealed cell is a mine
        if (newGrid[index].isMine) {
            onGameOver('lose');
        } else {

            // If not a mine, update the score for revealing a safe cell
            updateScoreForReveal();

            // Check for win condition
            const nonMineCells = newGrid.filter(cell => !cell.isMine);
            const revealedNonMineCells = nonMineCells.filter(cell => cell.isRevealed);

            if (nonMineCells.length === revealedNonMineCells.length) {
                // Player wins: All non-mine cells are revealed
                onGameOver('win');
            }
        }
    };

    const renderGrid = () => {
        return grid.map((cell, index) => (
            <Cell
                key={index}
                isMine={cell.isMine}
                isRevealed={cell.isRevealed}
                onPress={() => !cell.isFlagged && revealCell(index)} // revealCell is only called if cell is not flagged
                onLongPress={() => toggleFlag(index)} // Handle long press for flagging
                size={cellSize}
                isFlagged={cell.isFlagged}
                adjacentMines={cell.adjacentMines} // adjacentMines are calculated when initializing the grid
            />
        ));
    };


    return (
        <View style={[styles.board, { width: screenWidth, height: screenWidth }]}>
            <View style={[styles.grid, { width: screenWidth, height: screenWidth }]}>
                {renderGrid()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    board: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MinesweeperBoard;