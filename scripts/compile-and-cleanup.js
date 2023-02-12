'use strict';
const fs = require('fs');
const {join} = require('path');


(() => {
    const sample = process.argv[2];

    if(!sample) {
        throw new Error('No sample name provided. e.g. `node scripts/compile-and-cleanup.js navigation-performance`')
    }

    // LOAD
    const COMPILED_RESULTS_PATH = join('data',`${sample}.json`);
    const MEASURES_DIR_PATH = 'measures/';

    const resultFile = fs.readdirSync(MEASURES_DIR_PATH).find(n => n.includes(sample));
    const resultPath = join(MEASURES_DIR_PATH , resultFile);
    if(!resultFile) {
        throw new Error(`No sample data for ${sample} `)
    }

    // UPDATE
    const result = JSON.parse(fs.readFileSync(resultPath));
    let extractedResult;
    switch (sample) {
        case 'navigation-performance':
           extractedResult = {
                fetchTime: result.steps[0].lhr.fetchTime,
                performance: result.steps[0].lhr.categories.performance.score
            }
            break;
        case 'order-coffee':
            extractedResult = result;
            break;
        default:
                throw new Error(`No post processing implemented for ${sample} `)
    }

    if(!fs.existsSync(COMPILED_RESULTS_PATH)) {
        fs.writeFileSync(COMPILED_RESULTS_PATH, JSON.stringify([], null, 2));
    }
    const compiledResults = JSON.parse(fs.readFileSync(COMPILED_RESULTS_PATH));
    compiledResults.push(extractedResult);
    fs.writeFileSync(COMPILED_RESULTS_PATH, JSON.stringify(compiledResults, null, 2));

    // CLEANUP
    fs.unlinkSync(resultPath);
    console.log(`Number of audits in ${sample}`, compiledResults.length);
})();
