
import AsyncStorage from '@react-native-community/async-storage';

export default async function saveImage(image) {
    /*
        0 - success
        1 - image already exists
        2 - error
    */
    try {
        var images = await AsyncStorage.getItem("images") // get already registered images
        console.log(images)
        if(images != null) {
            images = JSON.parse(images) // parse the JSON string
        } else {
            images = [] // no image registered, so initialize a new array
        }
        for(var i = 0; i < images.length; i++) {
            if(images[i].name.toLowerCase() == image.name.toLowerCase())
                return 1
        }
        images.push(image)
        await AsyncStorage.setItem("images", JSON.stringify(images))
        return 0
    } catch (error) {
        console.log(error)
        return 2
    }
}