var JTT = function () {
    var assertEqual = function (expected, actual) {
        if (expected !== actual)
            throw new Error();
    },
    passes = 0,
    fails = 0,
    testsRun = 0,
    pass = function () {
        passes++;
    },
    fail = function () {
        fails++;
    },
    isTestFunction = function (element, obj) {
        var beginsWithTest = element.substring(0, 4) === 'test';
        var isFunction = typeof (obj[element]) === 'function';
        return beginsWithTest && isFunction;
    },
    runSingleTest = function (test) {
        try {
            test();
            pass();
        } catch (e) {
            fail();
        }
        testsRun++;
    },
    resetCounters = function () {
        passes = 0;
        fails = 0;
        testsRun = 0;
    },
    runTestSuite = function (testSuite) {
        resetCounters();
        for (element in testSuite) {
            if (isTestFunction(element, testSuite)) {
                runSingleTest(testSuite[element]);
            }
        }
    },
    assertPassesAndFails = function (expectedPasses, expectedFails) {
        assertEqual(expectedPasses, passes);
        assertEqual(expectedFails, fails);
    },
    testRunSingleTest = function () {
        resetCounters();

        var passingTest = function () { };
        runSingleTest(passingTest);
        assertPassesAndFails(1, 0);

        runSingleTest(passingTest);
        assertPassesAndFails(2, 0);

        var failingTest = function () { assertEqual(0, 1); };
        runSingleTest(failingTest);
        assertPassesAndFails(2, 1);

        runSingleTest(failingTest);
        assertPassesAndFails(2, 2);
    },
    testPassFail = function () {
        assertPassesAndFails(0, 0);

        fail();
        assertPassesAndFails(0, 1);
        fail();
        assertPassesAndFails(0, 2);

        pass();
        assertPassesAndFails(1, 2);
        pass();
        assertPassesAndFails(2, 2);
    },
    testRunSuite = function () {
        var testARun = false;
        var someFunctionRun = false;

        var testSuite = {
            someVar: null,
            testVar: null,
            testA: function () {
                testARun = true;
            },
            someFunction: function () {
                someFunctionRun = true;
            }
        };
        runTestSuite(testSuite);
        assertEqual(true, testARun);
        assertEqual(false, someFunctionRun);
    },
    testSuiteDoesNotThrowErrors = function () {
        var testSuite = {
            testFunctionThatThrows: function () { throw new Error(); }
        };
        runTestSuite(testSuite);
    },
    testSuiteCounters = function () {
        var testSuite = {
            testThatFailsA: function () { throw new Error(); },
            testThatFailsB: function () { throw new Error(); },
            testThatFailsC: function () { assertEqual(1, 0); },
            testThatPassesA: function () { /* do nothing */ },
            testThatPassesB: function () { assertEqual("hi", "hi"); }
        };
        runTestSuite(testSuite);
        assertPassesAndFails(2, 3);
        assertEqual(5, testsRun);
    },
    testRunCount = function () {
        var testSuite = {
            testA: function () { },
            testB: function () { },
            testVarA: null,
            testVarB: null,
            nonTestA: function () { },
            nonTestB: function () { }
        };
        runTestSuite(testSuite);
        assertEqual(2, testsRun);
    },
    runSelfTests = function () {
        testPassFail();
        testRunSuite();
        testRunCount();
        testRunSingleTest();
        testSuiteDoesNotThrowErrors();
        testSuiteCounters();
    };

    return {
        assertEqual: assertEqual,
        runSelfTests: runSelfTests,
        runTestSuite: runTestSuite
    };
} ();


JTT.runSelfTests();

var myTestSuite = {
    testFunction: function () {
        JTT.assertEqual(1, 1);
    },
    helperFunction: function () {
        // should not run
        JTT.assertEqual(2, 1);
    }
};

JTT.runTestSuite(myTestSuite);
