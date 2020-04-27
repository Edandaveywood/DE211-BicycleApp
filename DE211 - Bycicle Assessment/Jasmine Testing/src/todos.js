/* globals localStorage */

// FEATURE 13. Provide default values
const STORAGE_KEY = 'todoListMike'

// FEATURE 2. Add a part
class Task { // eslint-disable-line no-unused-vars
  // FEATURE 11. A calculation within a part
  // NOT IMPLEMENTED :-(
  constructor (newId, newTitle) {
    this.id = newId
    this.title = newTitle
    this.completed = false // FEATURE 13. Provide default values
  }
}

// FEATURE 1. Create a whole that acts as a Facade for parts
class TodoList { // eslint-disable-line no-unused-vars
  constructor () {
    this.allMyTasks = []
    // the following 3 attibutes are used to support editing a task
    this.editedItem = null
    this.editedTaskIndex = null
    this.beforeEditTitleCache = ''
  }

  // FEATURE 15. Get all parts
  getAllTasks () {
    return this.allMyTasks
  }

  // FEATURE 12. A calculation across many parts ! a weak example !
  // FEATURE 4. Filter parts
  getActiveTasks () {
    return this.allMyTasks.filter(task => !task.completed)
  }

  // FEATURE 12. A calculation across many parts ! a weak example !
  // FEATURE 4. Filter parts
  getCompletedTasks () {
    return this.allMyTasks.filter(function (task) {
      return task.completed
    })
  }

  // FEATURE 7. Load all parts from LocalStorage
  load () {
    // FEATURE 13. Provide default values
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  }

  //  FEATURE 6. Save all parts to LocalStorage
  save () {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.allMyTasks))
  }

  // FEATURE 2. Add a part
  addTask (newTitle) {
    newTitle = newTitle.trim()
    if (!newTitle) {
      return
    }
    // FEATURE 13. Provide default values
    const newId = this.allMyTasks.length + 1
    const aNewTask = new Task(newId, newTitle)
    this.allMyTasks.push(aNewTask)
  }

  // FEATURE 12. A calculation across many parts
  remaining () {
    return this.getActiveTasks().length
  }

  // FEATURE 12. A calculation across many parts
  getAllDone () {
    return this.remaining() === 0
  }

  setAllDone () {
    this.allMyTasks.forEach(function (task) {
      task.completed = true
    })
  }

  // FEATURE 5. Delete a selected part
  removeTask (targetTaskTitle) {
    const index = this.allMyTasks.findIndex(task => task.title === targetTaskTitle)
    this.allMyTasks.splice(index, 1)
  }

  // FEATURE 8. Update/edit a part
  // copies the task and title 
  startEditing (task) {
    this.beforeEditCache = task.title
    this.editedTask = task
  }

  // FEATURE 8. Update/edit a part
  doneEditing (task) {
    // FEATURE 10. Validate inputs
    if (!task) {
      return
    }
    this.editedTask = null
    task.title = task.title.trim()
    if (!task.title) {
      this.removeTask(task)
    }
  }

  // FEATURE 9. Discard /revert edits to a part
  cancelEditing (task) {
    this.editedTask = null
    task.title = this.beforeEditCache
  }

  // FEATURE 5. Delete a selected part
  removeCompleted () {
    this.allMyTasks = this.getActiveTasks ()
  }

  // FEATURE 3. Sort parts
  sortTasks () {
    this.allMyTasks.sort(function (a, b) {
      if (a.title < b.title) {
        return -1
      }
      if (a.title > b.title) {
        return 1
      }
      // a must be equal to b
      return 0
    })
  }

  // FEATURE 14. Find a part given a search criterion
  // NOTE: finds only FIRST match!
  findTask (targetTitle) {
    return this.allMyTasks.find((task) => task.title === targetTitle)
  }
}
