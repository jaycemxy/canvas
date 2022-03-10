let canvas = document.getElementById("canvas");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;    //将canvas设置成屏幕的宽高

let ctx = canvas.getContext("2d");
ctx.fillStyle = 'black';
ctx.lineCap = 'round';
ctx.lineWidth = 10; 

let painting = false;

let isTouchDevice = 'ontouchstart' in document.documentElement;   //检测是否是触屏设备

function drawLine (x1,y1,x2,y2){     // 声明一个画线函数，接受四个值，分别为起点和终点的横纵坐标
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    
}

if(isTouchDevice) {  // 如果是触屏设备
    canvas.ontouchstart = (e) => {
        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;
        last = [x, y];   // 拿到每一笔的终点，作为第二笔的起点
    }
    canvas.ontouchmove = (e) => {
        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;
        drawLine(last[0], last[1], x, y);
        last = [x, y];
    }
} else {  // 不是触屏设备
    canvas.onmousedown = (e) => {
        painting = true;    // 当用户按下鼠标才开始画
        last = [e.clientX, e.clientY];
    }
    canvas.onmousemove = (e) => {
        if (painting === true){
            drawLine(last[0], last[1], e.clientX, e.clientY);
            last = [e.clientX, e.clientY];
        }
    }
    canvas.onmouseup = () => {
        painting = false;
    }
}