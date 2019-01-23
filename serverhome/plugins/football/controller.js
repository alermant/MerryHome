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

	async postAction(req, res){
		var now = new Date();
		let result = {
			resultText: "Je n'ai pas trouvé de résultat",
			data: []
		}
		try {
			switch (req.params.actionId) {
				case "next-match-competition":
					// donne-moi le prochain match de la (?P<competition>.+)
					result = await functions.getNextMatch(req.body.competition);
				break;
				case "give-me-every-match-from":
					// donne-moi tous les matchs de la (?P<competition>.+)
					result = await functions.getEveryMatch(req.body.competition);
				break;
				case "give-me-result":
					// donne-moi le résultat (?P<equipe1>.+) contre (?P<equipe2>.+) de la (?P<competition>.+)
					result = await functions.getResult(req.body.equipe1, req.body.equipe2, req.body.competition);
				break;
				case "give-me-result-date":
					// donne-moi le résultat de la (?P<competition>.+) du (?P<date>.+)
					result = await functions.giveMeResultDate(req.body.competition, req.body.date);
				break;
			}
		} catch (e) {
			result.resultText = e.message;
		}

		res.json(result);
	}
}

module.exports = FootballController;