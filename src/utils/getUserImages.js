
import AsyncStorage from '@react-native-community/async-storage';

export default async function getUserImages(user_email) {
    /*
        1 - error
    */
    try {
        out = []
        var images = await AsyncStorage.getItem("images")
        if(images != null && images != "") {
            images = JSON.parse(images)
            for(var i = 0; i < images.length; i++) {
                if(images[i].user_email == user_email)
                    out.push(images[i])
            }
        }
        out.sort((a, b) => {
            return b.id - a.id
        })
        return out
    } catch (error) {
        console.log(error)
        return 1
    }
}