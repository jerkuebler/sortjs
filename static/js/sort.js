const algorithms = ['Mergesort', 'Quicksort', 'Heapsort', 'Bubblesort'];
addSelectOptions(algorithms, 'algorithmSelect', "Choose Algorithm");

const bars = 50;
populateChart(randomList(bars));

document.getElementById('resetChart').addEventListener('click', () => {resetChart(bars)});
document.getElementById('run').addEventListener('click', () => {runAlgorithm(bars)});

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
    switch (alg) {
        case 'Mergesort':
            mergeSort(bars).then();
            break;
        case 'Quicksort':
            quickSort(bars).then();
            break;
        case 'Heapsort':
            heapSort(bars).then();
            break;
        case 'Bubblesort':
            bubbleSort(bars).then();
            break;
    }
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