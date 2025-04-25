
var programming_languages = ["ActionScript","AppleScript","Asp","JavaScript","Lisp","Perl","PHP","Python"];


$("#birthday").datepicker()
    .datepicker("option", "dateFormat", "dd-mm-yy");
    
$("#programming_language").autocomplete({
    source: programming_languages,
});

