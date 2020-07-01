
import AsyncStorage from '@react-native-community/async-storage';

export default async function clearData() {
    try {
        await AsyncStorage.clear() 
        return 0
    } catch (error) {
        console.log(error)
        return 1
    }
}