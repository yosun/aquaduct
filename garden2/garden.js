function Furniture (type, size, color) {
	this.type = type;
	this.size = size;
	this.color = color;
//	this.sprite = sprite;
}

var furnitureTypes = [
  	new Furniture('armchair', new Size(50, 50), '#808000'),
	new Furniture('couch', new Size(50, 100), '#800080'),
	new Furniture('bed', new Size(75, 125), '#008080'),
	new Furniture('chair', new Size(25, 25), '#008000'),
	new Furniture('table', new Size(100, 75), '#800000'),
];

function displayAll() {
	//displayBackdrop();
	displaySelectorBar();
	displayGarden();
}

gardenBounds = null;
gridInterval = 40;
function displayGarden() {
	var width = view.viewSize.width - 280;
	var height = view.viewSize.height - 60;
	var x1 = 240;
	var y1 = 20;
	var x2 = x1 + width;
	var y2 = y1 + height;
	gardenBounds = new Rectangle(new Point(x1, y1), new Size(width, height));
    var path = new Path.Rectangle(gardenBounds, 6);
    path.fillColor = '#C08080';
	path.strokeColor = 'black';
	path.data.garden = true;
	for (var i = x1+gridInterval; i < x2; i += gridInterval) {
		var gridLine = new Path.Line(new Point(i, y1), new Point(i, y2));
		gridLine.strokeWidth = 2;
		gridLine.strokeColor = "#808080";
	}
	for (var i = y1+gridInterval/2; i < y2; i += gridInterval) {
		var gridLine = new Path.Line(new Point(x1, i), new Point(x2, i));
		gridLine.strokeWidth = 2;
		gridLine.strokeColor = "#808080";
	}
}

function displaySelectorBar() {
	var bounds = new Rectangle(new Point(20, 20), new Size(200, view.viewSize.height - 60));
	var path = new Path.Rectangle(bounds, 6);
	path.strokeColor = "black";
	path.fillColor = "#00C0C0";
	
	var y = 100;
	var x = 120;
	var increment = 100;
	var furnitureType = null;
	for	(var i = 0; i < furnitureTypes.length; i++) {
		displaySelector(furnitureTypes[i], x, y);
		y += increment;
	} 
}

function displaySelector(selection, x, y) {
	var circle = new Shape.Circle({
		center: [x, y],
		radius: 40,
		strokeColor: 'black',
		fillColor: '#C0C0C0'
	});
	var iconRadius = 20;
	var rectangle = new Rectangle(new Point(x-iconRadius, y-iconRadius),
			new Size(iconRadius*2, iconRadius*2));
	var icon = new Shape.Rectangle(rectangle);
	icon.rotate(45);
	icon.fillColor = selection.color;
	icon.data.selector = true;
	icon.data.furniture = selection;
	icon.data.position = new Point(x, y);
	circle.data.selector = true;
	circle.data.furniture = selection;
	circle.data.position = new Point(x, y);
	/*var label = new PointText({
		content: selection.type,
		point: new Point(x, y),
		fillColor: 'black';
	});
	*/
}

function generateID() {
	var s = "";
	for (var i = 0; i < 9; i++) {
		s += Math.floor(Math.random() * 0x10000).toString(16).substring(1);
	}
	return s;
}

function instantiate(furniture, position) {
	type = furniture.type;
	size = furniture.size;
	color = furniture.color;
	objectID = generateID();
	//alert(objectID);

	var rectangle = new Rectangle(position, size);
	var sprite = new Path.Rectangle(rectangle, 4);
	sprite.strokeColor = "black";
	sprite.fillColor = color;

	sprite.data.id = objectID;
	
	sprite.data.type = type;
	sprite.data.width = size.width;
	sprite.data.height = size.height;
	sprite.data.angle = 0;
	sprite.data.wall = false;
	sprite.data.movable = true;
	
	var canvas = document.getElementById('garden');
	var mc = new Hammer.Manager(canvas);
	var rotate = new Hammer.Rotate();

	mc.add(rotate);

	mc.on("rotate", handleRotate);

}

function handleRotate(event) {
	var angle = event.rotation / 100;
	current.data.angle = (angle)%15;
	current.rotate(angle);
}


var start, path, line;
function snap(point) {
	// adjust = true  ->  adjust 
	var interval = gridInterval;
	pointAdjust = point + interval/2;
	
	return pointAdjust - (pointAdjust%interval);
//	return point - (point % interval);
}



current = null;

function onMouseDown(event) {
	start = path = line = null;
	var hitResult = project.hitTest(event.point);
	if (hitResult) {
		var result = hitResult.item;
		if (result.data.movable) {
			path = result;
			current = path;
			
		}
		else if (result.data.selector) {
			instantiate(result.data.furniture, result.data.position);
		}
		else if (result.data.garden) {
			//line = new Path.Line(event.point, event.point);
			start = new Segment(snap(event.point));
	//		line = new Path(new Segment(event.point))
			line = new Path();
			line.position = event.point;
		//	line.fullySelected = true;

			line.data.id = generateID();
			line.data.type = "wall";	
			line.data.wall = true;
			line.data.movable = true;
			line.strokeColor = 'black';
			line.strokeWidth = 8;
			line.add(start);
			
			path = null;
		}
	}
}


function updateData(object) {
	var url = "http://localhost/index.php";
	var data = object.data;
	//data['x'] = object.position.x;
//	data['y'] = object.position.y;

//var data = "";
//	var data = 
//alert(JSON.stringify(data));
	var func = function(result) {console.log(result);};
	console.log(data);
	$.post(url, data, func);

}


function onMouseUp(event) {
	if (path) {
		if (path.data.wall) {
			var seg = path.firstSegment.point;
			var newSeg = snap(seg);
			var diff = newSeg-seg;
			path.position += diff;
			path.data.x = seg.x;
			path.data.y = seg.y;
//			var s2 = path.lastSegment.point;
//			var correction = (s1-s2)/(gridInterval)%2;
		//	alert(correction);
//			path.position -= correction*gridInterval/2;
		}
		else {

			path.position = snap(path.position, path);
			path.data.x = path.position.x;
			path.data.y = path.position.y;
		}
		updateData(path);
		path = null;
	}
	else if (line) {
		var s1 = line.firstSegment.point;
		var s2 = line.lastSegment.point;
		var diff = s2-s1;
		line.data.x = s1.x;
		line.data.y = s1.y;
		line.data.dx = diff.x;
		line.data.dy = diff.y;
		updateData(line);
		line = null;
	}
//	else if (line) {
//		if (gardenBounds.contains(event.point)) {
//			line.removeSegments(1);
//			line.add(snap(event.point));
}

function onMouseDrag(event) {
	if (path) {
		path.position += event.delta;
	}
	else if (line) {
		if (gardenBounds.contains(event.point)) {
			line.removeSegments(1);
			var s = new Segment(snap(event.point));
			line.add(s);

			//updateData(line);
			//segs = line.segments;
		////	var newLine = new Path.Line(line.data.start, event.point);
	//		newLine.data.start = line.data.start;
	//		newLine.data.start = new Point(0, 0);
			
		//	line.replaceWith(newLine);
			//line.addSegment(new Point(event.point));
		//	var s = "";
		//	s = Math.floor(Math.random() * 0x1000000).toString(16);
	//		line.strokeColor = '#'+s;
	//			line.smooth();//
		//	line.strokeWidth = 4;
			
		
		}
	}
}

function onResize() {
	//displayAll();
}

displayAll();


