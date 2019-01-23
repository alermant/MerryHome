const Axios = require('axios');
Axios.defaults.baseURL = 'http://api.football-data.org/v2/'
Axios.defaults.headers.common['X-Auth-Token'] = process.env.API_KEY_FOOTBALL

const getCompetition = 'competitions?plan=TIER_ONE';

async function getCompetitionId(competitionName) {
    const {data} = await Axios.get(`competitions?plan=TIER_ONE`);
    const competitionId = data.competitions
        .find(competition => competition.name.toUpperCase() === competitionName.toUpperCase());
    if (!competitionId) {
        throw `Pas de résultat pour ${competitionName}`;
    }
    return competitionId.id
}

async function getNextMatch(competitionName) {
    const competitionId = await getCompetitionId(competitionName);
    const {data} = await Axios.get(`competitions/${competitionId}/matches?status=SCHEDULED`);
    const matche = data.matches[0];
    if (!matche) {
        throw 'Pas de futur match prévu.';
    }
    const date = new Date(matche.utcDate);

    return {
        resultText: `Le prochain match est prévu le
            ${date.getDate()} ${date.getMonth()+1} ${date.getFullYear()}
            à ${date.getHours()} ${date.getHours()} ${date.getMinutes() > 0 ? date.getMinutes() : ''} ${date.getFullYear()},
            ${matche.homeTeam.name} contre ${matche.awayTeam.name}`,
        data: matche
    }
}

async function getEveryMatch(competitionName) {
    return {
        resultText: "Voici le résultat",
        data: []
    }
}

async function getResult(team1, team2, competitionName) {
    return {
        resultText: "Je n'ai pas trouvé de résultat",
        data: []
    }
}

async function giveMeResultDate(competition, date) {
    return {
        resultText: "Je n'ai pas trouvé de résultat",
        data: []
    }
}

module.exports = {getNextMatch, getEveryMatch, getResult, giveMeResultDate};