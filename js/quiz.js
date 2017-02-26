(function() {
  var questions = [{
    question: "1. Condoms always prevent transmissions of STIs.",
    choices: ["True", "False"],
    correctAnswer: "False"
  }, {
    question: "2. The only way to not get pregnant is to wear protection during sexual intercourse.",
    choices: ["True", "False"],
    correctAnswer: "False"
  }, {
    question: "3. What percentage of women who give birth in highschool recieve their diploma?",
    choices: ["Over 70%", "Less than 40%", "Around 50%", "More than 80%"],
    correctAnswer: "Around 50%"
  }, {
    question: "4. Teen pregnancy can be avoided by regularly visiting health clinics, and speaking to someone about your sexual health.",
    choices: ["True", "False"],
    correctAnswer: "True"
  }, {
    question: "5. By age 30, only __% of women who gave birth in highschool recieve their college diploma.",
    choices: [5, 40, 50, 2],
    correctAnswer: 2
  }, {
    question: "6. One of the biggest influences as to whether or not a teenager becomes sexually active has to do with parental relationships.",
    choices: ["True", "False"],
    correctAnswer: "True"
  }, {
    question: "7. The inconsistent use of birth control plays a huge role in increasing teen pregnancy rates.",
    choices: ["True", "False"],
    correctAnswer: "True"
  }, {
    question: "8. Despite governmental focus on abstinence-only education, a majority of parents feel that sex education in schools should include information about contraceptives.",
    choices: ["True", "False"],
    correctAnswer: "True"
  }, {
    question: "9. Those who have sex at a later age are more likely to run into risky sexual behaviors than those who have sex at an early age.",
    choices: ["True", "False"],
    correctAnswer: "False"
  }, {
    question: "10. I feel confident speaking to someone about my sexual health.",
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }];

  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object

  // Display initial question
  displayNext();

  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();

    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {
      return false;
    }
    choose();

    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });

  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });

  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });

  // Creates and returns the div that contains the questions and
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);

    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();

      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }

        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){

          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }

  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});

    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }

    score.append('You got ' + 6 + ' questions out of ' +
                 questions.length + ' right! ' +
                 '<p>' +
               'Correct Answers: ' +
               '<p>' +
               '1. False' +
               '<p>' +
               '2. False' +
               '<p>' +
               '3. Around 50%' +
               '<p>' +
               '4. True' +
               '<p>' +
               '5. 2' +
               '<p>' +
               '6. True' +
               '<p>' +
               '7. True' +
               '<p>' +
               '8. True' +
               '<p>' +
               '9. False' +
               '<p>' +
               '10. Yes'

               //<a onclick="getUrl();" href="#">Click here</a>

             );

    return score;
  }
})();
