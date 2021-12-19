import axios from 'axios';
import { supabase } from '../api/auth';

const statsApi = 'https://statsapi.web.nhl.com/api/v1';

const currentSeason = '20212022';

const removeDuplicatesFromArrayByProperty = (arr, prop) => arr.reduce((accumulator, currentValue) => {
  if (!accumulator.find((obj) => obj[prop] === currentValue[prop])) {
    accumulator.push(currentValue);
  }
  return accumulator;
}, []);

const getCurrentInfo = async (playerId) => {
  const call = await axios.get(`${statsApi}/people/${playerId}`);
  return call.data.people[0];
};

const getSearchedPlayers = async (userSearch) => {
  const { data } = await supabase
    .from('stats_with_grades')
    .select()
    .textSearch('name', userSearch);

  const playerDataArr = removeDuplicatesFromArrayByProperty(data, 'name');
  const searchedPlayerReturn = [];
  playerDataArr.forEach((player) => {
    searchedPlayerReturn.push({
      id: player.id,
      name: player.name,
      team: player.team,
      position: player.position,
    });
  });
  return searchedPlayerReturn;
};

export default getSearchedPlayers;

const getCurrentStats = async (playerId) => {
  const call = await axios.get(`${statsApi}/people/${playerId}/stats?stats=statsSingleSeason&season=${currentSeason}`);
  return call.data.stats[0]?.splits[0]?.stat;
};
const getRecentGames = async (playerId) => {
  const call = await axios.get(`${statsApi}/people/${playerId}/stats?stats=gameLog&season=${currentSeason}`);
  const gameIndex = call.data.stats[0].splits;
  return [gameIndex[2], gameIndex[1], gameIndex[0]];
};

export {
  getCurrentStats, getCurrentInfo, getRecentGames, getSearchedPlayers,
};
