import {artorias} from "./pics"

export function particles(){

const canvas = document.getElementById("canvas")
const c = canvas.getContext("2d")
canvas.width = 1024
canvas.height = 960
const image = new Image();
image.src=artorias

image.addEventListener("load",()=>{
    c.drawImage(image,0,0,canvas.width,canvas.height)
    const pixels = c.getImageData(0,0,canvas.width,canvas.height)
    c.clearRect(0,0,canvas.width,canvas.height)

    let particlesArray = []
    const numberOfParticles = 5000
    
    let mappedImage = []

    for(let y = 0; y<canvas.height; y++){
        let row = []
        for(let x = 0; x< canvas.width; x++){
            const red = pixels.data[(y*4*pixels.width)+(x*4)]
            const green = pixels.data[(y*4*pixels.width)+(x*4+1)]
            const blue = pixels.data[(y*4*pixels.width)+(x*4+2)]
            const brightness = relativeBrightness(red,green,blue)
            const cell = [
                brightness
            ];
            row.push(cell)
        }
        mappedImage.push(row)
    }
    
    function relativeBrightness(red, green, blue){
        return Math.sqrt(
            (red * red)*0.299+
            (green*green)*0.587+
            (blue*blue)*0.114
        )/100
    }

class Particle{
    constructor(){
        this.x = Math.random()*canvas.width
        this.y = 0
        this.speed = 0
        this.velocity = Math.random() * 0.5
        this.size = Math.random()*1.5+1
        this.position1 = Math.floor(this.y)
        this.position2 = Math.floor(this.x)
    }
    update(){
        this.position1 = Math.floor(this.y)
        this.position2 = Math.floor(this.x)
        this.speed = mappedImage[this.position1][this.position2][0]
        let movement = (2.5 - this.speed) + this.velocity
        
        this.y+=movement
        if(this.y >= canvas.height ){
            this.y = 0
            this.x = Math.random()*canvas.width
        }
    }
    draw(){
        c.beginPath()
        c.fillStyle = "white"
        c.arc(this.x,this.y,this.size,0,Math.PI*2)
        c.fill()
    }
}

function init(){
    for(let i = 0; i < numberOfParticles; i++){
        particlesArray.push(new Particle)
    }
}
init()
function animate(){

    c.globalAlpha = 0.05
    c.fillStyle = "black"
    c.fillRect(0,0,canvas.width,canvas.height)
    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update()
        //c.globalAlpha = particlesArray[i].speed /2
        particlesArray[i].draw()
    }
    requestAnimationFrame(animate)
}
animate()

})



}