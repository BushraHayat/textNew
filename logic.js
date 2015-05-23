$(document).ready(function () 
{  
	var qno=0;
	var questions=new Array();
	var stage="#game1";
	var stage2=new Object;
	var questionLock=false;
	var totalQuestions;
	var score=0;
	var count=0;
	var  numOfQues=0;
	showScore();
	
    $("#startButton").on("click", function () {
      
	$.getJSON('questions.json', function(data) 
	{
		score=0;
		qno=0;
		count=0;
		numOfQues=data.quizlist.length;

		for(i=0; i<data.quizlist.length; i++)
		{
			questions[i]=new Array;
			questions[i][0] = data.quizlist[i].question;
			questions[i][1] = data.quizlist[i].option1;
			questions[i][2] = data.quizlist[i].option2;
			questions[i][3] = data.quizlist[i].option3;
		}
		totalQuestions = questions.length;
	
		showQuestions();
	});
 });
	
	function showScore()
	{
		$("#temp").remove();
		$("#score1").append('<div id ="temp" class="Score">'+score+'</div>');
	}
	function initializeTimer()
	{
		seconds=60;
	}
	function startSound()
	{
		sound = new Audio("sound.mp3"); // buffers automatically when created
		sound.play();
	
	}
	
	function showQuestions()
	{
	    
		showScore();
		initializeTimer();
		startSound();

		correctOpt=Math.random()*3; 
		correctOpt=Math.ceil(correctOpt);
		var q1;
		var q2;
		var q3;
     
		if(correctOpt==1)
		{
			q1=questions[qno][1]; 
			q2=questions[qno][2]; 
			q3=questions[qno][3];
		}
		if(correctOpt==2)
		{
			q2=questions[qno][1];
			q3=questions[qno][2]; 
			q1=questions[qno][3];
		}
		if(correctOpt==3)
		{
			q3=questions[qno][1];
			q1=questions[qno][2];
			q2=questions[qno][3];
		}
    
		$(stage).append('<div class = "questionText">' + questions[qno][0] + '</div><div id= "1" class="option">'+q1+'</div> <div id="2" class="option">'+q2+'</div> <div id="3" class="option">'+q3+'</div>');
    
		$('.option').click(function()
		{
			count=count+1;
			
			if(questionLock==false)
			{
				questionLock=true;
				
				//correct answer
				if(this.id==correctOpt)
				{
					$(stage).append('<div class="Correct">CORRECT</div>');
					score=score+10;
				}
					
				//wrong answer 
				if(this.id!=correctOpt)
				{
					$(stage).append('<div class="Wrong">WRONG</div>');
				}
				if(count ==numOfQues)    // when there are no questions left
				{
				document.getElementById("yourScore").innerHTML="Your Score:"+score;
				window.location="#endPage";
				}
				setTimeout(function(){changeQuestion()},1000); //waits for 1 second and loads next question
			}
		})
      }//display question
	  
	  function changeQuestion()
	  {
		qno++;
		if(stage=="#game1")
		{
			stage2="#game1";
			stage="#game2";
		}
		else
		{
			stage2="#game2";
			stage="#game1";
		}
		if(qno<totalQuestions)
		{
			showQuestions();
		}
		else
		{
			//displayFinalSlide();
		}
	
		$(stage2).animate({"right": "+=800px"},"slow", function() {$(stage2).css('right','-800px');$(stage2).empty();});
		$(stage).animate({"right": "+=800px"},"slow", function() {questionLock=false;});
	}//change question
	
	function displayFinalSlide()
	{
	//	$(stage).append('<div class="questionText">You have finished the quiz!<br><br>Total questions: '+totalQuestions+'<br>Correct answers: '+score+'</div>');
	}//display final slide
});