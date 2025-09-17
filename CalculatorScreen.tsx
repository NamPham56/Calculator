import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const CalculatorScreen = () => {
    const [input, setInput] = useState("")
    const [result, setResult] = useState("")

    const handlePress = (value: any) => {
        setInput(input + value)
    }

    const handleClear = () => {
        setInput(""),
            setResult("")
    }
    const handleDelete = () => {
        setInput(input.slice(0, -1))
    }

    const handleEqual = () => {
        try {
            const evalResult = eval(input)
            setResult(evalResult.toString())
        } catch (error) {
            setResult("Error")
        }
    }

    // value calculator
    const buttons = [
        ["AC", "DEL", "/", "*"],
        ["7", "8", "9", "-"],
        ["4", "5", "6", "+"],
        ["1", "2", "3", "="],
        ["0", ".", "(", ")"]
    ]
    return (
        <View style={styles.container}>
            <View style={styles.display}>
                <Text style={styles.inputText}>{input}</Text>
                <Text style={styles.resultText}>{result}</Text>
            </View>
            <View>
                {buttons.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((btn) => (
                            <TouchableOpacity
                                key={btn}
                                style={[styles.button,
                                btn === "=" && { backgroundColor: "#4CAF50" },
                                btn === "AC" && { backgroundColor: "#f44336" },
                                btn === "DEL" && { backgroundColor: "#ff9800" }]
                                }
                                onPress={() => {
                                    if (btn === "AC") {
                                        handleClear();
                                    }
                                    else if (btn === "DEL") {
                                        handleDelete()
                                    } else if (btn === "=") {
                                        handleEqual()
                                    } else handlePress(btn)
                                }
                                } >
                                <Text style={styles.btnText}>{btn}</Text>
                            </TouchableOpacity>
                        ))}

                    </View>
                ))}
            </View>
        </View>
    )
}

export default CalculatorScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        padding: 10,
        justifyContent: "flex-end"
    },
    display: {
        minHeight: 150,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        padding: 10
    },
    inputText: {
        fontSize: 32,
        color: "#fff"
    },
    resultText: {
        fontSize: 40,
        color: "#4CAF50",
        fontWeight: "bold"
    },
    keyboard: {
        marginBottom: 20
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5
    },
    button: {
        flex: 1,
        margin: 5,
        backgroundColor: "#333",
        paddingVertical: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    btnText: {
        fontSize: 24,
        color: "#fff"
    }
})