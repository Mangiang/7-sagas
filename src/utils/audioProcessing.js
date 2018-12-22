const process = (e) => {
    const filteredBuffer = e.renderedBuffer;
    //If you want to analyze both channels, use the other channel later
    let data = filteredBuffer.getChannelData(0);
    const max = arrayMax(data);
    console.log("----------");
    console.log(max);
    data = data.map((elt) => (elt < 1 ? elt : 1));
    const min = arrayMin(data);
    console.log(data);
    const centeredData = data.map((elt) => (elt - min));
    let sum = 0;
    let avg = 0;
    for (let i = 0; i < centeredData.length; i++)
    {
        sum += centeredData[i]*centeredData[i];
        avg += centeredData[i];
    }
    let norm = Math.sqrt(sum);
    avg /= centeredData.length;
    let normalizedData = centeredData.map((elt) => (Math.abs((elt-avg)/norm*(1000000))));
    const normMax = arrayMax(normalizedData);
    const threshold = normMax * 0.35;
    console.log(threshold);
    return [normalizedData, threshold];
};

// http://stackoverflow.com/questions/1669190/javascript-min-max-array-values
const arrayMin = (arr) => {
    var len = arr.length,
        min = Infinity;
    while (len--) {
        if (arr[len] < min) {
            min = arr[len];
        }
    }
    return min;
};

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