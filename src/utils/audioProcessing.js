// Determination of beat datas and a correct threshold
const process = (e) => {
    const filteredBuffer = e.renderedBuffer;
    let data = filteredBuffer.getChannelData(0);
    data = data.map((elt) => (elt < 1 ? elt : 1)); // smooth too high values
    let positiveData = data.map((elt) => (Math.abs(elt)));
    const positiveMax = arrayMax(positiveData);
    const threshold = positiveMax * 0.35;
    return [positiveData, threshold];
};

// Use of this function because Math.max throws "Maximum call stack size exceeded"
const arrayMax = (arr) => {
    var len = arr.length,
        max = -Infinity;
    while (len--) {
        if (arr[len] > max) {
            max = arr[len];
        }
    }
    return max;
};

export {process};