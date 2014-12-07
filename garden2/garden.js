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


idMap = {};

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
	idMap[sprite.id] = sprite;
	
	var canvas = document.getElementById('garden');
	var mc = new Hammer.Manager(canvas);
	var rotate = new Hammer.Rotate();

	mc.add(rotate);

	mc.on("rotate", handleRotate);

}

function handleRotate(event) {
	var angle = event.angle / 100;
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

wallGraph = {};
gridpointRadius = 15;
connectWalls = null;
connectedPieces = null;
function onMouseDown(event) {
	connectWalls = [];
	start = path = line = null;
	connectedPieces = null;
	nearest = snap(event.point);
	connector = false;
	if (nearest.isClose(event.point, gridpointRadius) && gardenBounds.contains(event.point)) {
	
		var items = project.getItems({
			class: Path
		});
		
		for (var i = 0; i < items.length; ++i) {
			var item = items[i];
			if (item.data.wall) {	
				if (nearest.equals(item.firstSegment.point) ||
					nearest.equals(item.lastSegment.point)) {
					//item.strokeColor = "red";
					connectWalls.push(item);
				}
				
			}
			
		}
	}
	
	var hitResult = project.hitTest(event.point);
	if (hitResult) {
		var drawLine = false;
		var result = hitResult.item;
		if (result.data.movable) {
			if (result.data.wall) {
			//	console.log(connectWalls);
/*				if (connectWalls && connectWalls.length > 0 && (connectWalls[0].id != result.id)) {
					connectWalls.push(result);
					connect(nearest);
				}
			*/
				if (connectWalls && connectWalls.length > 0) {
					if (connectWalls.length > 1) {
						connect(nearest);
					}
					else
					{
						drawLine = true;
					}
				}
				else {
			
					connectedPieces = dfs(result);
//					result.data.group = connectedPieces;
//					path = result;
					console.log('cluster:  .. ' + connectedPieces);
			  	  	/*
					if (connectedPieces.length > 1) {
						var group = new Group(connectedPieces);
						path = group;
						path.data.cluster = true;
					}
					
					else {
						path = result;
					}
					*/
					path = result;
					
				}
			}
			else
			{
				path = result;
				current = path;
			}
		}
		else if (result.data.connector) {
			disconnect(result);
		}
		else if (result.data.selector) {
			instantiate(result.data.furniture, result.data.position);
		}
		else if (result.data.garden) {
			//line = new Path.Line(event.point, event.point);
			if (connectWalls && connectWalls.length > 1) {
				connect(nearest);
				
			}
			else {
				drawLine = true;
			}
		}
		
		if (drawLine) {
			start = new Segment(snap(event.point));
//			line = new Path(new Segment(event.point))
			line = new Path();
			line.position = event.point;
	//	line.fullySelected = true;

			line.data.id = generateID();
			line.data.type = "wall";	
			line.data.wall = true;
			line.data.movable = true;
			line.strokeColor = 'black';
			line.strokeWidth = 8;
			line.data.x = start.point.x;
			line.data.y = start.point.y;
			line.data.dx = 0;
			line.data.dy = 0;
			line.add(start);
			line.selectable = true;
			idMap[line.id] = line;
		
			path = null;
			
		}
	}
}



function connect(pt) {

	var connector = new Shape.Circle(pt, 10);
	connector.data.connector = true;
	connector.fillColor = "blue";
	wallGraph[connector.id] = {};
	idMap[connector.id] = connector;
	
	for (var i = 0; i < connectWalls.length; ++i) {
		var x = connectWalls[i];
		if (wallGraph[x.id] == null) {
			wallGraph[x.id] = {};
		}
		
		wallGraph[x.id][connector.id] = true;
		wallGraph[connector.id][x.id] = true;
	}
	console.log(wallGraph);
}

function disconnect(connector) {
	var walls = [];
	for (var i in wallGraph[connector.id]) {
		if (wallGraph[connector.id].hasOwnProperty(i)) {
			var wall = idMap[i];
		//	console.log(wall);
			walls.push(wall);
		}
	}
//	console.log(walls);
	for (var i = 0; i < walls.length; i++) {
		var x = walls[i];
		delete wallGraph[x.id][connector.id];
		//delete wallGraph[connector.id][x.id];
	}
	delete wallGraph[connector.id];
	//alert('hi');
	connector.remove();
	console.log(wallGraph);
}

function updateData(object) {
	var url = "http://localhost/bss/aquaduct/server.dump.php";
	object.data.x = -object.data.x;
	object.data.dx = -object.data.dx;
	var data = object.data;
	//data['x'] = object.position.x;
//	data['y'] = object.position.y;

//var data = "";
//	var data = 
//alert(JSON.stringify(data));
	var jsondata = {
		jsondump: JSON.stringify(data)
	};
	var func = function(result) {console.log(result);};
	console.log(jsondata);
	$.post(url, jsondata, func);

}



function onMouseUp(event) {
	if (path) {
		if (path.data.wall) {
			if (connectedPieces) {
				for (var i = 0; i < connectedPieces.length; i++) {
					var piece = connectedPieces[i];
					if (piece.data.connector) {
						piece.position = snap(piece.position);
					}
					if (piece.data.wall) {
						var seg = piece.firstSegment.point;
						var newSeg = snap(seg);
						var diff = newSeg-seg;
						piece.position += diff;
						piece.data.x = seg.x;
						piece.data.y = seg.y;
						
						
			
						updateData(piece);
					}
				
				}
			}
			path = null;
			connectedPieces = null;
			
			/*
			var seg = path.firstSegment.point;
			var newSeg = snap(seg);
			var diff = newSeg-seg;
			path.position += diff;
			path.data.x = seg.x;
			path.data.y = seg.y;
			*/
			
			
//			var s2 = path.lastSegment.point;
//			var correction = (s1-s2)/(gridInterval)%2;
		//	alert(correction);
//			path.position -= correction*gridInterval/2;
		}
	/*	else if (path.data.cluster) {
			var child = null;
			for (var i = 0; i < path.children.length; i++) {
				child = path.children[i];
				if (child.data.connector) {
					break;
				}
			}
			console.log('c' + child);
			var childPoint = child.position;
			console.log(childPoint);
			var adjust = snap(childPoint) - childPoint;
			path.position += adjust;
			path.remove();
		}
		*/
		else {

			path.position = snap(path.position);
			path.data.x = path.position.x;
			path.data.y = path.position.y;
			
			updateData(path);
			path = null;
		}
	}	
	
	else if (line) {
		var s1 = line.firstSegment.point;
		var s2 = line.lastSegment.point;
		var diff = s2-s1;
		line.data.x = s1.x;
		line.data.y = s1.y;
		line.data.dx = diff.x;
		line.data.dy = diff.y;
		if (diff.x != 0 || diff.y != 0) {
			updateData(line);
		}
		else
		{
			line.remove();
		}
		line = null;
	}
//	else if (line) {
//		if (gardenBounds.contains(event.point)) {
//			line.removeSegments(1);
//			line.add(snap(event.point));
}

function dfs(root) {
	var visited = [];
	var stack = [root.id.toString()];
	while (stack.length > 0) {
		var node = stack.pop(0);
		visited.push(node);
		for (var next in wallGraph[node]) {
			if (wallGraph[node].hasOwnProperty(next)) {
				if ($.inArray(next, visited) == -1) {
					stack.push(next);
				}
			}
		}
	}
	console.log(visited);
	var ret = [];
	for (var i = 0; i < visited.length; i++) {
		ret.push(idMap[visited[i]]);
	}
	return ret;
}

function onMouseDrag(event) {
	if (path) {
		if (path.data.wall) { // || path.data.cluster) {
			if (connectedPieces) {
				for (var i = 0; i < connectedPieces.length; i++) {
					var piece = connectedPieces[i];
					piece.position += event.delta;
				}
			}
		
		//	var components = dfs(path);
			//console.log(components);
			
	//		var group = new Group(path.data.group);
	//		group.position += event.delta;
		//	console.log(group);
		/*	for (var i = 0; i < group.length; ++i) {
				var piece = group[i];
				piece.position += event.delta;
			
			}
			*/
			//path.position += event.delta;
			
		}
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


