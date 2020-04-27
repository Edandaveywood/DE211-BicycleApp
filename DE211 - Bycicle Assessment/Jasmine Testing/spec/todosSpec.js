/* globals describe it xdescribe xit beforeEach expect TodoList localStorage STORAGE_KEY */
describe('TodoList', function () {
  var theTodoList

  function getTitles (allTasks) {
    const allTitles = []
    for (const aTask of allTasks) {
      allTitles.push(aTask.title)
    }
    return allTitles
  }

  beforeEach(function () {
    theTodoList = new TodoList()
  })

  describe('adding tasks', function () {
    // FEATURE 1. Create a whole that acts as a Facade for parts
    // FEATURE 2. Add a part
    describe('when a single task with a title of "a new task" is added', function () {
      var theTask
      beforeEach(function () {
        theTodoList.addTask('a new task')
        theTask = theTodoList.allMyTasks[0]
      })

      describe('the added single task', function () {
        it('should have an id of 1', function () {
          expect(theTask.id).toBe(1)
        })

        it('should have a title of "a new task"', function () {
          expect(theTask.title).toBe('a new task')
        })

        it('should not be completed', function () {
          expect(theTask.completed).toBeFalsy()
        })
      })

      describe('the todosList app', function () {
        it('should have one task', function () {
          expect(theTodoList.allMyTasks.length).toBe(1)
        })

        it('should have 1 active task remaining', function () {
          expect(theTodoList.remaining()).toBe(1)
        })

        it('should not be "all done"', function () {
          expect(theTodoList.getAllDone()).toBeFalsy()
        })
      })
    })

    describe('when three tasks are added', function () {
      it('should have 3 tasks', function () {
        theTodoList.addTask('1st')
        theTodoList.addTask('2nd')
        theTodoList.addTask('3rd')
        expect(theTodoList.allMyTasks.length).toBe(3)
      })
    })
  })

  // FEATURE 6. Save all parts to LocalStorage
  describe('save', function () {
    it('should save an task in localStorage when it kas a single item', function () {
      localStorage.clear()
      theTodoList = new TodoList()
      theTodoList.addTask('a new task')
      theTodoList.save()
      var itemJSON = localStorage.getItem(STORAGE_KEY)
      expect(itemJSON).toBeTruthy()
    })

    it('should have the correct JSON for the correct task in localStorage', function () {
      localStorage.clear()
      theTodoList = new TodoList()
      theTodoList.addTask('a new task')
      theTodoList.save()
      var itemJSON = localStorage.getItem(STORAGE_KEY)
      expect(itemJSON).toBe('[{"id":1,"title":"a new task","completed":false}]')
    })
  })

  // FEATURE 7. Load all parts from LocalStorage
  describe('load', function () {
    it('should load an task from localStorage when it has a single task', function () {
      // save something
      localStorage.clear()
      theTodoList = new TodoList()
      theTodoList.addTask('a new todo')
      theTodoList.save()
      // the start the model again
      theTodoList = new TodoList()
      // and load
      theTodoList.load()
      var itemJSON = localStorage.getItem(STORAGE_KEY)
      expect(itemJSON).toBeTruthy()
    })

    it('should have the correct JSON for the loaded item', function () {
      // save something
      localStorage.clear()
      theTodoList = new TodoList()
      theTodoList.addTask('a new task')
      theTodoList.save()
      // the start the model again
      theTodoList = new TodoList()
      // and load
      theTodoList.load()
      var itemJSON = localStorage.getItem(STORAGE_KEY)
      expect(itemJSON).toBe('[{"id":1,"title":"a new task","completed":false}]')
    })
  })

  // FEATURE 3. Sort parts
  describe('sorting tasks', function () {
    it('should put tasks into alphabetic title order', function () {
      var theTodoList = new TodoList()
      theTodoList.addTask('c')
      theTodoList.addTask('a')
      theTodoList.addTask('b')
      theTodoList.sortTasks()
      const actualOrderedTaskTitles = getTitles(theTodoList.allMyTasks)
      const expectedSortedTaskTitles = ['a', 'b', 'c']
      expect(expectedSortedTaskTitles).toEqual(actualOrderedTaskTitles)
    })
  })

  // FEATURE 4. Filter parts
  describe('filtering tasks', function () {
    var theTodoList = new TodoList()
    theTodoList.addTask('a')
    theTodoList.addTask('b')
    theTodoList.addTask('c')
    theTodoList.allMyTasks[1].completed = true

    it('should be able to return only active/remaining tasks', function () {
      const expectedActiveCount = 2
      const expectedActiveTaskTitles = ['a', 'c']
      const actualActiveList = theTodoList.getActiveTasks()
      const actualActiveCount = actualActiveList.length
      const actualActiveTaskTitles = getTitles(actualActiveList)

      expect(actualActiveCount).toBe(expectedActiveCount)
      expect(actualActiveTaskTitles).toEqual(expectedActiveTaskTitles)
    })

    it('should be able to return only completed tasks', function () {
      const expectedCompletedCount = 1
      const expectedCompletedTaskTitles = ['b']
      const actualCompletedList = theTodoList.getCompletedTasks()
      const actualCompletedCount = actualCompletedList.length
      const actualCompletedTaskTitles = getTitles(actualCompletedList)
      expect(actualCompletedCount).toBe(expectedCompletedCount)
      expect(actualCompletedTaskTitles).toEqual(expectedCompletedTaskTitles)
    })

    it('should correctly calculate the number of remaining tasks', function () {
      const expectedRemainingCount = 2
      const actualRemainingCount = theTodoList.remaining()
      expect(actualRemainingCount).toBe(expectedRemainingCount)
    })
  })

  // FEATURE 5. Delete a selected part
  describe('deleting a task', function () {
    var theTodoList = new TodoList()
    theTodoList.addTask('a')
    theTodoList.addTask('b')
    theTodoList.addTask('c')
    theTodoList.removeTask('b')
    it('should remove that task', function () {
      const expectedTaskTitles = ['a', 'c']
      const actualTaskTitles = getTitles(theTodoList.allMyTasks)
      expect(actualTaskTitles).toEqual(expectedTaskTitles)
    })

    it('should reduce the task count', function () {
      const expectedRemainingCount = 2
      const actualRemainingCount = theTodoList.allMyTasks.length
      expect(actualRemainingCount).toBe(expectedRemainingCount)
    })
  })

  describe('removing all completed tasks', function () {
    var theTodoList = new TodoList()
    theTodoList.addTask('a')
    theTodoList.addTask('b')
    theTodoList.addTask('c')
    theTodoList.addTask('d')
    theTodoList.allMyTasks[1].completed = true
    theTodoList.allMyTasks[2].completed = true
    theTodoList.removeCompleted()
    it('should remove all of the completed tasks', function () {
      const expectedTaskTitles = ['a', 'd']
      const actualTaskTitles = getTitles(theTodoList.allMyTasks)
      expect(actualTaskTitles).toEqual(expectedTaskTitles)
    })

    it('should reduce the task count', function () {
      const expectedRemainingCount = 2
      const actualRemainingCount = theTodoList.allMyTasks.length
      expect(actualRemainingCount).toBe(expectedRemainingCount)
    })
  })

  // FEATURE 8. Update/edit a part
  describe('editing a task', function () {
    var theTodoList = new TodoList()
    theTodoList.addTask('a')
    theTodoList.addTask('b')
    theTodoList.addTask('c')
    theTodoList.startEditing(theTodoList.allMyTasks[1])
    theTodoList.allMyTasks[1].title = 'bb'
    theTodoList.doneEditing(theTodoList.allMyTasks[1])
    it('should change the title of that task', function () {
      expect(theTodoList.allMyTasks[1].title).toBe('bb')
    })
  })

  // FEATURE 9. Discard /revert edits to a part
  describe('discarding edits to a task', function () {
    it('should not change the title of that task', function () {
      var theTodoList = new TodoList()
      theTodoList.addTask('a')
      theTodoList.addTask('b')
      theTodoList.addTask('c')
      theTodoList.startEditing(theTodoList.allMyTasks[1])
      theTodoList.allMyTasks[1].title = 'bb'
      theTodoList.cancelEditing(theTodoList.allMyTasks[1])
      expect(theTodoList.allMyTasks[1].title).toBe('b')
    })
  })

  // FEATURE 10. Validate inputs
  describe('validating inputs to a task', function () {
    it('should not allow empty titles', function () {
      var theTodoList = new TodoList()
      theTodoList.addTask('a')
      theTodoList.addTask('')
      theTodoList.addTask('  ')
      theTodoList.addTask('b')
      const expectedTaskTitles = ['a', 'b']
      const actualTaskTitles = getTitles(theTodoList.allMyTasks)
      expect(actualTaskTitles).toEqual(expectedTaskTitles)
    })
  })

  // FEATURE 11. A calculation within a part
  // NOT IMPLEMENTED!, therefore NOT TESTED!
  xdescribe('a ??? calculation within a part', function () {
    xit('should do the ???? calculation correctly', function () {
      expect(true).toBeTrue()
    })
  })
  // FEATURE 12. A calculation across many parts
  describe('working out if all tasks are done', function () {
    it('should return true for an empty list', function () {
      var theTodoList = new TodoList()
      expect(theTodoList.getAllDone()).toBeTrue()
    })

    it('should return false for a list with active tasks in it', function () {
      var theTodoList = new TodoList()
      theTodoList.addTask('a')
      theTodoList.addTask('b')
      expect(theTodoList.getAllDone()).toBeFalse()
    })

    it('should return true for a list with only completed tasks in it', function () {
      var theTodoList = new TodoList()
      theTodoList.addTask('a')
      theTodoList.addTask('b')
      theTodoList.allMyTasks[0].completed = true
      theTodoList.allMyTasks[1].completed = true
      expect(theTodoList.getAllDone()).toBeTrue()
    })
  })

  describe('counting active tasks', function () {
    it('should return the correct number of remaining tasks as tasks are added or completed', function () {
      var theTodoList = new TodoList()
      expect(theTodoList.remaining()).toBe(0)
      theTodoList.addTask('a')
      expect(theTodoList.remaining()).toBe(1)
      theTodoList.addTask('b')
      expect(theTodoList.remaining()).toBe(2)
      theTodoList.addTask('c')
      expect(theTodoList.remaining()).toBe(3)
      theTodoList.allMyTasks[1].completed = true
      expect(theTodoList.remaining()).toBe(2)
    })
  })

  // FEATURE 13. Provide default values
  describe('the default value for new tasks', function () {
    it('should allocate a sequentially incrementing id to all new tasks', function () {
      var theTodoList = new TodoList()
      for (let expectedId = 1; expectedId < 5; expectedId += 1) {
        theTodoList.addTask('another task')
        var actualId = theTodoList.allMyTasks[theTodoList.allMyTasks.length - 1].id
        expect(actualId).toBe(expectedId)
      }
    })

    it('should make all new tasks not completed', function () {
      var theTodoList = new TodoList()
      theTodoList.addTask('a')
      const actualCompleted = theTodoList.allMyTasks[0].completed
      expect(actualCompleted).toBeFalse()
    })
  })

  // FEATURE 14. Find a part given a search criterion
  describe('finding a task', function () {
    it('should find nothing with an empty todo list', function () {
      var theTodoList = new TodoList()
      const actualFoundTask = theTodoList.findTask('a')
      expect(actualFoundTask).toBeUndefined()
    })

    it('should find the only task with a title when that title is unique', function () {
      var theTodoList = new TodoList()
      theTodoList.addTask('a')
      theTodoList.addTask('b')
      theTodoList.addTask('c')
      const actualFoundTask = theTodoList.findTask('b')
      expect(actualFoundTask).toBeDefined()
      const expectedFoundTitle = 'b'
      const actualFoundTitle = actualFoundTask.title
      expect(actualFoundTitle).toBe(expectedFoundTitle)
    })

    it('should find the first task with that title when there is more than one task with the same title', function () {
      var theTodoList = new TodoList()
      theTodoList.addTask('a')
      theTodoList.addTask('b')
      theTodoList.addTask('b')
      theTodoList.addTask('c')
      const actualFoundTask = theTodoList.findTask('b')
      expect(actualFoundTask).toBeDefined()
      const expectedFoundTitle = 'b'
      const actualFoundTitle = actualFoundTask.title
      expect(actualFoundTitle).toBe(expectedFoundTitle)
      const expectedFoundId = 2
      const actualFoundId = actualFoundTask.id
      expect(actualFoundId).toBe(expectedFoundId)
    })
  })
})
