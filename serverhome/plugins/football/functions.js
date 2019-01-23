function getNextMatch(competitionName) {

    return {
        resultText: "Je n'ai pas trouvé de résultat",
        data: []
    }
}

function getEveryMatch(competitionName) {
    return {
        resultText: "Je n'ai pas trouvé de résultat",
        data: []
    }
}

function getResult(team1, team2, competitionName) {
    return {
        resultText: "Je n'ai pas trouvé de résultat",
        data: []
    }
}

function giveMeResultDate(competition, date) {
    return {
        resultText: "Je n'ai pas trouvé de résultat",
        data: []
    }
}

module.exports = {getNextMatch, getEveryMatch, getResult, giveMeResultDate};