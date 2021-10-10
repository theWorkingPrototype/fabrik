var canvas = document.getElementsByTagName("canvas")[0], width = innerWidth, height = innerHeight - 10, // to fit in screen size without sroll bars
ctx = canvas.getContext("2d");
canvas.width = width;
canvas.height = height;
ctx.fillStyle = "#51ff0d";
ctx.strokeStyle = "blue";
var rodElasticity = 0; // % of allowed stretch
var ropeElasticity = 5;
var Vertex = /** @class */ (function () {
    function Vertex(x, y, weight, isFixed) {
        if (weight === void 0) { weight = defaultWeightOfVertex; }
        if (isFixed === void 0) { isFixed = false; }
        this.x = x;
        this.y = y;
        this.prevX = x;
        this.prevY = y;
        this.weight = weight;
        this.isFixed = isFixed;
        this.isSelected = false;
    }
    return Vertex;
}());
var Edge = /** @class */ (function () {
    function Edge(vertexA, vertexB, length, elasticity) {
        if (length === void 0) { length = 0; }
        if (elasticity === void 0) { elasticity = defaultElasticity; }
        this.vertexA = vertexA;
        this.vertexB = vertexB;
        this.distance = Math.sqrt(Math.pow(vertexA.x - vertexB.x, 2) + Math.pow(vertexA.y - vertexB.y, 2));
        if (!length)
            this.length = this.distance;
        else
            this.length = length;
        this.elasticity = elasticity;
    }
    return Edge;
}());
// let a= new Vertex();
// let numberOfVerticesPerLine = totalNumberOfVertices / numberOfFixedVertices==0?1:;
var vertices = [];
var edges = [];
//defaults
var defaultRadius = 1;
var defaultElasticity = 0; // width and elasticity 1 for 10% of length can be stretched
var defaultWeightOfVertex = 1; // 1 what? apples?? door hinges per elon musk??
// drawEdges(edges);
// drawVertices(vertices);
function addVertex(x, y, isFixed, weigth) {
    if (isFixed === void 0) { isFixed = false; }
    if (weigth === void 0) { weigth = defaultWeightOfVertex; }
    vertices.push(new Vertex(x, y, weigth, isFixed));
}
function drawVertex(x, y, radius) {
    if (radius === void 0) { radius = defaultRadius; }
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
}
function drawVertices(vertices) {
    ctx.strokeStyle = "#AAAAAA";
    ctx.lineWidth = 2;
    var i = 0;
    for (i = 0; i < vertices.length; i++) {
        ctx.fillStyle = "#c8362e";
        if (vertices[i].isSelected)
            ctx.fillStyle = "#FF885e";
        if (vertices[i].isFixed)
            ctx.fillStyle = "gray";
        drawVertex(vertices[i].x, vertices[i].y);
    }
}
function makeEdgeBetween(vertexA, vertexB, length, elasticity) {
    if (length === void 0) { length = 0; }
    if (elasticity === void 0) { elasticity = defaultElasticity; }
    edges.push(new Edge(vertexA, vertexB, length, elasticity));
}
function drawEdges(edges) {
    // ctx.fillStyle = "#ACD3DE";
    // ctx.strokeStyle = "#ACD3DE";
    ctx.strokeStyle = "gray";
    ctx.lineWidth = 1;
    for (var i = 0; i < edges.length; i++) {
        ctx.beginPath();
        ctx.moveTo(edges[i].vertexA.x, edges[i].vertexA.y);
        ctx.lineTo(edges[i].vertexB.x, edges[i].vertexB.y);
        ctx.stroke();
    }
}
function deleteEdgeContaining(vertex) {
    for (var i = 0; i < edges.length; i++) {
        var edge = edges[i];
        if (edge.vertexA == vertex || edge.vertexB == vertex) {
            edges.splice(i, 1);
            i--;
        }
    }
}
function findVertex(x, y, r) {
    if (r === void 0) { r = defaultRadius; }
    if (!vertices)
        return null;
    for (var i = 0; i < vertices.length; i++) {
        var vertex = vertices[i];
        // console.log(vertex[0], vertex[1], x, y, defaultRadius);
        if (vertex.x >= x - r && vertex.x <= x + r && vertex.y >= y - r && vertex.y <= y + r)
            return vertex;
    }
    return null;
}
function findVertices(x, y, r2) {
    if (!vertices)
        return null;
    var affectedVertices = [];
    for (var i = 0; i < vertices.length; i++) {
        var vertex = vertices[i];
        // console.log(vertex[0], vertex[1], x, y, defaultRadius);
        var d = (vertex.x - x) * (vertex.x - x) + (vertex.y - y) * (vertex.y - y);
        if (d <= r2)
            affectedVertices.push([vertex, d]);
    }
    return affectedVertices;
}
console.log("    ^~^");
console.log("  oRaNge");
// console.log(performance.now() - t0);
