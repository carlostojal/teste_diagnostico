
import RNFS from 'react-native-fs';

export default async function createFile(origin_uri, dest_name) {
    var extension = origin_uri.split('.')[1]
    var dest_path = RNFS.DocumentDirectoryPath + "/" + dest_name + "." + extension
    console.log(dest_path)
    console.log("ORIGIN URI: " + origin_uri)
    await RNFS.moveFile(origin_uri, dest_path)
    return dest_path
}