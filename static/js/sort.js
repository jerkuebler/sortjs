const algorithms = ['Mergesort', 'Quicksort', 'Heapsort', 'Bubblesort', 'Insertionsort', 'Selectionsort'];
addSelectOptions(algorithms, 'algorithmSelect', "Choose Algorithm");

const bars = 50;
populateChart(randomList(bars));

document.getElementById('resetChart').addEventListener('click', () => {resetChart(bars)});
document.getElementById('run').addEventListener('click', () => {runAlgorithm(bars)});
document.getElementById('algorithmSelect').addEventListener('change', algorithmSelect);

function addSelectOptions(options, selectID, text) {
    const dropdown = document.getElementById(selectID);
    options.forEach(item => {
        let option = document.createElement('option');
        option.text = item;
        dropdown.add(option);
    });
    const defOption = document.createElement('option');
    defOption.text = text;
    defOption.selected = true;
    defOption.disabled = true;
    defOption.hidden = true;
    dropdown.add(defOption);
}

function runAlgorithm(bars) {
    const algorithm = document.getElementById('algorithmSelect');
    const alg = algorithm.options[algorithm.selectedIndex].text;
    let values = collectValues(bars);
    switch (alg) {
        case 'Mergesort':
            mergeSort(values).then();
            break;
        case 'Quicksort':
            quickSort(values).then();
            break;
        case 'Heapsort':
            heapSort(values).then();
            break;
        case 'Bubblesort':
            bubbleSort(values).then();
            break;
        case 'Insertionsort':
            insertionSort(values).then();
            break;
        case 'Selectionsort':
            selectionSort(values).then();
            break;
    }
}

function algorithmSelect() {
    const algorithm = document.getElementById('algorithmSelect');
    const alg = algorithm.options[algorithm.selectedIndex].text;
    const title = document.getElementById('algorithmTitle');
    const varN = 'n'.italics();
    const squared = '2'.sup();
    let best, average, worst;
    switch (alg) {
        case 'Mergesort':
            best = varN + "log" + varN;
            average = varN + "log" + varN;
            worst = varN + "log" + varN;
            break;
        case 'Quicksort':
            best = varN + "log" + varN;
            average = varN + "log" + varN;
            worst = varN + squared;
            break;
        case 'Heapsort':
            best = varN;
            average = varN + "log" + varN;
            worst = varN + "log" + varN;
            break;
        case 'Selectionsort':
            best = varN + squared;
            average = varN + squared;
            worst = varN + squared;
            break;
        case 'Bubblesort':
        case 'Insertionsort':
            best = varN;
            average = varN + squared;
            worst = varN + squared;
    }
    const titleLead = "Time Complexity by Case";
    const titleEnd = "Best: " + best + " Average: " + average + " Worst: " + worst;
    title.innerHTML = titleLead + "<br />" + titleEnd;
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

function resetChart(len) {
    const grid = document.getElementById('chartGrid');
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    populateChart(randomList(len));
}

function populateChart(nums) {
    let i = 0;
    const grid = document.getElementById('chartGrid');
    for (const num of nums) {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.title = num.toString();
        bar.style.cssText = '--bar-value:' + bar.title + '%';
        bar.id = i.toString();
        grid.appendChild(bar);
        i++;
    }
}

function randomList(len) {
    let numList = [];
    for (let i=0; i<len; i++){
        const value = Math.round(Math.random() * 100);
        numList.push(value);
    }
    return numList;
}