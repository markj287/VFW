// alert("am working") 

// Wait until the DOM is ready 
window.addEventListener("DOMContentLoaded", function (){

	// getElementById function
	function $(x) {
		var theElement = document.getElementById(x)
		return theElement;
	} // end theElement function


	// Variables defaults 
	var notesCategories = ["--Choose a Category--","Grocery","Fitness","Entertainment","Dining","Shopping","Sports"]



	// Set links and submits click events 
	var displayLink = $('displayLink')
	displayLink.addEventListener("click", getNotes)
	var clearLink = $('clear')
	clearLink.addEventListener("click", clearNotes)
	var save = $('submit')
	save.addEventListener("click", saveNotes)


})

