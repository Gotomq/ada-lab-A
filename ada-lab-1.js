// Ivan B. UNSA
// ADA LAB 01
const colors = require('colors');


// [1] Array generator 
const genArray = (sorted, num) => {
    arr = [];
    for (let i = 0; i < num; i++) {
        arr[i] = sorted ? i : Math.floor(Math.random() * num);
    }
    return arr
}


// Bubble Sort
const bubbleSort = arr => {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
}

// Insert Sort
const insertSort = arr => {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        let val = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > val) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = val
    }
}

// Midiendo tiempo
const bubbleSortTime = arr => {
    let hrstart = process.hrtime();
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    let hrend = process.hrtime(hrstart);
    return {
        sortAlgorithm: 'bubbleSort',
        elapsedTime: `${hrend[0]}s ${hrend[1] / 1000000}ms`,
        size: n
    }
}

const insertSortTime = arr => {
    let hrstart = process.hrtime();
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        let val = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > val) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = val;
    }
    let hrend = process.hrtime(hrstart);
    return {
        sortAlgorithm: 'insertSort',
        elapsedTime: `${hrend[0]}s ${hrend[1] / 1000000}ms`,
        size: n
    }
}

// [3] memoria, comparaciones, asignacion
const bubbleSortDebug = arr => {
    c_acc = 0; a_acc = 0; m_acc = 0; objAcc = 0;// accumaltors
    objAcc += 200;                                // function bubbleSortDebug
    objAcc += 200;                                // function insertSort
    objAcc += 200;                                // function genArray
    const n = arr.length; a_acc += 8;           // assign
    m_acc += 50 + n * 10;                       // memory array
    c_acc += 4;                                 // comparison-for
    for (let i = 0; i < n; i++) {
        a_acc += 8;                             // assign++
        c_acc += 2;                             // comparison-for
        for (let j = 0; j < n - i - 1; j++) {
            a_acc += 8;                         // assign++
            c_acc += 2;                         // comparison-for
            c_acc += 2;                         // comparison-if
            if (arr[j] > arr[j + 1]) {
                temp = arr[j + 1]; a_acc += 8;      //assign
                arr[j + 1] = arr[j]; a_acc += 8;    //assign
                arr[j] = temp; a_acc += 8;          //assign
            }
        }
    }
    return {
        sortAlgorithm: 'bubbleSort',
        size: n,
        comparisons: c_acc,
        assignations: a_acc,
        arrayMemory: m_acc,
        objectMemory: objAcc
    }
}

const insertSortDebug = arr => {
    c_acc = 0; a_acc = 0; m_acc = 0; objAcc = 0;   // accumaltors
    objAcc += 200;                            // function insertSortDebug 
    objAcc += 200;                            // function insertSort 
    objAcc += 200;                            // function genArray 
    const n = arr.length; a_acc += 8;       // assign
    m_acc += 50 + n * 10;                   // memory array
    c_acc += 4;                             // comparison-for
    for (let i = 1; i < n; i++) {
        a_acc += 8;                         // assign ++ 
        let val = arr[i]; a_acc += 8;       // assign
        let j = i - 1; a_acc += 8;          // assign
        c_acc += 2 * 3;                       // comparison-while x3
        while (j >= 0 && arr[j] > val) {
            arr[j + 1] = arr[j]; a_acc += 8;    // assign
            j = j - 1; a_acc += 8;              // assign
        }
        arr[j + 1] = val; a_acc += 8;           // assign
    }
    return {
        sortAlgorithm: 'insertSort',
        size: n,
        comparisons: c_acc,
        assignations: a_acc,
        arrayMemory: m_acc,
        objectMemory: objAcc
    }
}

const testSort = (sortAlgorithm, isSorted, size) => {
    arr = genArray(isSorted, size);
    switch (sortAlgorithm) {
        case 'bubbleSortTime':
            results = bubbleSortTime(arr);
            break;
        case 'insertSortTime':
            results = insertSortTime(arr);
            break;
        case 'bubbleSortDebug':
            results = bubbleSortDebug(arr);
            break;
        case 'insertSortDebug':
            results = insertSortDebug(arr);
            break;
        default:
            console.log('Nope')
            break;
    }
    console.log(results)
}

isSorted = false

console.log('10-length arrays'.black.bgWhite.bold);
console.log('====== testing time ...'.blue.bgWhite.bold);
testSort('insertSortTime', isSorted, 10);
testSort('bubbleSortTime', isSorted, 10);
console.log('====== testing memory, assignations ...'.blue.bgWhite.bold);
testSort('insertSortDebug', isSorted, 10);
testSort('bubbleSortDebug', isSorted, 10);


console.log('1000-length arrays'.black.bgWhite.bold);
console.log('====== testing time ...'.blue.bgWhite.bold);
testSort('insertSortTime', isSorted, 1000);
testSort('bubbleSortTime', isSorted, 1000);
console.log('====== testing memory, assignations ...'.blue.bgWhite.bold);
testSort('insertSortDebug', isSorted, 1000);
testSort('bubbleSortDebug', isSorted, 1000);


// console.log('100K-length arrays'.black.bgWhite.bold);
// console.log('====== testing time ...'.blue.bgWhite.bold);
// testSort('insertSortTime', isSorted, 100000);
// testSort('bubbleSortTime', isSorted, 100000);
// console.log('====== testing memory, assignations ...'.blue.bgWhite.bold);
// testSort('insertSortDebug', isSorted, 100000);
// testSort('bubbleSortDebug', isSorted, 100000);

// console.log('1M-length arrays'.black.bgWhite.bold);
// console.log('====== testing time ...'.blue.bgWhite.bold);
// testSort('insertSortTime', isSorted, 1000000);
// testSort('bubbleSortTime', isSorted, 1000000);
// console.log('====== testing memory, assignations ...'.blue.bgWhite.bold);
// testSort('insertSortDebug', isSorted, 1000000);
// testSort('bubbleSortDebug', isSorted, 1000000);