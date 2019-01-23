class FootballController {

    constructor(io){
        this.io = io;
    }

    getView(req, res){
        var dataView = {
            "type" : "football",
            "itemType" : "",
            "items" : []
        };
        res.end(JSON.stringify(dataView));
    }

	postAction(req, res){
		var now = new Date();
		// TODO
		var response= "Il est "+now.getHours()+" heure "+now.getMinutes()+".";
		res.end(JSON.stringify({resultText: response}));
	}
}

module.exports = FootballController;