/*
The Game Project final – make it awesome part 2
 */
var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
let isFalling;
let isPlummeting;
var collectables;
var lifeCollectables;
var canyons;
var tree;
var cloud;
var cloudsScale;
var mountain;
var cameraPosX;
var game_score;
var flagpole;
var lives;
let cameraPosY;
var jumpSound;
var platforms = [];
var enemies;
var emit;
let emits = [];
let stars = [];

function preload(){
	soundFormats('mp3', 'wav');
	//load sound
	jumpSound = loadSound('assets/jump.wav');
	jumpSound.setVolume(0.1);
	dieSound = loadSound('assets/die.mp3');
	dieSound.setVolume(0.1);
	winSound = loadSound('assets/win.mp3');
	winSound.setVolume(0.1);
}
function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
	//Move collectable and canyon with this code - code for specific collectable locations
	lifeCollectables = [{x_pos: 400, y_pos: floorPos_y -50, isFound: false},
		{x_pos: -980, y_pos: -20, isFound: false},
		{x_pos: 1350, y_pos: -50, isFound: false}]; 	
	collectables = [{x_pos: 70 + random(0,10), y_pos: floorPos_y -50 , size: 50, isFound: false, isShakeingCount: 0}, 
		{x_pos: 300 + random(0,10), y_pos: floorPos_y -50 , size: 50, isFound: false, isShakeingCount: 0}, 
		{x_pos: 1200 + random(0,10), y_pos: floorPos_y -50 , size: 50, isFound: false, isShakeingCount: 0},
		{x_pos: 600 + random(0,10), y_pos: floorPos_y -50 , size: 50, isFound: false, isShakeingCount: 0},
		{x_pos: 600 + random(0,10), y_pos: floorPos_y -250 , size: 50, isFound: false, isShakeingCount: 0},
		{x_pos: 1100 + random(0,10), y_pos: -100 , size: 50, isFound: false, isShakeingCount: 0},
		{x_pos: 2320 + random(0,10), y_pos: floorPos_y -50 , size: 50, isFound: false, isShakeingCount: 0},
		{x_pos: -1100 + random(0,10), y_pos: -100 , size: 50, isFound: false, isShakeingCount: 0}];
	
	canyons = [{x_pos: 200, y_pos: floorPos_y, width: 70, canyonWaterYFalls: floorPos_y + 10}, 
		{x_pos: 400, y_pos: floorPos_y, width: 70, canyonWaterYFalls: floorPos_y + 10},
		{x_pos: 850, y_pos: floorPos_y, width: 150, canyonWaterYFalls: floorPos_y + 10},
		{x_pos: 3000, y_pos: floorPos_y, width: 1000, canyonWaterYFalls: floorPos_y + 10},
		{x_pos: 2300, y_pos: floorPos_y, width: 50, canyonWaterYFalls: floorPos_y + 10},
		{x_pos: -2000, y_pos: floorPos_y, width: 1000, canyonWaterYFalls: floorPos_y + 10}];

	//Add/subtract this array to change trees x location
	tree = {
		pos_x: [10, 300, 450, 900, 1150. -500, -700, 1000, 1800, 2500, 2700], 
		pos_y: (height/2 - 20) + 62,
		TrunkHeight: 130,
		radius: 40
	}
	//Add/subtract this array to change clouds x and y location
	cloud = {
		cloudX : [random(0,width), random(0,width), random(0,width), random(0,width), random(0,width)],
		cloudY : [random(20,180),random(20,180),random(20,180),random(20,180),random(20,180)],
		cloudSize : 30,
		cloudColour : fill(255, 255, 255, 0),
		cloudScale : [random(0.5,2),random(0.5,2),random(0.5,2),random(0.5,2),random(0.5,2)]

	}
	//Mountains
	mountain = {
		pos_x: [100, 350, 800, -1000, -300, 1200, 1700, 2200],
		pos_y : floorPos_y
	}
	cameraPosX = 0;

	game_score = 0;
	flagpole ={
		x_pos: 2800,
		isReached: false
	}
	lives =3;
	//draw idividual platforns
	var platformsarr;
	platformsarr = [{x: 350, y: 340, l:200},
		{x: 550, y: 240, l:200},
		{x: 1050, y: 340, l:200},
		{x: 1050, y: 240, l:200},
		{x: 1050, y: 140, l:200},
		{x: -1050, y: 140, l:200},
		{x: -1050, y: 240, l:200},
		{x: -1050, y: 340, l:200},
		{x: -1050, y: 40, l:200},
		{x: 1050, y: 40, l:300},
		{x: 1450, y: 40, l:200},];

	for(var i = 0; i < platformsarr.length; i++){
		platforms.push(new Platforms(platformsarr[i].x, platformsarr[i].y, platformsarr[i].l));
	}
	//crate enemies
	enemies = [];
	enemies.push(new Enemy(1, floorPos_y - 20, 100))
	enemies.push(new Enemy(1750, floorPos_y - 20, 100))
	enemies.push(new Enemy(500, 300 - 20, 100))
	enemies.push(new Enemy(1350, 35 - 20, 100))
	//create stars
	for(var i = 0; i < 200; i++){
		stars.push({x:random(0, width),y: random(0, height)});
	}
	//init Enemies
	emit = new Emitter("" ,"" , 0, -1, 5, color(200,0,0, 200));
	emit.startEmitter(100, 80);	
}
function draw()
{
	///////////DRAWING CODE//////////
	if (gameChar_y > height + 500){
		background(255, 120,120 );
	}
	else{
		background(150,150,150); //fill the sky blue
	}
	//draw stars
	for(var i = 0; i < 200; i++){
		stroke(255);
		point(stars[i].x, stars[i].y);
	}
	// draw moon
	noStroke();
	fill(255,255,255,200)
	ellipse(width - 80, 100, 100);
	//Code for side scrolling
	push()
	const newCameraPosY = gameChar_y - width / 2;
	cameraPosY = gameChar_y - floorPos_y;
	cameraPosY = cameraPosY * 0.945 + newCameraPosY * 0.055;
	translate(-cameraPosX, -cameraPosY);
	
	fill(0,155,0);
	rect(-1000, floorPos_y, +4000, height - floorPos_y); //draw some green ground
	fill(255, 0, 0);
	rect(-2000, height, + 5800, 800);
	//translate(-cameraPosX, 0);

	//Clouds
	for(var i = 0; i <= cloud.cloudX.length ; i++){
		drawClouds(i);
	}
	//Mountain
	drawMountains()

	// Draw the trees
	drawTrees();

	//draw the canyon (my waterfall)
	for(var i = 0; i < canyons.length; i ++){
		checkCanyon(canyons[i]);
	}
	//draw collectable
	for(var i = 0; i < collectables.length; i ++){
		
		if(!collectables[i].isFound){
			checkCollectable(collectables[i]);	
			drawCollectable(collectables[i]);	
			
		}
	}
	for(var i = 0; i < lifeCollectables.length; i ++){		
		if(!lifeCollectables[i].isFound){
			fill(255,0,0);
			checkLifeCollectable(lifeCollectables[i]);	
			drawLifeCollectable(lifeCollectables[i]);					
		}
	}
	// Draw flagpole
	renderFlagpole()
	// Draw Character
	drawCharacter();
	// Draw Platforms
	platforms.forEach(p => p.drawPlatform());
	for(var i =0; i < enemies.length; i++){
		enemies[i].draw();
		var isContact = enemies[i].checkContact(gameChar_x, gameChar_y);
		if (isContact){
			if(lives > 0){
				startGame();
				break;

			}
		}
	}
	pop()
	textAlign(LEFT);
	fill(0);
	stroke(5);
	textSize(30);
	text("Score: " + game_score, 20, 40);
	if(flagpole.isReached == false){
		checkFlagpole();
	}
	for (var i = 0; i < lives; i++){
		fill(255,0,0);
		heart(800 + (i * 30),20,30);
	}
	checkPlayerDie();
	if(lives < 1){
		fill(0);
		stroke(5);
		textSize(80);
		textAlign(CENTER);
		text("Game over", width/2, height/2 - 80);
		text("Press space to continue", width/2, height/2+ 80);		
		if(key == ' '){
			setup();
		}
	}
	if(flagpole.isReached == true){
		fill(0);
		stroke(5);
		textSize(80);
		textAlign(CENTER);
		text("Level complete", width/2, height/2 - 80);
		text("Press space to continue", width/2, height/2+ 80);

		if(key == ' '){
			setup();
		}
	}
	//INTERACTION CODE
	interaction();	
}

function interaction(){
	if (isLeft == true){
		gameChar_x -=3;
		cameraPosX -=3;
	}
	if (isRight){
		gameChar_x +=3;
		cameraPosX +=3;
	}

	isFalling =false
	if(gameChar_y < floorPos_y){
		isFalling = true;
		for(let i = 0; i < platforms.length; i++){
			if(platforms[i].contact()){
				isFalling = false;
				break;
			}
			
		}
		if(isFalling){
			if (gameChar_y > height + 500){
				//
			}
			else{
				gameChar_y += 3;
			}
			
		}
	}
	if (isPlummeting){
		if(gameChar_y > height + 500){
			//
		}
		else{
			gameChar_y += 3;
		}
		
		isLeft = false;
		isRight = false;
	}
	else{
		isPlummeting = false;
	}
}
function keyPressed()
{
	if (key == "d" && isPlummeting == false){
		if(flagpole.isReached || lives <= 0){
			//
		}
		else{
			isRight = true;
		}		
	}
	if (key == "a" && isPlummeting == false){
		if(flagpole.isReached || lives <= 0){
			//
		}
		else{
			isLeft = true;
		}
	}
	if (key == "w" && isPlummeting == false){
		if (isFalling || flagpole.isReached || lives <= 0){
			//
		}
		else{
			gameChar_y -= 130;
			jumpSound.play();
		}
	}
}
function keyReleased()
{
	if (key == "d"){
		isRight = false;
	}
	if (key == "a"){
		isLeft = false;
	}
}
function drawClouds(i){
	fill(255, 255, 255, 220)
	ellipse(cloud.cloudX[i],cloud.cloudY[i] ,cloud.cloudSize * cloud.cloudScale[i])
	ellipse(cloud.cloudX[i] +((cloud.cloudSize/1.5)*cloud.cloudScale[i]),cloud.cloudY[i] ,(cloud.cloudSize*1.2)*cloud.cloudScale[i])
	ellipse(cloud.cloudX[i] +((cloud.cloudSize*1.5)*cloud.cloudScale[i]),cloud.cloudY[i] ,(cloud.cloudSize*1.5)*cloud.cloudScale[i])		
	if(cloud.cloudX[i] > gameChar_x + 700){
		cloud.cloudX[i] =  random(gameChar_x-700 ,gameChar_x-1000);
	}
	if(cloud.cloudX[i] < gameChar_x + 700){
		cloud.cloudX[i] += 4;
	}
}
function drawMountains(){
	for(var i = 0; i < mountain.pos_x.length; i++)
	{
		fill(90);
		triangle(mountain.pos_x[i] , mountain.pos_y ,mountain.pos_x[i] + 100, mountain.pos_y - 200 ,mountain.pos_x[i] + 200,mountain.pos_y);
		triangle(mountain.pos_x[i] - 50, mountain.pos_y ,mountain.pos_x[i] + 50 ,mountain.pos_y - 150 ,mountain.pos_x[i] + 150, mountain.pos_y);
	}
}
function drawTrees(){
	for(var i = 0; i < tree.pos_x.length; i++){
		noStroke();
		fill(139,69,19);
		rect(tree.pos_x[i], tree.pos_y, tree.radius, tree.TrunkHeight - 25, 2)
		fill(0,255,0);
		fill(0,255,0);
		triangle(tree.pos_x[i] - 40, tree.pos_y, tree.pos_x[i] + 80, tree.pos_y, tree.pos_x[i] + 20, tree.pos_y -50)
		triangle(tree.pos_x[i] - 45, tree.pos_y + 10, tree.pos_x[i] + 85, tree.pos_y + 10, tree.pos_x[i] + 20, tree.pos_y - 40)

		fill(139,69,19);
		rect(tree.pos_x[i] + 50, tree.pos_y + 20, tree.radius, tree.TrunkHeight - 44, 2)
		fill(0,255,0);
		triangle(tree.pos_x[i] + 10, tree.pos_y + 20, tree.pos_x[i] + 125, tree.pos_y + 20, tree.pos_x[i] + 70, tree.pos_y - 30)
		triangle(tree.pos_x[i] + 5, tree.pos_y + 30, tree.pos_x[i] + 130, tree.pos_y + 30, tree.pos_x[i] + 70, tree.pos_y - 20)
	
	}
}
function checkCollectable(t_collectable){
	if (dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos + 50 ) <= 35){
		t_collectable.isFound = true;
	}
	if(t_collectable.isFound == true){
		fill(0);
		game_score += 1;
	}
}
function drawCollectable(t_collectable){
	if(t_collectable.isFound == false){
		fill(255, 255, 0);
		noStroke();
		beginShape();
		if (t_collectable.isShakeingCount <=20){
			t_collectable.shakeCollectableX = random(0,3);
			t_collectable.isShakeingCount +=1;
		}
		if (t_collectable.isShakeingCount > 20){
			t_collectable.isShakeingCount = 0;
		}		
		vertex(t_collectable.x_pos + t_collectable.shakeCollectableX , t_collectable.y_pos - 30);// 100 = 450
		vertex(t_collectable.x_pos - 20 + t_collectable.shakeCollectableX, t_collectable.y_pos);
		vertex(t_collectable.x_pos + t_collectable.shakeCollectableX, t_collectable.y_pos + 40);
		vertex(t_collectable.x_pos + 20 + t_collectable.shakeCollectableX, t_collectable.y_pos);
		endShape();
	}
}
function checkCanyon(t_canyon){	
	fill(255, 0, 0);
	noStroke();
	rect(t_canyon.x_pos, t_canyon.y_pos , t_canyon.width, height - t_canyon.y_pos)
	stroke(255);
	canyonWaterX = t_canyon.x_pos + 10, t_canyon.x_pos + t_canyon.width - 20;	
	if(t_canyon.canyonWaterYFalls < height){
		t_canyon.canyonWaterYFalls = t_canyon.canyonWaterYFalls + 3;
	}
	if(t_canyon.canyonWaterYFalls > height - 10){
		t_canyon.canyonWaterYFalls = t_canyon.y_pos+ 10;
	}
	for (var i = 0; i < (t_canyon.width/10)-1; i++){
		line(canyonWaterX,t_canyon.y_pos+ 10,canyonWaterX, t_canyon.canyonWaterYFalls);
		canyonWaterX += 10;
	}

	if(gameChar_x > t_canyon.x_pos && gameChar_x < t_canyon.x_pos + t_canyon.width && gameChar_y >= floorPos_y ){
		isPlummeting = true;
		
	}
}
function renderFlagpole(){
	push()
	strokeWeight(10);
	stroke(180);
	line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
	pop()
	noStroke()

	if (!flagpole.isReached){
		fill(255,0,0);
		rect(flagpole.x_pos + 10, floorPos_y - 250, 100, 50);
		fill(255,255,0);
		ellipse(flagpole.x_pos + 60, floorPos_y - 225, 50);	
	}
	if(flagpole.isReached){
		fill(255,0,0);
		rect(flagpole.x_pos + 10, floorPos_y - 50, 100, 50);
		fill(255,255,0);
		ellipse(flagpole.x_pos + 60, floorPos_y - 25, 50);	
	}
}
function checkFlagpole(){
	var d = abs(gameChar_x - flagpole.x_pos)
	if(d < 15){
		flagpole.isReached = true;
	}
	else{
		flagpole.isReached = false;
	}

}
function checkPlayerDie(){
	if(gameChar_y > height + 100){
		lives -= 1;
		if(lives > 0){
			startGame();
		}
	
	}
}
function startGame(){
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
	shakeCollectableX = random(0,10);	
	canyons = [{x_pos: 200, y_pos: floorPos_y, width: 70, canyonWaterYFalls: floorPos_y + 10}, 
		{x_pos: 400, y_pos: floorPos_y, width: 70, canyonWaterYFalls: floorPos_y + 10},
		{x_pos: 850, y_pos: floorPos_y, width: 150, canyonWaterYFalls: floorPos_y + 10},
		{x_pos: 3000, y_pos: floorPos_y, width: 1000, canyonWaterYFalls: floorPos_y + 10},
		{x_pos: 2300, y_pos: floorPos_y, width: 50, canyonWaterYFalls: floorPos_y + 10},
		{x_pos: -2000, y_pos: floorPos_y, width: 1000, canyonWaterYFalls: floorPos_y + 10}];
	//Add/subtract this array to change trees x location
	tree = {
		pos_x: [10, 300, 450, 900, 1150. -500, -700, 1000, 1800, 2500, 2700], 
		pos_y: (height/2 - 20) + 62,
		TrunkHeight: 130,
		radius: 40
	}
	//Add/subtract this array to change clouds x and y location
	cloud = {
		cloudX : [random(0,width), random(0,width), random(0,width), random(0,width), random(0,width)],
		cloudY : [random(20,180),random(20,180),random(20,180),random(20,180),random(20,180)],
		cloudSize : 30,
		cloudColour : fill(255, 255, 255, 0),
		cloudScale : [random(0.5,2),random(0.5,2),random(0.5,2),random(0.5,2),random(0.5,2)]

	}
	//Mountains
	mountain = {
		pos_x: [100, 350, 800, -1000, -300, 1200, 1700, 2200],
		pos_y : floorPos_y
	}	
	cameraPosX = 0;
	var platformsarr;
	platformsarr = [{x: 350, y: 340, l:200},
		{x: 550, y: 240, l:200},
		{x: 1050, y: 340, l:200},
		{x: 1050, y: 240, l:200},
		{x: 1050, y: 140, l:200},
		{x: -1050, y: 140, l:200},
		{x: -1050, y: 240, l:200},
		{x: -1050, y: 340, l:200},
		{x: -1050, y: 40, l:200},
		{x: 1050, y: 40, l:300},
		{x: 1450, y: 40, l:200},];

	for(var i = 0; i < platformsarr.length; i++){
		platforms.push(new Platforms(platformsarr[i].x, platformsarr[i].y, platformsarr[i].l));
	}
}
// Heart function found https://editor.p5js.org/Mithru/sketches/Hk1N1mMQg

function heart(x, y, size) {
	beginShape();
	vertex(x, y);
	bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
	bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
	endShape(CLOSE);
  }
function checkLifeCollectable(t_lifeCollectable){
	if (dist(gameChar_x, gameChar_y, t_lifeCollectable.x_pos, t_lifeCollectable.y_pos + 50 ) <= 30){
		t_lifeCollectable.isFound = true;
	}
	if(t_lifeCollectable.isFound == true){
		lives += 1;
	}
}
function drawLifeCollectable(t_lifeCollectable){
	if(t_lifeCollectable.isFound == false){
		fill(235,52,116);
		heart(t_lifeCollectable.x_pos, t_lifeCollectable.y_pos, 20);
	}
}
function drawCharacter(){
	if(isLeft && isFalling)
	{
		stroke(0);
		fill(200,100,150);
		ellipse(gameChar_x,gameChar_y - 55,34,34);
		fill(255);
		ellipse(gameChar_x - 12,gameChar_y -57, 6, 8);
		fill(0);
		ellipse(gameChar_x - 12,gameChar_y -57, 1, 1);
		fill(255,0,0);
		rect(gameChar_x -10,gameChar_y - 38, 20, 35);	
		fill(0);
		rect(gameChar_x + 5,gameChar_y-5,10,10);	
		fill(0);
		rect(gameChar_x -7,gameChar_y-5,10,10);	
		fill(180,0,0);	
		rect(gameChar_x -7, gameChar_y - 35 - 20, 7, 22);

	}
	else if(isRight && isFalling)
	{
		stroke(0);
		fill(200,100,150);
		ellipse(gameChar_x,gameChar_y - 55,34,34);
		fill(255);
		ellipse(gameChar_x + 12,gameChar_y -57, 6, 8);
		fill(0);
		ellipse(gameChar_x + 12,gameChar_y -57, 1, 1);
		fill(255,0,0);
		rect(gameChar_x -10,gameChar_y - 38, 20, 35);	
		fill(0);
		rect(gameChar_x -15,gameChar_y-5,10,10);	
		fill(0);
		rect(gameChar_x -3,gameChar_y-5,10,10);	
		fill(180,0,0);
		rect(gameChar_x , gameChar_y - 35 - 20, 7, 22);

	}	
	else if(isLeft)
	{
		stroke(0);
		fill(200,100,150);
		ellipse(gameChar_x,gameChar_y - 55,34,34);
		fill(255);
		ellipse(gameChar_x - 12,gameChar_y -57, 6, 8);
		fill(0);
		ellipse(gameChar_x - 12,gameChar_y -57, 1, 1);
		fill(255,0,0);
		rect(gameChar_x -10,gameChar_y - 38, 20, 35);	
		fill(0);
		rect(gameChar_x -2,gameChar_y-5,10,10);
		fill(0);
		rect(gameChar_x -7,gameChar_y-5,10,10);	
		fill(180,0,0);	
		rect(gameChar_x -7, gameChar_y - 15 - 20, 7, 22);
	}
	else if(isRight)
	{
		stroke(0);
		fill(200,100,150);
		ellipse(gameChar_x,gameChar_y - 55,34,34);
		fill(255);
		ellipse(gameChar_x + 12,gameChar_y -57, 6, 8);
		fill(0);
		ellipse(gameChar_x + 12,gameChar_y -57, 1, 1);
		fill(255,0,0);
		rect(gameChar_x -10,gameChar_y - 38, 20, 35);	
		fill(0);
		rect(gameChar_x -8,gameChar_y-5,10,10);	
		fill(0);
		rect(gameChar_x -3,gameChar_y-5,10,10);	
		fill(180,0,0);
		rect(gameChar_x , gameChar_y - 15 - 20, 7, 22);
	}
	else if(isFalling || isPlummeting)
	{
		stroke(0);
		fill(200,100,150);
		ellipse(gameChar_x,gameChar_y - 55,34,34);
		fill(255);
		ellipse(gameChar_x - 8,gameChar_y -57, 8, 8);
		ellipse(gameChar_x + 8,gameChar_y -57, 8, 8);
		fill(0);
		ellipse(gameChar_x - 8,gameChar_y -57, 1, 1);
		ellipse(gameChar_x + 8,gameChar_y -57, 1, 1);
		fill(255,0,0);
		rect(gameChar_x -13,gameChar_y - 38, 26, 35);	
		fill(0);
		rect(gameChar_x -15,gameChar_y-5,10,10);	
		fill(0);
		rect(gameChar_x + 5,gameChar_y-5,10,10);	
		fill(180,0,0);
		rect(gameChar_x -20, gameChar_y - 35 - 20, 7, 22);
		rect(gameChar_x +13, gameChar_y - 35 - 20, 7, 22);
	}
	else
	{
		stroke(0);
		fill(200,100,150);
		ellipse(gameChar_x,gameChar_y - 55,34,34);
		fill(255);
		ellipse(gameChar_x - 8,gameChar_y -57, 8, 8);
		ellipse(gameChar_x + 8,gameChar_y -57, 8, 8);
		fill(0);
		ellipse(gameChar_x - 8,gameChar_y -57, 1, 1);
		ellipse(gameChar_x + 8,gameChar_y -57, 1, 1);
		fill(255,0,0);
		rect(gameChar_x -13,gameChar_y - 38, 26, 35);	
		fill(0);
		rect(gameChar_x -15,gameChar_y-5,10,10);
		fill(0);
		rect(gameChar_x + 5,gameChar_y-5,10,10);	
		fill(180,0,0);
		rect(gameChar_x -20, gameChar_y - 35, 7, 22);
		rect(gameChar_x +13, gameChar_y - 35, 7, 22);
	}
  }
function Platforms(x, y, l){
	this.x = x;
	this.y = y;
	this.length = l;

	this.drawPlatform = function(){
		push();
		noStroke()
		fill(0,155,0);
		rect(this.x, this.y, this.length, 15);
		pop();
	}
	this.contact = function(){
		if(isFalling){
			if(gameChar_x + 10 > this.x && gameChar_x - 10 < this.x + this.length &&
				gameChar_y + 6 > this.y && gameChar_y < this.y ){
					return true;
				}
		}
		else{
			return false;
		}
		
	}
	
}
function Enemy(x, y, range)
{
	this.x = x; 
	this.y = y;
	this.range = range;
	this.currentX = x;
	this.inc = 1;
	this.update = function(){
		this.currentX += this.inc;

		if(this.currentX >= this.x + this.range){
			this.inc = -1;
		}
		else if(this.currentX < this.x){
			this.inc = 1;
		}

	}
	this.draw = function()
	{
		this.update();

		noStroke();
		emit.updateParticles();
		emit.x = this.currentX;
		emit.y = this.y;
	}
	this.checkContact = function(gameChar_x, gameChar_y)
	{
		var d = dist(gameChar_x, gameChar_y, this.currentX , this.y + 25);		
		if(d < 33){
			lives -= 1;
			return true;
		}
		return false;
	}

}
function Particle(x,y, xSpeed, ySpeed, size, colour){
	this.x = x;
	this.y = y;
	this.xSpeed = xSpeed;
	this.ySpeed = ySpeed;
	this.size = size;
	this.colour = colour;
	this.age = 0;
	this.drawParticle = function(){
		fill(this.colour);
		ellipse(this.x,this.y, this.size);
	}
	this.updateParticle = function(){
		this.x += this.xSpeed;
		this.y += this.ySpeed;
		this.age++;
	}
}
function Emitter(x, y, xSpeed, ySpeed, size, colour){
	this.x = x;
	for(var i =0;i< 100; i++){
		this.x += 1;	
	}	
	this.y = y;
	this.xSpeed = xSpeed;
	this.ySpeed = ySpeed;
	this.size = size;
	this.colour = colour;
	this.startParticles = 0;
	this.lifetime = 0;
	this.particles = [];
	this.addParticle = function(){
		var p = new Particle(	random(this.x-10,this.x+10),
		random(this.y-10,this.y+10), 
		random(this.xSpeed-1, this.xSpeed+1), 
		random(this.ySpeed-1, this.ySpeed+1), 
		random(this.size-4, this.size+4),
		this.colour)
		return p;
	}
	this.startEmitter = function(startParticles, lifetime)
	{
		this.startParticles = startParticles;
		this.lifetime = lifetime;

		//start emitter with initial particles 
		for(var i = 0; i < startParticles; i++){
			this.particles.push(this.addParticle())
		}
	}
	this.updateParticles = function(){
		//iterate through particle and draw to the screen
		var deadParticles = 0; 
		for(var i = this.particles.length -1; i >= 0; i--){
			this.particles[i].drawParticle();
			this.particles[i].updateParticle();
			if(this.particles[i].age > random(0,this.lifetime)){
				this.particles.splice(i, 1);
				deadParticles ++;
			}
		}		
		if(deadParticles > 0){
			for(var i = 0; i < deadParticles; i++){
				this.particles.push(this.addParticle())
			}
		}

	}

}