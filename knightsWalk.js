var board = document.getElementById("board");
var ok = document.getElementById("get n");
var field = document.getElementById("n");
var startbutton=document.getElementById('start');
var clear=document.getElementById('clr');
var output=document.getElementById('output');
var nplus=document.getElementById('>');
var nminus=document.getElementById('<');

var matrix=[];

var n;

var x=0;
var y=0;
var startid="td00";
var selectedelement;


function okay() {
	n=parseInt(field.value);

	output.innerHTML=""

	for(var i=0;i<n;i++){
		matrix[i]=new Array(n);

		for(var j=0;j<n;j++)
		{
			matrix[i][j]=0;
		}
	}

	var tablehtml="";
	
	for(var i=0;i<n;i++)
	{
		tablehtml=tablehtml+"<tr>";

		for(var j=0;j<n;j++)
		{
			tablehtml=tablehtml+"<td id='"+'td'+i+j+"'>"+" "+"</td>";
		}
		tablehtml=tablehtml+"</tr>";
	}

	board.innerHTML=tablehtml;
	selectedelement=document.getElementById("td00");
	selectedelement.style.backgroundColor="lightblue";

	document.querySelectorAll('#board td')
	.forEach(e=>e.addEventListener("mouseenter",function(){

	console.log("hover: "+e.id);
	e.style.backgroundColor="lightgreen";
		
	}));

	document.querySelectorAll('#board td')
	.forEach(e=>e.addEventListener("mouseleave",function(){
		e.style.backgroundColor="white";
		selectedelement.style.backgroundColor="lightblue";
		
	}));

	document.querySelectorAll('#board td')
	.forEach(e=>e.addEventListener("click",function(){

		console.log("clicked: "+e.id);
		startid=e.id;
		x=parseInt(startid[2]);
		y=parseInt(startid[3]);

		startbutton.innerHTML="START AT "+x+','+y;
		selectedelement.style.backgroundColor="white";
		selectedelement=e;
		selectedelement.style.backgroundColor="lightblue";

	}));
}

field.value=5;
okay();

ok.onclick = okay;
clear.onclick = function()
{
	okay()
};

nplus.onclick = function()
{
	n=n+1;
	field.value=n
	okay()
};

nminus.onclick = function()
{
	n=n-1;
	field.value=n
	okay()
};

var count=0;
var time=0;

var xmov=[1,1,-1,-1,2,2,-2,-2];
var ymov=[2,-2,2,-2,1,-1,1,-1];

function isSafe(x,y)
{

	if(x>=n || y>=n || x<0 || y<0)
	{
		return false;
	}

	if(matrix[x][y]!=0)
	{
		return false;
	}

	if(matrix[x][y]==0){
		return true;
	}
}

function walk(x1,y1,turn){

	if(turn==n*n)
	{
		matrix[x1][y1]=turn;
		return true;
	}

	matrix[x1][y1]=turn;


	for(var i=0;i<8;i++)
	{
		if(isSafe(x1+xmov[i],y1+ymov[i]))
		{
			if(walk(x1+xmov[i],y1+ymov[i],turn+1)==true){
				return true
			}
		}
	}

	matrix[x1][y1]=0;
	return false

}

startbutton.onclick = function(){

	console.log("starting walk: "+x+','+y);
	
	if(walk(x,y,1)==false)
	{
		output.innerHTML="<h2 style='color:red'>"+"CANNOT COVER THE BOARD\n FROM HERE"+"</h2>";

	}

	var tablehtml="";
	
	for(var i=0;i<n;i++)
	{
		tablehtml=tablehtml+"<tr>";

		for(var j=0;j<n;j++)
		{
			tablehtml=tablehtml+"<td id='"+'td'+i+j+"'>"+matrix[i][j]+"</td>";
		}
		tablehtml=tablehtml+"</tr>";
	}

	board.innerHTML=tablehtml;

	document.querySelectorAll('#board td')
	.forEach(e=>e.addEventListener("mouseenter",function(){

	console.log("hover: "+e.id);
	e.style.backgroundColor="lightgreen";
		
	}));

	document.querySelectorAll('#board td')
	.forEach(e=>e.addEventListener("mouseleave",function(){
		e.style.backgroundColor="white";
		selectedelement.style.backgroundColor="lightblue";
		
	}));

}

function mainLoop(){

	count=count+1;

	if(count==60)
	{
		time=time+1;
		console.log(x+','+y);
		count=0;
	}
	
	requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);
	