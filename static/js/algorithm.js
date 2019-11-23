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
    await separate(sortedValues, 0, chartLen, values);

    /* function to run recursively to separate sets, order, then merge */
    async function separate(arrB, left, right, arrA) {
        if (right - left < 2) {
            return
        }
        const middle = Math.floor((right + left) / 2);
        await separate(arrA, left, middle, arrB);
        await separate(arrA, middle, right, arrB);
        await merge(arrB, left, middle, right, arrA);
    }

    async function merge(arrA, left, middle, right, arrB) {
        let l = left;
        let r = middle;
        const grid = document.getElementById('chartGrid');
        const divs = grid.getElementsByTagName('div');
        let activeEls = [];
        for (let i = left; i < right; i++) {
            const activeEl = document.getElementById(arrA[i][0]);
            activeEl.classList.add('active');
            activeEls.push(activeEl);
        }

        for (let k = left; k < right; k++) {
            if (k === 0) {
                if (l < middle && (r >= right || arrA[l][1] <= arrA[r][1])) {
                    const leftEl = document.getElementById(arrA[l][0]);
                    grid.insertAdjacentElement('afterbegin', leftEl);
                    arrB[k] = arrA[l];
                    l++;
                } else {
                    const rightEl = document.getElementById(arrA[r][0]);
                    grid.insertAdjacentElement('afterbegin', rightEl);
                    arrB[k] = arrA[r];
                    r++
                }
            } else {
                const currentEl = divs[k - 1];
                if (l < middle && (r >= right || arrA[l][1] <= arrA[r][1])) {
                    const leftEl = document.getElementById(arrA[l][0]);
                    currentEl.insertAdjacentElement('afterend', leftEl);
                    arrB[k] = arrA[l];
                    l++;
                } else {
                    const rightEl = document.getElementById(arrA[r][0]);
                    currentEl.insertAdjacentElement('afterend', rightEl);
                    arrB[k] = arrA[r];
                    r++;
                }
            }
            await sleep(50);
        }
        for (const el of activeEls) {
            el.classList.remove('active');
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}