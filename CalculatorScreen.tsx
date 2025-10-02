import { StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList } from 'react-native';
import React, { useState } from 'react';
import { evaluate, factorial } from 'mathjs';

const CalculatorScreen = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    const [history, setHistory] = useState<string[]>([]);   // Lưu lịch sử
    const [memory, setMemory] = useState<number | null>(null); // Bộ nhớ

    const handlePress = (value: string) => {
        setInput(input + value);
    };

    const handleClear = () => {
        setInput("");
        setResult("");
    };

    const handleDelete = () => {
        setInput(input.slice(0, -1));
    };

    const handleEqual = () => {
        try {
            const evalResult = evaluate(input.replace(/\^/g, "**"));
            setResult(evalResult.toString());
            setHistory([`${input} = ${evalResult}`, ...history]); // Lưu lịch sử
        } catch (error) {
            setResult("Error");
        }
    };

    const handleFactorial = () => {
        try {
            const number = parseInt(input);
            if (!isNaN(number)) {
                const fact = factorial(number);
                setResult(fact.toString());
                setHistory([`${input}! = ${fact}`, ...history]);
            } else {
                setResult("Error");
            }
        } catch {
            setResult("Error");
        }
    };

    const handleToggleSign = () => {
        if (input.startsWith("-")) setInput(input.slice(1));
        else setInput("-" + input);
    };

    // Xử lý bộ nhớ
    const handleMemory = (action: string) => {
        try {
            const val = evaluate(input.replace(/\^/g, "**"));
            if (action === "MC") setMemory(null);
            if (action === "MR" && memory !== null) setInput(input + memory.toString());
            if (action === "M+") setMemory((memory ?? 0) + val);
            if (action === "M-") setMemory((memory ?? 0) - val);
        } catch {
            setResult("Error");
        }
    };

    const buttons = [
        ["AC", "DEL", "(", ")", "n!"],
        ["sin(", "cos(", "tan(", "^", "ln("],
        ["7", "8", "9", "/", "exp("],
        ["4", "5", "6", "*", "x²"],
        ["1", "2", "3", "-", "x³"],
        ["0", ".", "log(", "+", "%"],
        ["sqrt(", "π", "e", "±", "="],
        ["xʸ", "∛", "sinh(", "cosh(", "tanh("],
        ["rand", "deg", "rad"],
        ["MC", "MR", "M+", "M-"] // hàng nút bộ nhớ
    ];

    return (
        <View style={styles.container}>
            {/* Lịch sử */}
            <View style={styles.historyBox}>
                <FlatList
                    data={history}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Text style={styles.historyText}>{item}</Text>
                    )}
                />
            </View>

            {/* Màn hình hiển thị */}
            <View style={styles.display}>
                <ScrollView horizontal contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}>
                    <Text style={styles.inputText}>{input}</Text>
                </ScrollView>
                <Text style={styles.resultText}>{result}</Text>
            </View>

            {/* Bàn phím */}
            <View style={styles.keyboard}>
                {buttons.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((btn) => (
                            <TouchableOpacity
                                key={btn}
                                style={[
                                    styles.button,
                                    btn === "=" && { backgroundColor: "#4CAF50" },
                                    btn === "AC" && { backgroundColor: "#f44336" },
                                    btn === "DEL" && { backgroundColor: "#ff9800" },
                                    btn.match(/sin|cos|tan|log|sqrt|ln|exp|sinh|cosh|tanh|\^|n!|x²|x³|xʸ|∛/) && { backgroundColor: "#2196F3" },
                                    btn.match(/[0-9]/) && { backgroundColor: "#555" }
                                ]}
                                onPress={() => {
                                    if (btn === "AC") handleClear();
                                    else if (btn === "DEL") handleDelete();
                                    else if (btn === "=") handleEqual();
                                    else if (btn === "π") handlePress("3.14159");
                                    else if (btn === "e") handlePress("2.718");
                                    else if (btn === "n!") handleFactorial();
                                    else if (btn === "x²") handlePress("^2");
                                    else if (btn === "x³") handlePress("^3");
                                    else if (btn === "xʸ") handlePress("^");
                                    else if (btn === "∛") handlePress("^(1/3)");
                                    else if (btn === "±") handleToggleSign();
                                    else if (btn === "%") handlePress("/100");
                                    else if (btn === "rand") handlePress(Math.random().toString());
                                    else if (["MC", "MR", "M+", "M-"].includes(btn)) handleMemory(btn);
                                    else if (btn === "deg") {
                                        try {
                                            const val = evaluate(input.replace(/\^/g, "**"));
                                            setResult((val * (180 / Math.PI)).toString());
                                        } catch {
                                            setResult("Error");
                                        }
                                    }
                                    else if (btn === "rad") {
                                        try {
                                            const val = evaluate(input.replace(/\^/g, "**"));
                                            setResult((val * (Math.PI / 180)).toString());
                                        } catch {
                                            setResult("Error");
                                        }
                                    }
                                    else handlePress(btn);
                                }}
                            >
                                <Text style={styles.btnText}>{btn}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>
        </View>
    );
};

export default CalculatorScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        padding: 8,
        justifyContent: "flex-end"
    },
    historyBox: {
        maxHeight: 100,
        marginBottom: 5,
        padding: 5,
        backgroundColor: "#111",
        borderRadius: 5
    },
    historyText: {
        color: "#aaa",
        fontSize: 14
    },
    display: {
        minHeight: 120,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        padding: 8
    },
    inputText: {
        fontSize: 28,
        color: "#fff"
    },
    resultText: {
        fontSize: 36,
        color: "#4CAF50",
        fontWeight: "bold"
    },
    keyboard: {
        marginBottom: 10
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 3
    },
    button: {
        flex: 1,
        marginHorizontal: 3,
        marginVertical: 3,
        backgroundColor: "#333",
        paddingVertical: 14,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    btnText: {
        fontSize: 12,
        color: "#fff",
        fontWeight: "500"
    }
});
