
import { AsyncStorage } from 'react-native';

export default async function getUser() {
    /*
        1 - error
    */
    try {
        var user = await AsyncStorage.getItem("current_user")
        return user
    } catch (error) {
        console.log(error)
        return 1
    }
}