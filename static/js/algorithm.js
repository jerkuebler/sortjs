async function mergeSort(chartLen) {

    /* get the values in the correct order */
    let values = [];
    for (let i = 0; i < chartLen; i++) {
        const barID = i.toString();
        const barValue = Number(document.getElementById(barID).title);
        values.push([barID, barValue]);
    }

    let sortedValues = [...values];

    /* run function on array */
    await separate(0, chartLen, values, sortedValues);

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
        let activeEls = [];
        for (let i = left; i < right; i++) {
            const activeEl = document.getElementById(arrA[i][0]);
            activeEl.classList.add('active');
            activeEls.push(activeEl);
        }

        for (let k = left; k < right; k++) {
            if (l < middle && (r >= right || arrA[l][1] <= arrA[r][1])) {
                const leftEl = document.getElementById(arrA[l][0]);
                moveDivInGrid(leftEl, k);
                arrB[k] = arrA[l];
                l++;
            } else {
                const rightEl = document.getElementById(arrA[r][0]);
                moveDivInGrid(rightEl, k);
                arrB[k] = arrA[r];
                r++
            }
            await sleep(50);
        }
        for (const el of activeEls) {
            el.classList.remove('active');
        }
    }
}

async function quickSort(chartLen) {

    /* collect the IDs and values of each bar */
    let values = [];
    for (let i=0; i<chartLen; i++) {
        const barID = i.toString();
        const barValue = Number(document.getElementById(barID).title);
        values.push([barID, barValue]);
    }

    qSort(values, 0, values.length - 1);

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

        let activeEls = [];
        for (let i=begin; i<end; i++) {
            const activeEl = document.getElementById(arr[i][0]);
            activeEl.classList.add('active');
            activeEls.push(activeEl);
        }

        let i = begin;
        for (let j = begin; j <= end; j++) {
            const temp = arr[i];
            if (arr[j][1] < pivot) {
                swapDivInGrid(arr, i, j);
                arr[i] = arr[j];
                arr[j] = temp;
                i++;
                await sleep(100);
            }
        }
        swapDivInGrid(arr, i, end);
        const temp = arr[i];
        arr[i] = arr[end];
        arr[end] = temp;

        for (const activeEl of activeEls) {
            activeEl.classList.remove('active');
        }

        pivotEl.classList.remove('pivot');

        return i;
    }
}

function swapDivInGrid (arr, posA, posB) {
    const aEl = document.getElementById(arr[posA][0]);
    const bEl = document.getElementById(arr[posB][0]);
    moveDivInGrid(aEl, posB);
    moveDivInGrid(bEl, posA);
}

function moveDivInGrid (div, pos) {
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