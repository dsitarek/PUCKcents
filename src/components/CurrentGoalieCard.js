import React from 'react';
import PropTypes from 'prop-types';

export default function CurrentGoalieCard({
  currentStats, currentInfo, roundNum, playerImgURL,
}) {
  return (
    <div className="current-details-card">
      <div className="details-current-header">
        <div><img src={playerImgURL} className="player-img" alt={currentStats.name} /></div>
        <div className="details-current-info">
          <ul>
            <li><b>Current Team:</b> {currentInfo.currentTeam.name}</li>
            <li><b>Position:</b> {currentInfo.primaryPosition.name}</li>
            <li><b>Birthdate:</b> {new Date(currentInfo.birthDate).toLocaleDateString('en-US')}</li>
            <li><b>Origin:</b> {currentInfo.birthCity}, {currentInfo.birthStateProvince}{currentInfo.birthStateProvince ? ', ' : ''}{currentInfo.birthCountry}</li>
            <li><b>Height:</b> {currentInfo.height}</li>
            <li><b>Weight:</b> {currentInfo.weight}lbs</li>
            <li><b>Catches:</b> {(currentInfo.shootsCatches).startsWith('R') ? 'Right' : 'Left'}</li>
          </ul>
        </div>
      </div>
      <h4>Current Season Stats</h4>
      <div className="details-current-body">
        <li><b>Games:</b> {currentStats.games}</li>
        <li><b>Wins:</b> {currentStats.wins}</li>
        <li><b>Losses:</b> {currentStats.losses}</li>
        <li><b>Shutouts:</b> {currentStats.shutouts}</li>
        <li><b>Goals Against:</b> {currentStats.goalsAgainst}</li>
        <li><b>GAA:</b> {roundNum(currentStats.goalAgainstAverage, 3)}</li>
        <li><b>Saves:</b> {currentStats.saves}</li>
        <li><b>Save Pct:</b> {roundNum(currentStats.savePercentage, 3)}</li>
        <li><b>Even Strength Save Pct:</b> {roundNum(currentStats.evenStrengthSavePercentage / 100, 3)}</li>
        <li><b>Even Strength Saves:</b> {currentStats.evenSaves}</li>
        <li><b>Power Play Save Pct:</b> {roundNum(currentStats.powerPlaySavePercentage / 100, 3)}</li>
        <li><b>Power Play Saves:</b> {currentStats.powerPlaySaves}</li>
        <li><b>Shorthanded Save Pct:</b> {roundNum(currentStats.shorthandedSavePercentage / 100, 3)}</li>
        <li><b>Shorthanded Saves:</b> {currentStats.shortHandedSaves}</li>
        <li><b>Games Started:</b> {currentStats.gamesStarted}</li>
        <li><b>TOI:</b> {currentStats.timeOnIce}</li>
        {currentStats.goals ? <li><b>Goals:</b> {currentStats.goals}</li> : ''}
        {currentStats.assists ? <li><b>Assists:</b> {currentStats.assists}</li> : ''}
      </div>
    </div>
  );
}

CurrentGoalieCard.propTypes = {
  currentStats: PropTypes.shape().isRequired,
  currentInfo: PropTypes.shape().isRequired,
  roundNum: PropTypes.func.isRequired,
  playerImgURL: PropTypes.string.isRequired,
};
