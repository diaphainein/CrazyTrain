 // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCOdT44_CxrDFdqCXX-QtVxGTuAQfuKMe0",
        authDomain: "trains-fa925.firebaseapp.com",
        databaseURL: "https://trains-fa925.firebaseio.com",
        storageBucket: "trains-fa925.appspot.com",
        messagingSenderId: "1080746932259"
    };
    firebase.initializeApp(config);

    var database = firebase.database();


    //variables
    var train = "";
    var destination = "";
    var trainTime = "";
    var Frequency = 0;
    var arrival = "";
    var minutes = 0;



    var currentTime = moment().format('HH:mm');


    // Adding a train
    function submitForm() {
        $("#addTrain").on("click", function(event) {
            event.preventDefault();

            //data stored in variables
            trainName = $("#name").val().trim();
            trainDestination = $("#des").val().trim();
            trainTime = $("#firstTrain").val().trim();
            trainFrequency = parseInt($("#fre").val().trim());


            var newTrain = {
                trainName: trainName,
                trainDestination: trainDestination,
                trainTime: trainTime,
                trainFrequency: trainFrequency
            };

            database.ref().push(newTrain);

            console.log(newTrain.trainName);
            console.log(newTrain.trainDestination);
            console.log(newTrain.trainTime);
            console.log(newTrain.trainFrequency);

            //Empty fields
            $("#name").val("");
            $("#des").val("");
            $("#firstTrain").val("");
            $("#fre").val("");

        });
    }



    //end click



    //Display child --added train with function
    function trainTable() {
        database.ref().on("child_added", function(snapshot) {
            console.log(snapshot.val());


            trainName = snapshot.val().trainName;
            trainDestination = snapshot.val().trainDestination;
            trainTime = snapshot.val().trainTime;
            trainFrequency = snapshot.val().trainFrequency;
            console.log(trainName, trainDestination, trainTime, trainFrequency);


            //Time
            
            var nextTrain = moment(trainTime, "HH:mm").subtract(1, "years");
            var difference = moment().diff(moment(nextTrain), "minutes");
            var remaining = difference % trainFrequency;
            var minutes = trainFrequency - remaining;
            
            // arrival time
            var arrival = moment().add(minutes, "minutes");


            $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + moment(arrival).format("HH:mm") + "</td><td>" + minutes + "</td></tr>");
        });

    }



    //makes the magic happen
    $(document).ready(function() {
        submitForm();
        trainTable();
        console.log("Time: " + currentTime);
    });