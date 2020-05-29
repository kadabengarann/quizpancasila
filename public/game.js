// sd =27
// smp =30
// sma =31

var overlay = $('.overlay');

var PancaGame = PancaGame || {};

PancaGame.Game = function()
{
	//--Variables
	var correctAnswer;

	var barProgress = $('#BarProgress'); 
	
	var SmpProgress = $('#progresSamping'); 
	
	var ovrImg = $('.ovrImg');
	// uestion in the HTML
	var questionBox = $('.question');
	// Output the question number in here
	var answers = $('.answers');
	var restart = $('.restart');
	var exit = $('.exit');
    
	// Fifty fifty button
	var fiftyFifty = $('.fifty-fifty');
	// Free Pass Button
	var freePass = $('.free-pass');
	// Lineline shared class
	var lifeLine = $('.lifeline');


	// jumlah stage dan soal per stage
	let finalStage = 3;
	let perStage = 10;
	//inisialsasi awal stage dan no soal (index)
	let stageNum = -1;
	Qnum = -1;

	let checkSoal = [31];

//Bagian random-randoman
	let emptyArray =[];
	//variabel untuk random soal
	let SoalArray = [];
	let B_soalArray = [...SoalArray];
	let soalPerStage;
	let S_index;
	let randomSoalIndex;

	//variabel untuk random pilihan
	let AnswaAray = [];
	let randomIndex;
	let deletedVar;

	let progress = 0;
	let progress2 = 0;
	let progHeight = 0;
	let progScore = 0;

	
	// These are the functions we call initially
	function init()
	{
		stageNum = -1;
		Qnum = -1;
		questionBox.css("opacity", "0");
		$('.answers li').css("opacity", "0");
		$('.main-body').css("opacity", "100");
		pindah();
		restart.hide();
		exit.hide();
		
		fiftyFifty.prop('disabled', false);
		fiftyFifty.css({"opacity": "100","cursor": "pointer"});
		freePass.prop('disabled', false);
		freePass.css({"opacity": "100","cursor": "pointer"});
		overlay.children(".mesej").children("#stageNumber").show();
		answers.show();
		
		lifeLine.show();
		freePass.show();
		// If the restart button is clicked then we call the reStart() function
		restart.click(reStart);
		exit.click(function () {
			$('.main-body').css("opacity", "0");
			exitQuiz();
			startSound('restartSound', false);
		console.log(" / Exit");
		restart.hide();
		exit.hide();
		});
		
		// Free pass functionality
		freePass.click(function(){
		
			// Hide the button

			freePass.prop('disabled', true);
			freePass.css({"opacity": "10","cursor": "default"});
			startSound('clickSound', false);

			// Jump to next question
			pindah();
			$('.answers li').css("opacity", "0");
			
			
		});

	}
	
	// starting point / next question
	function nextQuestion() {
		// Starting the question number off at 0, as arrays start at 0
		if (Qnum != (finalStage*perStage)) {
			Qnum = Qnum + 1;
		} 
		

		progress = (Qnum)/(finalStage*perStage);
		
		let tesVar = Qnum +1;
		tesVar = tesVar/2;
		console.log(tesVar);
		
		progress2 = ((Qnum)/(finalStage*perStage))*10000;
		progHeight =((Qnum)/(finalStage*perStage));
		progScore =progress2;
		if (progress2 < 0) {
			progress2 = 4;
		}
	//	prgressBar.animate(progress);
	if (Qnum == 0) {
		console.log("NO PertamaAMMAMAMMMA");
		
		SmpProgress.jQMeter({
			goal:'10000',
			raised:0,
			meterOrientation:'vertical',
			displayTotal :false,
			width:'150px',
			height:'87vh',
			bgColor:'#222',
			barColor:'#222'
		});
		barProgress.jQMeter({
			goal:'10000',
			raised:0,
			meterOrientation:'horizontal',
			displayTotal :false,
			width:'100%',
			height:'20px',
			bgColor:'#222',
			barColor:'#222'
		});
	}
	else if (Qnum != (finalStage*perStage) && Qnum != 0) {
		SmpProgress.jQMeter({
			goal:'10000',
			raised:progress2,
			meterOrientation:'vertical',
			width:'150px',
			height:'87vh',
			bgColor:'#222',
			barColor:'#4c4ed1'
		});
		barProgress.jQMeter({
			goal:'10000',
			raised:progress2,
			meterOrientation:'horizontal',
			displayTotal :true,
			width:'100%',
			height:'20px',
			bgColor:'#222',
			barColor:'#4c4ed1'
		});
	}
		
		console.log("qnum is " + Qnum)
		console.log("paket is " + stageNum)
		//console.log(SoalArray);
		var total = perStage * finalStage;
		
		if(Qnum < total) {
			askQuestion(stageNum, Qnum);


		}
		//kalo menangg
		else {
			
			stopSound('bSound');
			questionBox.html("Congratolations ! You've got " + progress2 +" coins");
			// We don't want to see any answers here
			answers.hide();
			// We don't want to see a reset button here
			restart.show();
			exit.show();
			// We don't want to see the question number here
			//Hide the lifeline buttons
			lifeLine.hide();
			//barProgress.hide();
			barProgress.css("stroke-dashoffset", "0");
			
		}
				
	}
	
	//  outputs the question
	function askQuestion(stage,nosoal) {
		
		// Take the question from the array and output it into $('.question')

		setTimeout(function(){
			questionBox.css("opacity", "100");
			$('.answers li').css({"opacity": "100","cursor": "pointer"});
		}, 100);
		
		randomSoalIndex = getRandomNumber(0,SoalArray.length-1);
		S_index = SoalArray[randomSoalIndex];
		console.log("index soal generated "+ S_index);

		questionBox.html(questions.games[stage].questions[S_index].question);
		
		AnswaAray = questions.games[stage].questions[S_index].content;
		
		// Clear the answers box
		$('.answers').empty();
	
		//bakup array pilihan ke deletedvar
		deletedVar = AnswaAray.slice();
		
		for (let i = 0; i < 2; i++) {
			randomIndex = getRandomNumber(0,AnswaAray.length-1);
			$('.kiri').append('<li data-answer="' + AnswaAray[randomIndex]+ '"><p>' + AnswaAray[randomIndex] + '</p></li>');
			//console.log(AnswaAray[randomIndex]);
			AnswaAray.splice(randomIndex, 1);	
		}
		for (let i = 0; i < 2; i++) {
			randomIndex = getRandomNumber(0,AnswaAray.length-1);
			$('.kanan').append('<li data-answer="' + AnswaAray[randomIndex]+ '"><p>' + AnswaAray[randomIndex] + '</p></li>');
			//console.log(AnswaAray[randomIndex]);
			AnswaAray.splice(randomIndex, 1);	
		}
		
		for (let i = 0; i < deletedVar.length; i++) {
			AnswaAray.push(deletedVar[i]);	
		}
		
		
		correctAnswer = questions.games[stage].questions[S_index].correct;
		SoalArray.splice(randomSoalIndex, 1);
		
		console.log("JAWABAN : "+ correctAnswer);
		
		// Remove spaces and change to lowercase
		correctAnswer = correctAnswer.replace(/ /g,'').toLowerCase();
		$('.answers li').on('click', answerQuestion);
		
		// Fifty Fifty functionality
		fiftyFifty.click(function(){
		
			// Hide the button
			fiftyFifty.prop('disabled', true);
			fiftyFifty.css({"opacity": "10","cursor": "default"});
			
			
			// start a count as we only want to remove 2 answers
			fiftyFiftycount = 0;
			startSound('clickSound', false);
			
			//Loop through each li and check what the answers are
			$(".answers li").each(function() {
			
				// If count is lower than 2 then we will remove 2 incorrect answers
				if(fiftyFiftycount < 2) {
				
					// If the li answer is NOT equal to the correct answer then we can remove it
					if($(this).data('answer').toString().replace(/ /g,'').toLowerCase() != correctAnswer) {
					
						// Hide it
						$(this).css({"opacity": "0","cursor": "default"});
						$(this).off('click');
						$(this).click(function() {
							console.log("gak bisa bro");
						});
						
						// Add one to the count!
						fiftyFiftycount = fiftyFiftycount + 1;
						
					}
					
				}
				
			});
			
		});
		
	}
	
	// etects if correct
	function answerQuestion() {
		
		
		// Take data 
		var UserAnswer = $(this).data('answer');
		let pilihanHilang = 0;

		UserAnswer = UserAnswer.toString().replace(/ /g,'').toLowerCase();
		$(".answers li").each(function() {
			
			// If count is lower than 2 then we will remove 2 incorrect answers
			if(pilihanHilang < 3) {
			
				// If the li answer is NOT equal to the correct answer then we can remove it
				if($(this).data('answer').toString().replace(/ /g,'').toLowerCase() != UserAnswer) {
				
					// Hide it
					
					$(this).css("opacity","0");				
					console.log("hilang");
					
					// Add one to the count!
					pilihanHilang = pilihanHilang + 1;
					
				}
				
			}
			
		});
		
		//  if answer match the correct answer in the variable?
		if (UserAnswer == correctAnswer) {
			console.log("Jawaban Benar");
			
			// next question
			$(this).css("background-color","#55d455");
			setTimeout(function(){
				pindah();
			}, 700);
			startSound('rightSound', false);
			
			
		}	
		// If not they have lost and reset game
		else {
			
			
			console.log("salah");
			
			$(this).css("opacity", "100");
			$(this).css("background-color","#ff002b");
			startSound('wrongSound', false);
			stopSound('bSound');
			let kalahQnum = 0;
			progress2 = ((kalahQnum)/(finalStage*perStage))*10000;
			SmpProgress.jQMeter({
				goal:'10000',
				raised:progress2,
				meterOrientation:'vertical',
				// displayTotal :false,
				width:'150px',
				height:'87vh',
				bgColor:'#222',
				barColor:'#222'
			});
			barProgress.jQMeter({
				goal:'10000',
				raised:progress2,
				meterOrientation:'horizontal',
				// displayTotal :false,
				width:'100%',
				height:'20px',
				bgColor:'#222',
				barColor:'#222'
			});
			
			
			setTimeout(function(){
				// wrongSound();
				questionBox.html("Sayang sekali "+ userName + ", jumlah soal yang terjawab : " + Qnum +" soal");
				answers.hide();
				restart.show();
				exit.show();
			// We don't want to see the question number here
			//Show the lifeline buttons
				lifeLine.hide();
				saveScore(Qnum);
			}, 1000);
			
		}
				
	}
	
	function pindah() {
		//kalo udah soal terakhir
		if (Qnum == (perStage*finalStage)-1) {
			stopSound('bSound');
			//nextQuestion();
			ovrImg.show();
			overlay.children(".mesej").children("#stageNumber").hide();
			overlay.children(".mesej").children("#stageText").html("You Win !!!");
			setTimeout(function(){
				overlay.css({"opacity": "100"});
				startSound('winSound', false);
				setTimeout(function(){
					overlay.css({"opacity": "0"});

					
					setTimeout(function(){
						overlay.hide();
						ovrImg.hide();
						nextQuestion();
						saveScore(Qnum);
						
					},700);
					
				}, 1500);
			}, 1000);
			Qnum = Qnum +1;
			progress2 = ((Qnum)/(finalStage*perStage))*10000;
			SmpProgress.jQMeter({
				goal:'10000',
				raised:progress2,
				meterOrientation:'vertical',
				width:'150px',
				height:'87vh',
				bgColor:'#222',
				barColor:'#4c4ed1'
			});
			barProgress.jQMeter({
				goal:'10000',
				raised:progress2,
				meterOrientation:'horizontal',
				displayTotal :true,
				width:'100%',
				height:'20px',
				bgColor:'#222',
				barColor:'#4c4ed1'
			});


			overlay.show();

		}
		//kalo udah soal terakhir per stage
		else if ((Qnum+1) % perStage == 0) {
			if (Qnum == 9) {
				if (alertGuest()) {
					exitQuiz();
				}
			}else{
                nextStage();
            }
		}else {
			nextQuestion();
		}
		
	}
	function nextStage() {
		stageNum = stageNum + 1;
		soalPerStage = questions.games[stageNum].questions.length;
		console.log("Jumlah soal per stage untuk stage "+stageNum+" =" +soalPerStage);
		//hapus array nya dulu
		SoalArray = [...emptyArray]
		console.log("arr hapus ");
		console.log(SoalArray);
		
		//isi array sesuai jumlah soal
		for(let i = 0; i < soalPerStage; i++){
			SoalArray[i] = i;
		}
		console.log("arr isi "+SoalArray);
		//bakup array ke bakupan
		B_soalArray = [...SoalArray];
		console.log("arr bakup "+B_soalArray);

		if (Qnum < 99){
			stopSound('bSound');
			
			console.log("next stage");
			overlay.children(".mesej").children("#stageNumber").html(""+(stageNum + 1));
			overlay.children(".mesej").children("#stageText").html("Stage " + (stageNum + 1));
			overlay.show();
			setTimeout(function(){
				overlay.css({"opacity": "100"});
				startSound('stageSound', false);
				setTimeout(function(){
					overlay.css({"opacity": "0"});
					nextQuestion();
					setTimeout(function(){
						overlay.hide();
						startSound('bSound', true);
					},700);
					
				}, 1000);
			}, 400);
			
		}else{
			nextQuestion();
			console.log("Masih Awal bro");
		}
		
	}
	//  restart func If player fails
	function reStart() {
		// Reset the Qnum back to the beginning
		startSound('restartSound', false);
		overlay.children(".mesej").children("#stageNumber").show();
		startSound('bSound', true);
		Qnum = -1;
		stageNum = -1;

		// Start the quiz
		pindah();
		// show answers 
		$('.answers li').css("opacity", "0");
		answers.show();
		restart.hide();
		exit.hide();
		//Show the lifeline buttons
		lifeLine.show();
		// Show the button
		
		fiftyFifty.prop('disabled', false);
		fiftyFifty.css({"opacity": "100","cursor": "pointer"});
		
		freePass.prop('disabled', false);
		freePass.css({"opacity": "100","cursor": "pointer"});
		// Show the button
		console.log("restart");
		
	}
	
	

	function getRandomNumber(min, max){
		let step1 = max - min +1;
		let step2 = Math.random() * step1;
		let result = Math.floor(step2) + min;
		return result;
	}

	function checkNum(value, index, array) {
		return value == S_index;
	}


	init();
};

function exitQuiz() {
	location.reload(false);
	stopSound('bSound');
	return false;
}

var barProgIsi = $('.inner-therm.vertical');

startSound = function(id, loop) {
	soundHandle = document.getElementById(id);
	if(loop){
		soundHandle.setAttribute('loop', loop);
		console.log("LOOOOOOOOPPPPPPP");
		
	}
	soundHandle.play();
}

stopSound = function(id) {
	soundHandle = document.getElementById(id);
	
	soundHandle.pause();
}


// ON DOC READY
$(function()
{	
	
	let lebar = $(".badanSoal").width();
		console.log(lebar);
		$(".topBar").css("width", lebar-20+"px");


	
	//Start Button clicked
	$("#startBtn").click(function() {
		startSound('clickSound', false);
		console.log("Start");
				
		barProgIsi.css("display", "none");
		$("#pre-start").fadeOut('1000', function() {
			// startSound('bSound', true);
			$(".main-body").fadeIn('1000');
			new PancaGame.Game();	

		});
	});

	$("#howtoBtn").click(function() {
		startSound('clickSound', false);
		overlay.show();
		
		overlay.children(".mesej").hide();
		overlay.children(".mesej").children("#stageText").hide();
		overlay.children(".tutorial").show();
		setTimeout(function(){
			overlay.css({"opacity": "100"});
		}, 200);

	});
	overlay.children(".tutorial").children(".close").click(function() {
		console.log("keluar tutorial");
		
		setTimeout(function(){
			overlay.css({"opacity": "0"});
			overlay.hide();
			overlay.children(".mesej").show();
			overlay.children(".mesej").children("#stageText").show();
			overlay.children(".tutorial").hide();
		}, 200);
	});

	$("#highScoreBtn").click(function() {
		startSound('clickSound', false);
		$(".high-score").show();
		updateScores();
		setTimeout(function(){
		}, 200);
		
		$(".highScoreContainer").children(".close").click(function() {
			console.log("keluar high score");
			$(".high-score").hide();
			setTimeout(function(){
			}, 200);
		});
		
	});

	window.onresize = function () {
		lebar = $(".badanSoal").width();
		$(".topBar").css("width", lebar-20+"px");
	}


	   
});

