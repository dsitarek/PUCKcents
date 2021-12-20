import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlayerDetails } from '../data/databaseCalls';
import {
  ForwardDetailsCard, DefenseDetailsCard, GoalieDetailsCard, CurrentGoalieCard, CurrentDefenseCard, CurrentForwardCard,
} from '../components/index';
import { getCurrentStats, getCurrentInfo, getRecentGames } from '../data/nhlCalls';
import RecentGamesInfo from '../components/RecentGamesInfo';

export default function PlayerDetails() {
  const [formInput, setFormInput] = useState({
    year: '2020-2021',
  });
  const [playerDetails, setplayerDetails] = useState({});
  const [currentStats, setCurrentStats] = useState({});
  const [currentInfo, setCurrentInfo] = useState({});
  const [recentGames, setRecentGames] = useState([]);
  const { playerId } = useParams();
  const playerImgURL = `https://images.weserv.nl/?url=nhl.bamcontent.com/images/headshots/current/168x168/${playerId}.jpg`;

  useEffect(() => {
    if (currentInfo.fullName) document.title = `${currentInfo.fullName} Details`;
    else document.title = 'Loading';
  }, [currentInfo]);

  useEffect(() => {
    getCurrentStats(playerId).then(setCurrentStats);
    getCurrentInfo(playerId).then(setCurrentInfo);
    getRecentGames(playerId).then(setRecentGames);
  }, []);

  useEffect(() => {
    getPlayerDetails(playerId, formInput.year).then(setplayerDetails);
  }, [formInput]);

  const handleChange = (e) => {
    setFormInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const roundNum = (num, decimalPlaces) => {
    let exp = 1;
    if (decimalPlaces >= 1) {
      exp = 10 ** decimalPlaces;
    }
    return Math.round(num * exp) / exp;
  };

  return (
    <div className="details-container">
      {currentInfo.primaryPosition?.abbreviation === 'C' || currentInfo.primaryPosition?.abbreviation === 'LW' || currentInfo.primaryPosition?.abbreviation === 'RW' ? <CurrentForwardCard currentStats={currentStats} currentInfo={currentInfo} playerImgURL={playerImgURL} /> : ''}
      {currentInfo.primaryPosition?.abbreviation === 'D' ? <CurrentDefenseCard currentStats={currentStats} currentInfo={currentInfo} playerImgURL={playerImgURL} /> : ''}
      {currentInfo.primaryPosition?.abbreviation === 'G' ? <CurrentGoalieCard currentStats={currentStats} currentInfo={currentInfo} roundNum={roundNum} playerImgURL={playerImgURL} /> : ''}
      {!currentInfo.primaryPosition?.abbreviation ? 'Loading' : ''}

      <span className="recent-games-header"><h4>Recent Games</h4></span>
      <div className="recent-games-container">
        {recentGames[0]?.game ? recentGames.map((game) => <RecentGamesInfo key={game.game.gamePk} game={game} position={currentInfo.primaryPosition?.abbreviation} />) : 'No Recent Games'}
      </div>
      <div className="past-season-stats-container">
        <div className="past-season-stats-header">
          <h4>Previous Season Stats</h4>
          <select id="year" name="year" className="form-select year-dropdown" aria-label="Default select example" value={formInput.year} onChange={handleChange}>
            <option value="2020-2021">2020-2021</option>
            <option value="2019-2020">2019-2020</option>
            <option value="2018-2019">2018-2019</option>
            <option value="2017-2018">2017-2018</option>
            <option value="2016-2017">2016-2017</option>
            <option value="2015-2016">2015-2016</option>
            <option value="2014-2015">2014-2015</option>
            <option value="2013-2014">2013-2014</option>
            <option value="2012-2013">2012-2013</option>
            <option value="2011-2012">2011-2012</option>
          </select>
        </div>

        {playerDetails.position === 'Forward' ? <ForwardDetailsCard playerDetails={playerDetails} roundNum={roundNum} /> : ''}
        {playerDetails.position === 'Defenseman' ? <DefenseDetailsCard playerDetails={playerDetails} roundNum={roundNum} /> : ''}
        {playerDetails.position === 'Goalie' ? <GoalieDetailsCard playerDetails={playerDetails} roundNum={roundNum} /> : ''}
        {!playerDetails.id ? `No player data for ${formInput.year}` : ''}
      </div>
    </div>
  );
}
