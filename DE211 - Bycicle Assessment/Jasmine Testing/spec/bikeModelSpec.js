/* globals describe it xdescribe xit beforeEach expect CycleLog localStorage STORAGE_KEY */
describe('CycleLog', function() {
    var theCycleLog;

    function getTitles(allRides) {
        const allTitles = [];
        for (const aRide of allRides) {
            allTitles.push(aRide.title);
        }
        return allTitles;
    } 

    beforeEach(function () {
        theCycleLog = new CycleLog();
    })

    //FEATURE 1 - Create a whole that acts as a Facade for parts
    //FEATURE 2 - Add a part
    describe('Adding rides', function() {
        
        describe('When a single ride with a title of "a new ride" is added', function() {
            var theRide;
            beforeEach(function () {
                theCycleLog.addRide('a new ride');
                theRide = theCycleLog.allMyRides[0];
            })

            describe('the added single ride', function() {
                it('should have an id of 1', function() {
                    expect(theRide.id).toBe(1);
                })

                it('should have a title of "a new ride"', function() {
                    expect(theRide.title).toBe('a new ride');
                })

                it('should not be completed', function() {
                    expect(theRide.completed).toBeFalsy();
                })
            })

            describe('the CycleLog app', function() {
                it('should have one task', function() {
                    expect(theCycleLog.allMyRides.length).toBe(1);
                })

                it('should have once active task remaining', function() {
                    expect(theCycleLog.remaining()).toBe(1);
                })

                it('should not be "all done"', function() {
                    expect(theCycleLog.getAllDone()).toBeFalsy();
                })
            })
        })
        describe('when three rides are added', function () {
            it('should have 3 rides', function () {
              theCycleLog.addRide('1st');
              theCycleLog.addRide('2nd');
              theCycleLog.addRide('3rd');
              expect(theCycleLog.allMyRides.length).toBe(3);
            })
        })
    })

     // FEATURE 3. Sort parts
    describe('sorting rides', function () {
        it('should put rides into alphabetic title order', function () {
        var theCycleLog = new CycleLog();
        theCycleLog.addRide('c');
        theCycleLog.addRide('a');
        theCycleLog.addRide('b');
        theCycleLog.sortRides();
        const actualOrderedRideTitles = getTitles(theCycleLog.allMyRides);
        const expectedSortedRideTitles = ['a', 'b', 'c'];
        expect(expectedSortedRideTitles).toEqual(actualOrderedRideTitles);
        })
    })
    
    // FEATURE 4. Filter parts
    describe('filtering rides', function () {
        var theCycleLog = new CycleLog();
        theCycleLog.addRide('a');
        theCycleLog.addRide('b');
        theCycleLog.addRide('c');
        theCycleLog.allMyRides[1].completed = true;

        it('should be able to return only active/remaining rides', function () {
            const expectedActiveCount = 2
            const expectedActiveRideTitles = ['a', 'c']
            const actualActiveList = theCycleLog.getActiveRides()
            const actualActiveCount = actualActiveList.length
            const actualActiveRideTitles = getTitles(actualActiveList)

            expect(actualActiveCount).toBe(expectedActiveCount)
            expect(actualActiveRideTitles).toEqual(expectedActiveRideTitles)
        })

        it('should be able to return only completed rides', function () {
            const expectedCompletedCount = 1
            const expectedCompletedActiveRideTitles = ['b']
            const actualCompletedList = theCycleLog.getCompletedRides()
            const actualCompletedCount = actualCompletedList.length
            const actualCompletedRideTitles = getTitles(actualCompletedList)
            expect(actualCompletedCount).toBe(expectedCompletedCount)
            expect(actualCompletedRideTitles).toEqual(expectedCompletedActiveRideTitles)
        })

        it('should correctly calculate the number of remaining rides', function () {
            const expectedRemainingCount = 2
            const actualRemainingCount = theCycleLog.remaining()
            expect(actualRemainingCount).toBe(expectedRemainingCount)
        })
    })
})

