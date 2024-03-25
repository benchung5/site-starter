// when using this, just set draggable="true", class draggable and data-index to the elements to drag, 
// then add 'draggable-container' class to the container
var DragReorder = {
	initDragReorder: function(draggablesState, callback) {
		this.callback = callback;
		this.updatedDraggablesState = [];

		this.reInitDragReorder(draggablesState);

		const container = this.el.querySelector('.draggable-container');

		container.addEventListener('dragover', e => {
			e.preventDefault()
			let afterElement = this.getDragAfterElement(container, e.clientX);
			const draggable = document.querySelector('.dragging');

			// 	console.log(this.draggablesState)
			// const dragging = this.draggablesState.splice(draggable.dataset.index, 1);

			if (afterElement == null) {
		  	container.appendChild(draggable)
		  } else {
		  	container.insertBefore(draggable, afterElement)
		  }
		})
	},
	reInitDragReorder: function(updatedState) {
		//clone the state
		this.draggablesState = JSON.parse(JSON.stringify(updatedState))

		const draggables = [...this.el.querySelectorAll('[draggable="true"]')];
		
		draggables.forEach(draggable => {
			draggable.addEventListener('dragstart', () => {
				draggable.classList.add('dragging');
			})

			draggable.addEventListener('dragend', () => {
				draggable.classList.remove('dragging');
				this.updateState();
			})
		})
	},
	getDragAfterElement: function(container, x) {
		const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

		return draggableElements.reduce((closest, child) => {
			const box = child.getBoundingClientRect()
			const offset = x - box.left - box.width / 2
			if (offset < 0 && offset > closest.offset) {
				return { offset: offset, element: child }
			} else {
				return closest
			}
		}, { offset: Number.NEGATIVE_INFINITY }).element
	},
	updateState: function() {
		const changedDraggables = [...this.el.querySelectorAll('[draggable="true"]')];
		
		//clear updatedDraggablesState first
		this.updatedDraggablesState = [];
		changedDraggables.map((draggable, index) => {
			this.updatedDraggablesState.push(this.draggablesState[draggable.dataset.index]);
		});

		this.callback(this.updatedDraggablesState);
		//after updating, elements are rebuilt so need to reset event listeners for draggables
		this.reInitDragReorder(this.updatedDraggablesState);
	}
}

export default DragReorder;


