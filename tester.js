function test(func) {
    const start = Date.now()
    console.log("testing", func)

    console.log("EASY")
    const easyDists = [
        [50, 50],
        [70, 30],
        [1, 1, 1],
        [1, 2, 3],
        [1, 2, 3, 4, 5, 6],
    ]
    easyDists.forEach(d => shortTest(d, func))
    console.log()

    console.log("HARD");
    const hardDist = Array.from(Array(10000), (v, i) => Math.floor(Math.random() * i ** 2))
    console.log("testing a long distribution...")
    longTest(hardDist, func)
    
    const end = Date.now()
    console.log(`elapsed: ${((end - start) / 1000).toFixed(4)} seconds`) 
}

function experiment(d, f, trials) {
    const results = d.map(() => 0)
    for (let c = 0; c < trials; c++) {
        const i = f()
        if (!(i in results)) results[i] = 0
        results[i]++
    }
    return results
}

function shortTest(dist, func) {
    const trials = 1000,
          sum = dist.reduce((a, b) => a + b),
          results = experiment(dist, func(dist), trials),
          sheet = Array.from(dist, (v, i) => [
              i,
              `${v}/${sum}`,
              `(${(v*100/sum).toFixed(1)}%)`,
              "vs.",
              `${results[i]}/${trials}`,
              `(${(results[i]*100/trials).toFixed(1)}%)`
          ])
    console.log("testing dist", dist, `(sum: ${sum})`)
    dist.forEach((v, i) =>
        console.log(`${i}:`.padStart(4),
                    `${v.toString().padStart(3, " ")}/${sum}`, 
                    `(${(v*100/sum).toFixed(1)}%)`.padStart(8, " "),
                    "vs.",
                    `${results[i].toString().padStart(3, " ")}/${trials}`, 
                    `(${(results[i]*100/trials).toFixed(1)}%)`.padStart(8, " ")))
}

function tablify(sheet) {
    let colWidths = Array.from(sheet[0], (v, i) => 
        sheet.reduce((max, s) =>
            Math.max(max, s[i].toString().length + 1), 0))
    console.log(colWidths)
    sheet.forEach()//todo
}

function longTest(dist, func) {
    const trials = 200000
    experiment(dist, func(dist), trials)
}

module.exports = {
    test,
}
