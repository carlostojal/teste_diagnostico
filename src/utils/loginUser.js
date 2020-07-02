
import AsyncStorage from '@react-native-community/async-storage';

export default async function loginUser(email, password) {
    /*
        0 - success
        1 - wrong credentials
        2 - error
    */
    try {
        var users = await AsyncStorage.getItem("users") // get already registered users
        // console.log("users: " + users)
        if(users != null) {
            users = JSON.parse(users) // parse the JSON string
        } else {
            return 1
        }
        for(var i = 0; i < users.length; i++) { // search for the user
            if(users[i].email == email && users[i].password == password)
                return 0
        }
        return 1
    } catch (error) {
        console.log(error)
        return 2
    }
}