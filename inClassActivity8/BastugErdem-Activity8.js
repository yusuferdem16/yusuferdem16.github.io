var names = ["Ben", "Joel", "Judy", "Anne"];
var scores = [88, 98, 77, 88];

var $ = function (id) { return document.getElementById(id); };



window.onload = function () {
	$("display_results").onclick = displayResults;
	$("display_scores").onclick = displayScores;
	$("add").onclick = addScore;
	
document.getElementById("name").focus();
document.getElementById("name").select();
	
};
function addScore()
{
	var name = $("name").value;
	var score = parseInt($("score").value);
	if (name == "" || isNaN(score) || score < 0 || score > 100)
	{
		alert("You must enter a name and a valid score");
	}
	else
	{
		names.push(name);
		scores.push(score);
		alert("Score added successfully!");
	}
	document.getElementById("name").focus();
	document.getElementById("name").select();
}
function displayScores()
{
	var output = "<table style='width:200px'>";
	output += "<h2> Scores </h2><br />";
	output += "<tr><th style='text-align:left'>Name</th><th style='text-align:left'>Score</th></tr>";
	for (var i = 0; i < names.length; i++)
	{
		output += "<tr><td>" + names[i] + "</td><td>" + scores[i] + "</td></tr>";
	}
	output += "</table>";
	
	document.getElementById("scores_table").innerHTML = output;
}
function displayResults()
{
	var average = 0;
	for(var i=0;i<scores.length;i++)
	{
		average= (average*(i)+scores[i])/(i+1);
	}
	
	document.getElementById("results").innerHTML="<h2> Results </h2><br /> Average score =  "+average + "<br \> "
	document.getElementById("results").innerHTML+="Highest score = "+names[scores.indexOf(Math.max(...scores))]+" with a score of "+Math.max(...scores)+"<br \>"
}




