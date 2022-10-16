//<<<<==========================start==============================>>>>>>>>>>>>>>>>>

// document.width = window.innerWidth ;

let header = document.querySelector(`#header`);
let main = document.querySelector(`#main`);
// main.width=window.innerWidth-60+"px";

console.log(window.innerWidth);
let isDark = false;
let startBgColor = "white"
let drawColor = "black";
let drawWidth = "2";
let isDrawing = false;

let restoreArray = [];
let index = -1;




let changeMode = (element) => {
    isDark = (isDark)? false : true
    let body = document.querySelector(`body`);
    body.setAttribute("class" , (isDark) ? "dark" : "light");
    element.innerHTML= ((isDark)?  `<i class="fa-solid fa-sun"></i>` : `<i class="fa-solid fa-moon"></i>`)
    // (isDark)? startBgColor = "black" : startBgColor ="white" ; 
    // drawColor = ((isDark)? "white" : "Black" ) ;
}

let displayCanvas = (event) => {

    event.preventDefault();

    main.classList.remove("mainDiv")
    main.setAttribute("class", "editedClass")
    main.innerHTML = `
    <div id="canvasDiv">
            
    <div id="tools" class="toolBar">
    <button id="undoButton" class"toolItems"><i class="fa-solid fa-rotate-left "></i></button>
    <button id="clearButton" class"toolItems"><i class="fa-sharp fa-solid fa-trash" ></i></button>
    <button id="downloadButton" class"toolItems"><i class="fa-solid fa-download" ></i></button>
    
    
       <input type="color" id="color" class="toolItems" oninput="changeClr(this)">
       <input class="toolItems" type="range" min="1" max="100" id="range" oninput="changeWidth()"></input>
       </div>
       
   <canvas id="canvas" ></canvas>
   
</div>
`
header.innerHTML += `<h1 class= "topHead" >Dream Drawer</h1>`


    const canvas = document.querySelector(`#canvas`);
    canvas.width = window.innerWidth - 160;
    canvas.height = window.innerHeight; //canvas.width / 2.7 //600;

    let context = canvas.getContext("2d");
    context.fillStyle = startBgColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    let range = document.querySelector(`#range`);
    let color = document.querySelector(`#color`);

    range.addEventListener("input" , (event) => {
        drawWidth = event.target.value 
    })

    color.addEventListener("input" , (event) => {
        drawColor = event.target.value 
    })


    // function changeClr(element) {
    //     drawColor = element.value

    //     let button1 = document.querySelector(`#b1`);
    //     button1.style.color = drawColor
    //     button1.style.borderColor = `  ${drawColor}`
    //     button1.style.boxShadow = ` 0px 0px 5px 5px ${drawColor} `

    //     let button2 = document.querySelector(`#b2`);
    //     button2.style.color = drawColor
    //     button2.style.borderColor = drawColor
    //     button2.style.boxShadow = ` 0px 0px 5px 5px ${drawColor} `

    //     let button3 = document.querySelector(`#b3`);
    //     button3.style.color = drawColor
    //     button3.style.borderColor = drawColor
    //     button3.style.boxShadow = ` 0px 0px 5px 5px ${drawColor} `

    // }

    function changeWidth(element) {
        // let range = document.querySelector(`#range`);
        drawWidth = element.value
    }

    function backToClr(element) {
        element.style.backgroundColor = "black"
        element.style.boxShadow = ` 0px 0px 5px 5px ${drawColor} `

    }

    function hover(element) {
        //     // button.onmouseover
        element.style.backgroundColor = drawColor //"red"
        element.style.color = "white"
        element.style.boxShadow = ` 0px 0px 5px 5px white` //${drawColor} 

    }




    canvas.addEventListener("touchstart", start, false);
    canvas.addEventListener("touchmove", draw, false);
    canvas.addEventListener("mousedown", start, false);
    canvas.addEventListener("mousemove", draw, false);

    canvas.addEventListener("touchend", stop, false);
    canvas.addEventListener("mouseup", stop, false);
    canvas.addEventListener("mouseout", stop, false);

    function start(event) {
        isDrawing = true;
        context.beginPath();
        context.moveTo(event.layerX - canvas.offsetLeft,
            event.layerY - canvas.offsetTop);
        event.preventDefault();
        console.log("Start");
        // console.log("start event :" , event );
    }

    function draw(event) {
        if (isDrawing) {
            context.lineTo(event.layerX - canvas.offsetLeft,
                event.layerY - canvas.offsetTop);
            context.strokeStyle = drawColor;
            context.lineWidth = drawWidth;
            context.lineCap = "round";
            context.lineJoin = "round";
            context.stroke();
            console.log("drawing");
        }
        event.preventDefault();
        // console.log("draw event :" , event );
        // console.log("canvas.offsetTop forYevent :" , canvas.offsetTop );
        // console.log("canvas.offsetLeft forevent :" , canvas.offsetLeft );
    }



    function stop(event) {

        if (isDrawing) {
            context.stroke();
            context.closePath();
            isDrawing = false;
        }
        event.preventDefault();

        if (event.type != `mouseout`) {

            restoreArray.push(context.getImageData(0, 0, canvas.width, canvas.height));
            index += 1;
            console.log(restoreArray);
        }
        // console.log("stop event :" , event );
    }

    function clearCanvas() {
        context.fillStyle = startBgColor;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillRect(0, 0, canvas.width, canvas.height);
        console.log("clear");
        // console.log(event);
        restoreArray = [];
        index = -1;
    }
    // clear() ;


    function undo() {

        if (index <= 0) {
            clearCanvas();
        } else {
            index -= 1;
            restoreArray.pop();
            context.putImageData(restoreArray[index], 0, 0)
        }
    }

    function download() {
        const data = canvas.toDataURL("image/jpeg");
        const link = document.createElement("a");
        link.href = data;
        link.download = "cavas-drawing.jpg";
        link.click();
    }
    
    let downloadButton = document.querySelector(`#downloadButton`);
    let clearButton = document.querySelector(`#clearButton`);
    let undoButton = document.querySelector(`#undoButton`);
    
    downloadButton.addEventListener("click" , download , false)
    clearButton.addEventListener("click" , clearCanvas , false)
    undoButton.addEventListener("click" , undo , false)
    

}













/*

function bgChange() {
    const canvas = document.querySelector(`#canvas`);
    let context = canvas.getContext("2d");
    document.querySelector(`body`).style.backgroundColor = "darkgray"
    context.fillStyle = "white" //startBgColor;
    startBgColor = "white"
    document.querySelector(`#head`).style.display = "contents"

}





*/