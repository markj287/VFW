// alert("am working") 

// Wait until the DOM is ready 
window.addEventListener("DOMContentLoaded", function (){

	// getElementById function
	function $(x) {
		var theElement = document.getElementById(x)
		return theElement;
	} // end theElement function

	function makeCats () {
		var formTag = document.getElementsByTagName("form"), // form tag is an array
			selectListItem = $('select'),
			makeSelect = document.createElement('select') 
			makeSelect.setAttribute("id", "groups")
		for(var i=0, j=notesCategories; i<j; i++) {
			var makeOption = document.createElement('option')
			var optionText = notesCategories[i]
			makeOption.setAttribute("value", "optionText")
			makeOption.innerHTML = optionText
			makeOption.appendChild(makeOption)
		} // end for loop
		selectListItem.appendChild(makeSelect)
	} // end makeCat function

	// Variables defaults 
	var notesCategories = ["--Choose a Category--","Grocery","Fitness","Entertainment","Dining","Shopping","Sports"]
	makeCats()


	// Set links and submits click events 
	var displayLink = $('displayLink')
	displayLink.addEventListener("click", getNotes)
	var clearLink = $('clear')
	clearLink.addEventListener("click", clearNotes)
	var save = $('submit')
	save.addEventListener("click", saveNotes)


})

