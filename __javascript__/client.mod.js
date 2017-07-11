	(function () {
		var save = function () {
			alert ('fooo');
		};
		__pragma__ ('<all>')
			__all__.save = save;
		__pragma__ ('</all>')
	}) ();
