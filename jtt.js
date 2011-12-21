
var JTT = (function() {
	var JTT,
		isBrowser,
		printErrorOnBrowser,
		printErrorOnConsole,
		printError,
		assertTrue
	;
	
	JTT = { };
	isBrowser = !(typeof document === 'undefined');
	
	printErrorOnBrowser = function(message) {
		document.write(message);
	};

	printErrorOnConsole = function(message) {
		console.error(message);
	};
	
	printError = function(message) {
		if(isBrowser) {
			printErrorOnBrowser(message);
		}
		else {
			printErrorOnConsole(message);
		}
	};
	
	assertTrue = function(condition, messageIfFalse) {
		if(!condition) {
			printError(messageIfFalse);
		}
	};
	
	JTT.assertTrue = assertTrue;
	
	return JTT;
}());

JTT.assertTrue(1 === 3, "1 does not equal 3");
JTT.assertTrue(1 === 1, "1 should equal 1");
