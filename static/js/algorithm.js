async function mergeSort(chartLen) {

    let values = collectValues(chartLen);

    let sortedValues = [...values];

    /* run function on array */
    await separate(0, chartLen, values, sortedValues);
    console.log(values);

    /* function to run recursively to separate sets, order, then merge */
    async function separate(left, right, arrA, arrB) {
        if (right - left < 2) {
            return
        }
        const middle = Math.floor((right + left) / 2);
        await separate(left, middle, arrB, arrA);
        await separate(middle, right, arrB, arrA);
        await merge(left, middle, right, arrB, arrA);
    }

    async function merge(left, middle, right, arrA, arrB) {
        let l = left;
        let r = middle;
        let activeEls = markActiveEls(arrA, left, right);

        for (let k = left; k < right; k++) {
            if (l < middle && (r >= right || arrA[l][1] <= arrA[r][1])) {
                const leftEl = document.getElementById(arrA[l][0]);
                divMove(leftEl, k);
                arrB[k] = arrA[l];
                l++;
            } else {
                const rightEl = document.getElementById(arrA[r][0]);
                divMove(rightEl, k);
                arrB[k] = arrA[r];
                r++
            }
            await sleep(50);
        }
        removeInactiveEls(activeEls);
    }
}

async function quickSort(chartLen) {

    let values = collectValues(chartLen);

    await qSort(values, 0, values.length - 1);
    console.log(values);

    async function qSort(arr, begin, end) {
        if (begin < end) {
            const part = await partition(arr, begin, end);
            /* end of next recursion before part because part is in its final sorted position */
            await qSort(arr, begin, part - 1);
            await qSort(arr, part + 1, end);
        }
    }

    async function partition(arr, begin, end) {
        const pivot = arr[end][1];
        const pivotEl = document.getElementById(arr[end][0]);
        pivotEl.classList.add('pivot');

        const activeEls = markActiveEls(arr, begin, end);

        let i = begin;
        for (let j = begin; j <= end; j++) {
            if (arr[j][1] < pivot) {
                divSwap(arr, i, j);
                arraySwap(arr, i, j);
                i++;
                await sleep(100);
            }
        }
        divSwap(arr, i, end);
        arraySwap(arr, i, end);

        removeInactiveEls(activeEls);

        pivotEl.classList.remove('pivot');

        return i;
    }
}

async function heapSort(chartLen) {

    let values = collectValues(chartLen);

    await heapify(values, values.length);

    let end = values.length - 1;
    const _ = markActiveEls(values, 0, values.length);
    while (end > 0) {
        document.getElementById(values[0][0]).classList.add('pivot');
        divSwap(values, 0, end);
        arraySwap(values, 0, end);
        await sleep(100);
        document.getElementById(values[end][0]).classList.remove('pivot');
        document.getElementById(values[end][0]).classList.remove('active');
        end--;

        await siftDown(values, 0, end);
    }
    document.getElementById(values[end][0]).classList.remove('active');
    console.log(values);

    async function heapify(values, count) {
        let start = iParent(count - 1);

        while (start >= 0) {
            const activeEls = markActiveEls(values, start, count);
            await siftDown(values, start, count - 1);
            removeInactiveEls(activeEls);
            start--;
        }
    }

    async function siftDown(values, start, end) {
        let root = start;

        while (iChild(root, true) <= end) {
            const child = iChild(root, true);
            let swap = root;

            if (values[swap][1] < values[child][1]) {
                swap = child;
            }

            if (child + 1 <= end && values[swap][1] < values[child + 1][1]) {
                swap = child + 1;
            }

            if (swap === root) {
                return
            } else {
                divSwap(values, root, swap);
                arraySwap(values, swap, root);
                root = swap;
                await sleep(100);
            }
        }
    }
}

async function bubbleSort(chartLen) {

    let values = collectValues(chartLen);

    let end = chartLen - 1;
    markActiveEls(values, 0, chartLen);
    while (end > 0) {
        await bubble(values, end);
        document.getElementById(values[end][0]).classList.remove('active');
        end--;
    }
    document.getElementById(values[end][0]).classList.remove('active');
    console.log(values);

    async function bubble(arr, current) {
        for (let i=0; i < current; i++) {
            if (arr[i][1] > arr[i + 1][1]) {
                const left = document.getElementById(arr[i][0]);
                left.classList.add('pivot');
                const right = document.getElementById(arr[i+1][0]);
                right.classList.add('pivot');
                divSwap(arr, i, i + 1);
                arraySwap(arr, i, i+1);
                await sleep(50);
                left.classList.remove('pivot');
                right.classList.remove('pivot');
            }
        }
    }
}

async function insertionSort(chartLen) {

    let values = collectValues(chartLen);

    let end = 0;
    const _ = markActiveEls(values, 1, chartLen);
    while (end < chartLen - 1) {
        const current = values[end + 1];
        await insert(values, current, end);
        document.getElementById(current[0]).classList.remove('active');
        end++;
    }
    console.log(values);

    async function insert(arr, curr, e) {
        const currDiv = document.getElementById(curr[0]);
        currDiv.classList.add('pivot');

        for (let i = 0; i <= e; i++) {
            const iEl = document.getElementById(arr[i][0]);
            iEl.classList.add('pivot');
            await sleep(50);
            if (curr[1] < arr[i][1]) {
                arrayMove(arr, e + 1, i);
                const currDiv = document.getElementById(curr[0]);
                divMove(currDiv, i);
                iEl.classList.remove('pivot');
                currDiv.classList.remove('pivot');
                return
            }
            iEl.classList.remove('pivot');
        }
        currDiv.classList.remove('pivot');
    }
}

function iChild(num, left) {
    if (left) {
        return num * 2 + 1;
    } else {
        return num * 2 + 2;
    }
}

function iParent(num) {
    if (num === 0) {
        return false;
    }
    if (num % 2 > 0) {
        return Math.floor(num / 2);
    } else if (num % 2 === 0) {
        return num / 2 - 1;
    }
}

function collectValues(chartLen){
    /* collect the IDs and values of each bar */
    let values = [];
    for (let i=0; i<chartLen; i++) {
        const barID = i.toString();
        const barValue = Number(document.getElementById(barID).title);
        values.push([barID, barValue]);
    }
    return values;
}

function markActiveEls(arr, begin, end) {
    let activeEls = [];
    for (let i=begin; i<end; i++) {
        const activeEl = document.getElementById(arr[i][0]);
        activeEl.classList.add('active');
        activeEls.push(activeEl);
    }

    return activeEls;
}

function removeInactiveEls(activeEls) {
    for (const el of activeEls) {
        el.classList.remove('active');
    }
}

function arrayMove(arr, oldIndex, newIndex) {
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
}

function arraySwap(arr, posA, posB) {
    const temp = arr[posA];
    arr[posA] = arr[posB];
    arr[posB] = temp;
}

function divSwap (arr, posA, posB) {
    const aEl = document.getElementById(arr[posA][0]);
    const bEl = document.getElementById(arr[posB][0]);
    divMove(aEl, posB);
    divMove(bEl, posA);
}

function divMove (div, pos) {
    const grid = document.getElementById('chartGrid');
    if (pos === 0) {
        grid.insertAdjacentElement('afterbegin', div);
    } else {
        const currentDiv = grid.getElementsByTagName('div')[pos - 1];
        currentDiv.insertAdjacentElement('afterend', div);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}