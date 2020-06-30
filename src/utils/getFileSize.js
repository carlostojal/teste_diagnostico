
import RNFetchBlob from 'rn-fetch-blob';

export default async function getFileSize(uri) {
    var base64 = require('base-64')
    let data = await RNFetchBlob.fs.readFile(uri, 'base64')
    var decodedData = base64.decode(data)
    var bytes=decodedData.length
    if(bytes < 1024) size = bytes + " B"
    else if(bytes < 1048576) size = (bytes / 1024).toFixed(3) + " KB"
    else if(bytes < 1073741824) size = (bytes / 1048576).toFixed(2) + " MB"
    else size = (bytes / 1073741824).toFixed(3) + " GB"
    return size
}