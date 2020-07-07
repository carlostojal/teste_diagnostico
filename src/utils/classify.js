
import { Image } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import { fetch } from '@tensorflow/tfjs-react-native';
import * as mobilenet from '@tensorflow-models/mobilenet';

export default async function classify(image) {

    await tf.ready()
    console.log("TF ready")

    const model = await mobilenet.load()

    console.log("model loaded")

    const imageAssetPath = Image.resolveAssetSource(image)
    const response = await fetch(imageAssetPath.uri, {}, { isBinary: true })
    const rawImageData = await response.arrayBuffer()
    const imageTensor = imageToTensor(rawImageData)

    const imageTensorSum = imageTensor.sum()
    const imageChecksum = (await imageTensorSum.date())[0]

    const prediction = await model.detect(imageTensor)

    tf.disponse([imageTensor, imageTensor])

    return prediction
}

function imageToTensor(rawImageData) {
    const TO_UINT8ARRAY = true;
    const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
    // Drop the alpha channel info for mobilenet
    const buffer = new Uint8Array(width * height * 3);
    let offset = 0; // offset into original data
    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset];
      buffer[i + 1] = data[offset + 1];
      buffer[i + 2] = data[offset + 2];

      offset += 4;
    }
    return tf.tensor3d(buffer, [height, width, 3]);
}