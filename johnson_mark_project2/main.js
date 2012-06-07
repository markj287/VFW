// Wait until the DOM is ready 
window.addEventListener("DOMContentLoaded", function (){
	// getElementById function
	function $(x) {
		var theElement = document.getElementById(x);
		return theElement;
	} // end theElement function




	function makeCats () {
		var formTag = document.getElementsByTagName("form"), // form tag is an array
			selectListItem = $('select'),
			makeSelect = document.createElement('select')
			makeSelect.setAttribute("id", "groups");
		for(var i=0, j=notesCategories.length; i<j; i++) {
			var makeOption = document.createElement('option');
			var optionText = notesCategories[i]
			makeOption.setAttribute("value", "optionText");
			makeOption.innerHTML = optionText;
			makeSelect.appendChild(makeOption);
		} // end for loop
		selectListItem.appendChild(makeSelect);
	} // end makeCat function





	function getSelectedRadioBtn() {
		var radio = document.forms[0].favNote 
		for (var i=0; i<radio.length; i++) {
			if(radio[i].checked) {
				favoriteValue = radio[i].value;
			} // end if
		} // end for loop
	} // end get selected radio btn function




	function getcheckedBoxBtn() {
		if($('fav').checked) {
			favoriteValue = $('fav').value;
		} else {
			favoriteValue = "No"
		}
	} // end function






	function toggleControls(a) {
		switch(a){
			case "on":
				$('noteForm').style.display = "none"
				$('clear').style.display = "inline"
				$('displayLink').style.display = "none"
				break;
			case "off":
				$('noteForm').style.display = "block"
				$('clear').style.display = "inline"
				$('displayLink').style.display = "inline"
				break;
			default:
				return false;
		}
	} // end toggleControls function







	function saveNotes() {
		var id 					= Math.floor(Math.random()*1000001);
		// gather up all form fields values and store them in an object 
		// object properites will contain an array with form labels and input values 
		getSelectedRadioBtn(); // calls function
		getcheckedBoxBtn();
		var item 				= {}
			item.group 			= ["Group", $('groups').value ];
			item.notetitle 		= ["Title", $('notetitle').value ];
			item.noteinfo		= ["Note", $('noteinfo').value ];
			item.date			= ["Date", $('date').value ];
			item.items			= ["Number of Itmes", $('items').value ];
			item.attach			= ["Attach a File", $('attach').value ];
			item.favorite		= ["Favorite Note", favoriteValue ];

			// save data into local storage. Use stringify to convert our object to a string 
			localStorage.setItem(id, JSON.stringify(item));			
			alert("Note Saved");
	} // end store data function





	function getNotes() {
		toggleControls("on");
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var createList = document.createElement('ul');
		makeDiv.appendChild(createList) // puts createList into ul element created above 
		document.body.appendChild(makeDiv) // attach makeDiv to the document 
		$('items').style.display = "block";
		for(i=0, entries=localStorage.length; i<entries; i++) {
			var createLi = document.createElement('li');
			createList.appendChild(createLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var savedNote = JSON.parse(value); // parse the save note object back into an object 
			var createSubList = document.createElement('ul');
			createLi.appendChild(createSubList);
			for(a in savedNote) {
				var creatSubListItem = document.createElement('li');
				createSubList.appendChild(creatSubListItem)
				var subText = savedNote[a][0] + " " + savedNote[a][1];
				creatSubListItem.innerHTML = subText;
			} // end for in loop
		} // end for loop
	} // end getNotes function




	function clearNotes() {
		if(localStorage.length === 0){
			alert("Move along buddy, nothing here to clear.");
		} else {
			localStorage.clear()
			alert("All notes were deleted");
			window.location.reload();
			return false;
		} // end if 
	} // end clearNotes function
	



	// Variables defaults 
	var notesCategories = ["--Choose a Category--","Grocery","Fitness","Entertainment","Dining","Shopping","Sports"],
		favoriteValue = "No"
		;
	makeCats();


	// Set links and submits click events 
	var displayLink = $('displayLink');
	displayLink.addEventListener("click", getNotes);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearNotes);
	var save = $('submit');
	save.addEventListener("click", saveNotes);


}) // end main function

