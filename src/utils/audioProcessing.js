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

// Analyse the music and calls oncomplete when finished
// oncomplete must take two arguments : the datas array and the Number threshold
function analyse(buffer, oncomplete) {
    const offlineContext = new OfflineAudioContext(1, buffer.length, buffer.sampleRate);
    const source = offlineContext.createBufferSource();
    source.buffer = buffer;
    const filter = offlineContext.createBiquadFilter();
    filter.type = "lowpass";
    source.connect(filter);
    filter.connect(offlineContext.destination);
    source.start(0);
    offlineContext.startRendering();
    offlineContext.oncomplete = function(e) {
        const [data, threshold] = process(e);
        oncomplete(data, threshold);
    };
}
export {process, analyse};