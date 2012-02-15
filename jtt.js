var JTT = {
    assertEqual: function (expected, actual) {
        if (expected !== actual)
            throw new Error();
    },
    passes: 0,
    fails: 0,
    pass: function () {
        this.passes++;
    },
    fail: function () {
        this.fails++;
    },
    testPassFail: function () {
        this.fail();
        this.fail();

        this.pass();
        this.pass();

        this.assertEqual(2, this.fails);
        this.assertEqual(2, this.passes);
    },
    isTestFunction: function (element, obj) {
        var beginsWithTest = element.substring(0, 4) === 'test';
        var isFunction = typeof (obj[element]) === 'function';
        return beginsWithTest && isFunction;
    },
    runTestSuite: function (testSuite) {
        for (element in testSuite) {
            if (this.isTestFunction(element, testSuite)) {
                testSuite[element]();
            }
        }
    },
    run: function () {
        this.testPassFail();

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
        this.runTestSuite(testSuite);
        this.assertEqual(true, testARun);
        this.assertEqual(false, someFunctionRun);

    }
};


JTT.run();

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
