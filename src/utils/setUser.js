
import { AsyncStorage } from 'react-native';

export default async function setUser(email) {
    /*
        0 - success
        1 - error
    */
    try {
        await AsyncStorage.setItem("current_user", email)
        return 0
    } catch (error) {
        console.log(error)
        return 1
    }
}