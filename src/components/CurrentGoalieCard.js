import React from 'react';
import PropTypes from 'prop-types';

export default function CurrentGoalieCard({
  currentStats, currentInfo, roundNum, playerImgURL,
}) {
  return (
    <div className="current-details-card">
      <h2>{currentInfo.fullName}</h2>
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
      <h4 className="info-header">Current Season Stats</h4>
      <div className="details-current-body">
        <div>
          <table className="line-stats-table">
            <thead>
              <tr>
                <th className="line-stats-table-header">Games</th>
                <th className="line-stats-table-header">Wins</th>
                <th className="line-stats-table-header">Losses</th>
                <th className="line-stats-table-header">Shutouts</th>
                <th className="line-stats-table-header">Save %</th>
                <th className="line-stats-table-header">Saves</th>
                <th className="line-stats-table-header">GAA</th>
                <th className="line-stats-table-header">Goals Against</th>
                <th className="line-stats-table-header">Games Started</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="line-stats-table-data">{currentStats.games}</td>
                <td className="line-stats-table-data">{currentStats.wins}</td>
                <td className="line-stats-table-data">{currentStats.losses}</td>
                <td className="line-stats-table-data">{currentStats.shutouts}</td>
                <td className="line-stats-table-data">{roundNum(currentStats.savePercentage, 3)}</td>
                <td className="line-stats-table-data">{currentStats.saves}</td>
                <td className="line-stats-table-data">{roundNum(currentStats.goalAgainstAverage, 3)}</td>
                <td className="line-stats-table-data">{currentStats.goalsAgainst}</td>
                <td className="line-stats-table-data">{currentStats.timeOnIce}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <table className="line-stats-table">
            <thead>
              <tr>
                <th className="line-stats-table-header">Even Strength Save %</th>
                <th className="line-stats-table-header">Even Strength Saves</th>
                <th className="line-stats-table-header">Power Play Save %</th>
                <th className="line-stats-table-header">Power Play Saves</th>
                <th className="line-stats-table-header">Shorthanded Save %</th>
                <th className="line-stats-table-header">Shorthanded Saves</th>
                <th className="line-stats-table-header">Games Started</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="line-stats-table-data">{roundNum(currentStats.evenStrengthSavePercentage / 100, 3)}</td>
                <td className="line-stats-table-data">{currentStats.evenSaves}</td>
                <td className="line-stats-table-data">{roundNum(currentStats.powerPlaySavePercentage / 100, 3)}</td>
                <td className="line-stats-table-data">{currentStats.powerPlaySaves}</td>
                <td className="line-stats-table-data">{roundNum(currentStats.shortHandedSavePercentage / 100, 3)}</td>
                <td className="line-stats-table-data">{currentStats.shortHandedSaves}</td>
                <td className="line-stats-table-data">{currentStats.gamesStarted}</td>
              </tr>
            </tbody>
          </table>
        </div>
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
