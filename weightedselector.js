/*
a distribution is any list of numbers.
it will be treated as a probability distribution
by being normalized against the sum of its members.

a weighted selector is a function based on a distribution d
that returns a number i from 0 to len(d)-1 s.t. P(i) = d[i]/len(d).

weightedSelectorGenerator returns a weighted selector based on its input.
*/

const tester = require("./tester.js")

function linearTable(d) {
    return () => {
        const sum = d.reduce((a, b) => a + b)
        let roll = Math.random() * sum
        for (let i = 0; i < d.length; i++) {
            roll -= d[i]
            if (roll < 0) return i
        }
        return 0
    }
}

function binaryTable(d) {
    let total = 0
    const table = Array.from(d, v => {
        total += v
        return total
    })
    return () => {
        const roll = Math.random() * total
        const n = table.length
        let low = 0,
            high = n,
            i;

        while (low < n - 1 &&
               high > 0) {
            i = Math.floor((low + high) / 2)
            if (roll < table[i]) high = i
            else if (roll > table[i + 1]) low = i
            else break
        }
        if (high <= 0) i = 0
        else if (low >= n - 1) i = n - 1
        else i += 1
        return i
    }
}

tester.test(linearTable)
tester.test(binaryTable)
