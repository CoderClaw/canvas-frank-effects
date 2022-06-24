
import { dog800x450 as dog } from "./pics"

export function greyDog(){

const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 450;

const image = new Image();
image.src = dog
image.addEventListener("load",()=>{
    c.drawImage(image,0,0)
    const scannedImage = c.getImageData(0,0,canvas.width,canvas.height)
    const scannedData = scannedImage.data;
    for(let i = 0; i<scannedData.length; i+=4){
        const total = scannedData[i]+scannedData[i+1]+scannedData[i+2]
        const average = total/3
        scannedData[i] = average
        scannedData[i+1] = average
        scannedData[i+2] = average
          
    }
    c.putImageData(scannedImage,0,0)
})
}