
import RNFS from 'react-native-fs';

export default async function moveFile(origin_uri, dest_name) {
    let dest_path = RNFS.DocumentDirectoryPath + dest_name
    await RNFS.moveFile(origin_uri, dest_path)
    return dest_path
}