var Mediator = (function(PubSub){
	if(!PubSub || typeof PubSub !== 'function'){ 
		throw "Simple PubSub.js required";
	}
	function Noop(){}
	
	 
	var getSet = {
		set: function(key, value){
			this.__sharedVals[key] = value;
			this.emit('change:'+key, value);
		},
		get: function(key){
			return this.__sharedVals[key];
		}
	};
	
	function Mediator(){
		this.__events = {};
		this.__sharedVals = {};
	}
	Mediator.prototype = PubSub.prototype;
	
	Mediator.prototype.register = function(child){
		Noop.prototype = PubSub.prototype;
		child.prototype = new Noop();
		child.prototype.set = getSet.set;
		child.prototype.get = getSet.get;
		child.prototype.__sharedVals = this.__sharedVals;
		child.prototype.__events = this.__events;
	}
	
	return Mediator;
}(PubSub));




var app = new Mediator();


function Particle(){
	this.on('change:sam', function(){ console.log(arguments); });
}
app.register(Particle);

function Sam(){
	this.set('sam',1);
}
app.register(Sam);

var a = new Particle();
var b = new Sam();



