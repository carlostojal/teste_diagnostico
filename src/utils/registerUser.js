
import AsyncStorage from '@react-native-community/async-storage';

export default async function registerUser(name, email, password) {
    /*
        0 - success
        1 - name already registered
        2 - email already registered
        3 - error
    */
    try {
        var users = await AsyncStorage.getItem("users") // get already registered users
        if(users != null) {
            users = JSON.parse(users) // parse the JSON string
        } else {
            users = [] // no user registered, so initialize a new array
        }
        for(var i = 0; i < users.length; i++) { // search for the user
            if(users[i].name.toLowerCase() == name.toLowerCase())
                return 1
            else if(users[i].email.toLowerCase() == email.toLowerCase())
                return 2
        }
        // the user doesn't exist, so register it
        users.push({
            name: name,
            email: email,
            password: password
        })
        await AsyncStorage.setItem("users", JSON.stringify(users))
        return 0
    } catch (error) {
        console.log(error)
        return 3
    }
}