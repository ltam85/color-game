var defaultColor = "#232323";
var defaultH1 = "steelblue";

var numSquares = 6;
var colors = [];
var colorGoal;

var h1 = document.querySelector("h1");
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var resetButton = document.getElementById("reset");
var difficultyButton = document.querySelectorAll(".difficulty")

init();

resetButton.addEventListener("click", function(){
	reset();
});

function init(){
	//difficulty button event listener
	setupDifficultyButtons();
	setupSquares();
	reset();
}

function setupDifficultyButtons(){
	for(var i = 0; i < difficultyButton.length; ++i){
		difficultyButton[i].addEventListener("click", function(){
			difficultyButton[0].classList.remove("selected");
			difficultyButton[1].classList.remove("selected");
			this.classList.add("selected");

			// Ternary Operator -> condition ? outcome 1 : outcome 2
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			// if(this.textContent === "Easy"){
			// 	numSquares = 3;
			// } else{
			// 	numSquares = 6;
			// }
			reset();
		});
	}
}

function setupSquares(){
	for(var i = 0; i < squares.length; ++i){
		// Add event listeners to squares
		squares[i].addEventListener("click", function(){
			// compare clicked color to colorGoal
			var clickedColor = this.style.backgroundColor;
			if(clickedColor === colorGoal){
				resetButton.textContent = "Play Again?";
				messageDisplay.textContent = "Correct!";
				changeColor(clickedColor);
				h1.style.backgroundColor = clickedColor;
			} else{
				this.style.backgroundColor = defaultColor;
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}

function changeColor(color){
	//loops through all squares and change colors
	for(var i = 0; i < squares.length; ++i){
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	var randomIndex = Math.floor(Math.random() * colors.length);
	return colors[randomIndex];
}

function generateRandomColors(num){
	// make an array
	var randomColors = [];
	// add num random colors into array
	for(var i = 0; i < num; ++i){
		randomColors.push(randomColor());
	}
	// return array at the end
	return randomColors;
}

function randomColor(){
	// pick red between 0-255
	var red = Math.floor(Math.random() * 256);
	// pick green between 0-255
	var green = Math.floor(Math.random() * 256);
	// pick blue between 0-255
	var blue = Math.floor(Math.random() * 256);

	return "rgb(" + red + ", " + green + ", " + blue + ")";
}

function reset(){
	// generate all new colors and put them into array
	colors = generateRandomColors(numSquares);
	// pick colorGoal
	colorGoal = pickColor();
	// recolor the squares and change display color
	colorDisplay.textContent = colorGoal;
	messageDisplay.textContent = "";
	resetButton.textContent = "New Colors";
	for(var i = 0; i < squares.length; ++i){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else{
			squares[i].style.display = "none";
		}
	}
	// recolor display background back to default
	h1.style.backgroundColor = defaultH1;
	resetButton.textContent = "New Colors";
}