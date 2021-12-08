import React from 'react';
import PropTypes from 'prop-types';

export default function CurrentDefenseCard({
  currentStats, currentInfo, playerImgURL,
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
            <li><b>Shoots:</b> {(currentInfo.shootsCatches).startsWith('R') ? 'Right' : 'Left'}</li>
          </ul>
        </div>
      </div>
      <h4>Current Season Stats</h4>
      <div className="details-current-body">
        <li><b>Games:</b> {currentStats.games}</li>
        <li><b>Wins:</b> {currentStats.wins}</li>
        <li><b>Losses:</b> {currentStats.losses}</li>
        <li><b>Goals:</b> {currentStats.goals}</li>
        <li><b>Assists:</b> {currentStats.assists}</li>
        <li><b>Points:</b> {currentStats.points}</li>
        <li><b>Shots:</b> {currentStats.shots}</li>
        <li><b>Shot Pct:</b> {currentStats.shotPct}%</li>
        <li><b>Plus/Minus:</b> {currentStats.plusMinus}</li>
        <li><b>Blocked Shots:</b> {currentStats.blocked}</li>
        <li><b>Hits:</b> {currentStats.hits}</li>
        <li><b>Game Winning Goals:</b> {currentStats.gameWinningGoals}</li>
        <li><b>Even Strength TOI:</b> {currentStats.evenTimeOnIcePerGame}</li>
        <li><b>Power Play Goals:</b> {currentStats.powerPlayGoals}</li>
        <li><b>Power Play Points:</b> {currentStats.powerPlayPoints}</li>
        <li><b>Power Play TOI:</b> {currentStats.powerPlayTimeOnIce}</li>
        <li><b>Shorthanded Goals:</b> {currentStats.shortHandedGoals}</li>
        <li><b>Shorthanded Points:</b> {currentStats.shortHandedPoints}</li>
        <li><b>Shorthanded TOI:</b> {currentStats.shortHandedTimeOnIce}</li>
        <li><b>PIM:</b> {currentStats.pim}</li>
        <li><b>Games Started:</b> {currentStats.gamesStarted}</li>
        <li><b>Total TOI:</b> {currentStats.timeOnIce}</li>
        {currentStats.goals ? <li><b>Goals:</b> {currentStats.goals}</li> : ''}
        {currentStats.assists ? <li><b>Assists:</b> {currentStats.assists}</li> : ''}
      </div>
    </div>
  );
}

CurrentDefenseCard.propTypes = {
  currentStats: PropTypes.shape().isRequired,
  currentInfo: PropTypes.shape().isRequired,
  playerImgURL: PropTypes.string.isRequired,
};
