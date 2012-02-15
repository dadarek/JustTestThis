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
    runTestSuite = function (testSuite) {
        passes = 0;
        fails = 0;
        testsRun = 0;

        for (element in testSuite) {
            if (isTestFunction(element, testSuite)) {
                testSuite[element]();
                testsRun++;
            }
        }
    },
    testPassFail = function () {

        fail();
        fail();

        pass();
        pass();

        assertEqual(2, fails);
        assertEqual(2, passes);
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
