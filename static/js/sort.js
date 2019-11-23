const bars = 20;

populateChart(randomList(bars));

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
        bar.title = num.toString() + '%';
        bar.style.cssText = '--bar-value:' + bar.title;
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