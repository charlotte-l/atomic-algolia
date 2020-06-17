module.exports = async function getRemoteIndex(index) {
    var oldIndex 
    try {
        oldIndex = await query(index)
    } catch (err) {
        throw err
    }

    return oldIndex
}

function query(index) {
    return new Promise(function(resolve, reject) {
        const browser = index.browseAll();
        let hits = [];

        browser.on('result', function(content) {
            hits = hits.concat(content.hits);
        });

        browser.on('end', function() {
            resolve(hits);
        });

        browser.on('error', function(err) {
            reject(err);
        });
    })
}