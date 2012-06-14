//Mark Johnson
//VFW Project 3


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
				$('noteForm').style.display = "none";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "none";
				$('addNote').style.display = "inline";
				break;
			case "off":
				$('noteForm').style.display = "block";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "inline";
				$('addNote').style.display = "none";
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
		if(localStorage.length === 0){
			alert("There is no data here!")
		};

		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var createList = document.createElement('ul');
		makeDiv.appendChild(createList) // puts createList into ul element created above 
		document.body.appendChild(makeDiv) // attach makeDiv to the document 
		$('items').style.display = "block";
		for(i=0, entries=localStorage.length; i<entries; i++) {
			var createLi = document.createElement('li');
			var linksList = document.createElement('li');
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
				createSubList.appendChild(linksList);
			} // end for in loop
			makeItemLinks(localStorage.key(i), linksList); // calls function that will add buttons. 
		} // end for loop
	} // end getNotes function




	function makeItemLinks(key, linksList){
		editLink = document.createElement('a');
		editLink.href="#";
		editLink.key = key;
		var editNote = "Edit Note";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editNote;
		linksList.appendChild(editLink);

		//var breakTag = document.createElement("br");
		//linksList.appendChild(breakTag);

		deleteLink = document.createElement('a');
		deleteLink.href="#";
		deleteLink.key = key;
		var deleteNote = "Delete Note";
		//deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteNote;
		linksList.appendChild(deleteLink);
	} // end makeListLinks function


	function editItem(){
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);

		toggleControls("off"); // shows our form

		// Fill in our from field with the current values 
		$('groups').value = item.group[1];
		$('notetitle').value = item.notetitle[1];
		$('noteinfo').value = item.noteinfo[1];
		$('date').value = item.date[1];
		$('items').value = item.items[1];
		$('attach').value = item.attach[1];

		if(item.favorite[1] == "Yes"){
			$('fav').setAttribute("checked", "checked");
		}

		save.removeEventListener("click", saveNotes);

	} // end edit Links function 



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

