var fabrikLength = 500, fabrikBredth = 300, // keep it 5 : 3
step = 10; //all in pixel
function start() {
    var xOffset = (width - fabrikLength) / 2, yOffset = (height - fabrikBredth) / 2;
    for (var i = 0; i < fabrikBredth / step; i++) {
        for (var j = 0; j < fabrikLength / step; j++) {
            addVertex(xOffset + j * step, yOffset + i * step, i == 0);
            if (j > 0)
                makeEdgeBetween(vertices[vertices.length - 1], vertices[vertices.length - 2]);
            if (i > 0)
                makeEdgeBetween(vertices[vertices.length - 1], vertices[vertices.length - 1 - fabrikLength / step]);
        }
    }
}
start();
drawVertices(vertices);
drawEdges(edges);
var Mouse = /** @class */ (function () {
    function Mouse() {
        this.effectDistance = 10;
    }
    return Mouse;
}());
var mouse = new Mouse;
var dragging = false;
canvas.addEventListener("mousedown", function (ev) {
    mouse.x = ev.pageX - canvas.offsetLeft;
    mouse.y = ev.pageY - canvas.offsetTop;
    dragging = true;
});
canvas.addEventListener("mousemove", function (ev) {
    if (dragging) {
        mouse.px = mouse.x;
        mouse.py = mouse.y;
        mouse.x = ev.pageX - canvas.offsetLeft;
        mouse.y = ev.pageY - canvas.offsetTop;
        var affectedVertex = findVertex(mouse.x, mouse.y, mouse.effectDistance);
        if (affectedVertex && !affectedVertex.isFixed) {
            affectedVertex.x += (mouse.x - mouse.px) * 10;
            affectedVertex.y += (mouse.y - mouse.py) * 10;
            // console.log((mouse.x - mouse.px) * 10);
            // console.log((mouse.y - mouse.py) * 10);
        }
        // let affectedVertices = findVertices(mouse.x, mouse.y, mouse.effectDistanceSquared);
        // for (let i = 0; i < affectedVertices.length; i++) {
        //     if (!affectedVertices[i][0].isFixed) {
        //         affectedVertices[i][0].x += (mouse.x - mouse.px) * affectedVertices[i][1] / 100;
        //         affectedVertices[i][0].y += (mouse.y - mouse.py) * affectedVertices[i][1] / 100;
        //         console.log((mouse.x - mouse.px) * affectedVertices[i][1] / 100);
        //         console.log((mouse.y - mouse.py) * affectedVertices[i][1] / 100);
        //     }
        // }
    }
});
canvas.addEventListener("mouseup", function (ev) {
    dragging = false;
});
play();
