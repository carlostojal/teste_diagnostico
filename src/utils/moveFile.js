
import RNFS from 'react-native-fs';

export default async function moveFile(origin_uri, dest_name) {
    let origin_split = origin_uri.split('.')
    console.log("ORIGIN URI IN UTIL: " + origin_uri)
    let file_name = origin_split[origin_split.length - 2]
    let extension = origin_split[origin_split.length - 1]
    let dest_path = RNFS.DocumentDirectoryPath + '/' + dest_name + '.' + extension
    await RNFS.moveFile(origin_uri, dest_path)
    return dest_path
}