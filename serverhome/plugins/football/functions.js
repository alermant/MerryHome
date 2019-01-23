const Axios = require('axios');
Axios.defaults.baseURL = 'http://api.football-data.org/v2/'
Axios.defaults.headers.common['X-Auth-Token'] = process.env.API_KEY_FOOTBALL

const getCompetition = 'competitions?plan=TIER_ONE';

async function getCompetitionId(competitionName) {
    const {data} = await Axios.get(`competitions?plan=TIER_ONE`);
    const competitionId = data.competitions
        .find(competition => competition.name.toUpperCase() === competitionName.toUpperCase());
    if (!competitionId) {
        throw new Error(`Pas de résultat pour ${competitionName}`);
    }
    return competitionId.id
}

async function getNextMatch(competitionName) {
    const competitionId = await getCompetitionId(competitionName);
    const {data} = await Axios.get(`competitions/${competitionId}/matches?status=SCHEDULED`);
    const matche = data.matches[0];
    if (!matche) {
        throw new Error(`Pas de futur match prévu.`);
    }
    const date = new Date(matche.utcDate);

    return {
        resultText: `Le prochain match est prévu le
            ${date.getDate()} ${date.getMonth()+1} ${date.getFullYear()}
            à ${date.getHours()} ${date.getHours()} ${date.getMinutes() > 0 ? date.getMinutes() : ''} ${date.getFullYear()},
            ${matche.homeTeam.name} contre ${matche.awayTeam.name}`,
        data: [matche]
    }
}

async function getEveryMatch(competitionName) {
    const competitionId = await getCompetitionId(competitionName);
    const {data} = await Axios.get(`competitions/${competitionId}/matches?status=SCHEDULED`);
    const matchs = data.matches;
    if (!matchs) {
        throw new Error(`Pas de futur match prévu.`);
    }
    let message = 'Voici tous les matchs de la ' + competitionName

    return {
        resultText: `Voici tous les matchs de la  ${competitionName}`,
        data: matchs
    }
}

async function getResult(team1, team2, competitionName) {
    const competitionId = await getCompetitionId(competitionName);
    const {data} = await Axios.get(`competitions/${competitionId}/matches?status=FINISHED`);
    const matchs = data.matches
        .find(el => el.homeTeam.name.toUpperCase() === team1.toUpperCase() && el.awayTeam.name.toUpperCase() === team2.toUpperCase());
    if (!matchs) {
        throw new Error(`Je n'ai pas trouvé de résultat`);
    }

    return {
        resultText: `Voici le resultat du match ${team1} ${team2}:`,
        data: [matchs]
    }
}

async function giveMeResultDate(competitionName, dateMatch) {
    const competitionId = await getCompetitionId(competitionName);
    const {data} = await Axios.get(`competitions/${competitionId}/matches?status=FINISHED`);
    const matchs = data.matches.map(el => {
        const date = new Date(el.utcDate);
        let month  = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
        if(`${date.getDate()} ${month} ${date.getFullYear()}` === dateMatch)
            return el
    });
    if (!matchs) {
        throw new Error(`Je n'ai pas trouvé de résultat`);
    }

    return {
        resultText: `Voici les resultats pour la ${competitionName} pour la journée du ${dateMatch}:`,
        data: matchs
    }
}

module.exports = {getNextMatch, getEveryMatch, getResult, giveMeResultDate};