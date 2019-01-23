const functions = require('./functions')
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
		let result = {
			resultText: "Je n'ai pas trouvé de résultat",
			data: []
		}
		console.log('functions', functions);
		switch (req.params.actionId) {
			case "next-match-competition":
				// donne-moi le prochain match de la (?P<competition>.+)
				result = functions.getNextMatch(req.body.competition);
			break;
			case "give-me-every-match-from":
				// donne-moi tous les matchs de la (?P<competition>.+)
				result = functions.getEveryMatch(req.body.competition);
			break;
			case "give-me-result":
				// donne-moi le résultat (?P<equipe1>.+) contre (?P<equipe2>.+) de la (?P<competition>.+)
				result = functions.getResult(req.body.equipe1, req.body.equipe2, req.body.competition);
			break;
			case "give-me-result-date":
				// donne-moi le résultat de la (?P<competition>.+) du (?P<date>.+)
				result = functions.giveMeResultDate(req.body.competition, req.body.date);
			break;
		}
		res.json(result);
	}
}

module.exports = FootballController;