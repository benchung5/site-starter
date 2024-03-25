// when using this, just set draggable="true", class draggable and data-index to the elements to drag, 
// then add 'draggable-container' class to the container
var DragReorder = {
	initDragReorder: function(draggablesState, callback) {
		this.callback = callback;
		this.reInitDragReorder(draggablesState);
		this.container = this.el.querySelector('.draggable-container');

		this.container.addEventListener('dragover', e => {
			e.preventDefault()
			
			this.draggingIndex = document.querySelector('.dragging').dataset.index;
			this.updateInsertIndex(e.clientX);
		})
	},
	reInitDragReorder: function(updatedState) {
		//clone the state
		this.draggablesState = JSON.parse(JSON.stringify(updatedState))

		const draggables = [...this.el.querySelectorAll('[draggable="true"]')];
		draggables.forEach(draggable => {
			draggable.addEventListener('dragstart', () => {
				draggable.classList.add('dragging');
				this.draggableElements = [...this.container.querySelectorAll('.draggable:not(.dragging)')]
			})

			draggable.addEventListener('dragend', () => {
				draggable.classList.remove('dragging');
				this.updateState();
			})
		});
	},
	updateInsertIndex: function(x) {
		this.draggableElements = [...this.container.querySelectorAll('.draggable:not(.dragging)')]

		const afterElement = this.draggableElements.reduce((closest, child) => {
			const box = child.getBoundingClientRect()
			const offset = x - box.left - box.width / 2
			if (offset < 0 && offset > closest.offset) {
				return { offset: offset, element: child }
			} else {
				return closest
			}
		}, { offset: Number.NEGATIVE_INFINITY }).element

		if (afterElement == null) {
			this.insertIndex = this.draggablesState.length - 1;
	    } else {
	  		this.insertIndex = this.getIndexOfElement(afterElement);
	    }
	},
	getIndexOfElement: function(element) {
		return Array.from(this.draggableElements).indexOf(element);
	},
	updateState: function() {
		//remove the dragging item and store it at the same time
		let draggingItem = this.draggablesState.splice(this.draggingIndex, 1);
		//insert the dragging item at the insert index
		this.draggablesState.splice(this.insertIndex, 0, draggingItem[0]);
		
		this.callback(this.draggablesState);
		//after updating, elements are rebuilt so need to reset event listeners for draggables
		this.reInitDragReorder(this.draggablesState);
	}
}

export default DragReorder;


