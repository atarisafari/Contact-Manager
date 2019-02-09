const tableKey = 'table';

let table;

let tableDemo = {
	'SpongeBob SquarePants': {
		'phoneNumber': '123456789'
		'addrress': '104 Bikini Bottom Drive, Bikini Bottom, Under Water, 12345'
	}
}

let refreshDOMTable = () => {
	
	let tableKeys = Object.keys(table);
	let tableContainer = document.getElementById('contactsTable');
	let oldTableBody = document.getElementById('tableBody');
	tableContainer.removeChild(oldTableBody);
	let newTableBody = document.createElement('span');
	newTableBody.id = 'tableBody';
	
	
	for (let i=0; i<tableKeys.length; i++) {
		let currentRow = document.createElement('div');
		let currentNameCol = document.createElement('div');
		let currentDeleteBtn = document.createElement('div');
		
		currentRow.className = 'tableRow';
		currentNameCol.className  = 'tableColumn';
		currentDeleteBtn.className = 'tableColumn delete';
		
		currentNameCol.innerHTML = tableKeys[i];
		
		currentDeleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
		
		currentRow.appendChild(currentNameCol);
		currentRow.appendChild(currentDeleteBtn);
		newTableBody.appendChild(currentRow);
	}
	
	
}
