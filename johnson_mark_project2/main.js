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

	function saveNotes() {
		var id 					= Math.floor(Math.random()*1000001)
		// gather up all form fields values and store them in an object 
		// object properites will contain an array with form labels and input values 

		getSelectedRadioBtn() // calls function
		getcheckedBoxBtn()
		var item 				= {}
			item.group 			= ["Group", $('groups').value ]
			item.notetitle 		= ["Title", $('notetitle').value ]
			item.noteinfo		= ["Note", $('noteinfo').value ]
			item.date			= ["Date", $('date').value ]
			item.items			= ["Number of Itmes", $('items').value ]
			item.attach			= ["Attach a File", $('attach').value ]
			item.favorite		= ["Favorite Note", favoriteValue ]

			// save data into local storage. Use stringify to convert our object to a string 
			localStorage.setItem(id, JSON.stringify(item))
			
			alert("Note Saved")
	} // end store data function

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


}) // end main function

