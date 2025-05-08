$(document).ready(function() {
    // When a speaker link is clicked
    $("#nav_list a").click(function(evt) {
        // Prevent the default action
        evt.preventDefault();
        
        // Get the title attribute which corresponds to the JSON file name
        var jsonFileName = $(this).attr("title");
        
        // Construct the path to the JSON file
        var jsonFilePath = "json_files/" + jsonFileName + ".json";
        
        // Use AJAX to load the JSON file
        $.getJSON(jsonFilePath, function(data) {
            // Extract the speaker data from the JSON
            var speakerData = data.speakers[0];
            
            // Update the main section with the speaker's information
            $("#title").text(speakerData.title);
            $("#image").attr("src", speakerData.image);
            $("#month").html(speakerData.month + "<br>"+ speakerData.speaker);
            $("#text").html(speakerData.text);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            // Handle error if JSON file can't be loaded
            console.log("Error loading JSON: " + textStatus);
            alert("Could not load the speaker data. Please try again later.");
        });
    });
    
    // Optional: Trigger click on first speaker to load default content
    // Uncomment the line below if you want to load the first speaker on page load
    // $("#nav_list a:first").click();
});