import React from 'react';
import PropTypes from 'prop-types';
import noImg from '../assets/noImg.png';

export default function CurrentForwardCard({ currentStats, currentInfo, playerImgURL }) {
  return (
    <div className="current-details-card">
      <div className="current-info-container">
        <h2>{currentInfo.fullName}</h2>
        <div className="details-current-header">
          <div><img src={playerImgURL} className="player-img" alt={currentInfo?.name || 'player'} onError={(e) => { e.target.onerror = null; e.target.src = noImg; }} /></div>
          <div className="details-current-info">
            {currentStats?.shifts
              ? (
                <ul>
                  <li><b>Current Team:</b> {currentInfo?.currentTeam?.name || 'N/A'}</li>
                  <li><b>Position:</b> {currentInfo?.primaryPosition?.name || 'N/A'}</li>
                  <li><b>Birthdate:</b> {currentInfo?.birthDate ? new Date(currentInfo.birthDate).toLocaleDateString('en-US') : 'N/A'}</li>
                  <li><b>Origin:</b> {currentInfo?.birthCity || 'N/A'}, {currentInfo.birthStateProvince}{currentInfo.birthStateProvince ? ', ' : ''}{currentInfo.birthCountry}</li>
                  <li><b>Height:</b> {currentInfo?.height || 'N/A'}</li>
                  <li><b>Weight:</b> {currentInfo?.weight || 'N/A'}lbs</li>
                  <li><b>Catches:</b> {(currentInfo?.shootsCatches || 'N/A').startsWith('R') ? 'Right' : 'Left'}</li>
                </ul>
              ) : <h4 className="no-stats-header">No Current Stats  For {currentInfo.fullName}</h4>}
          </div>
        </div>
      </div>
      {currentStats?.shifts ? (
        <>
          <h4 className="info-header">Current Season Stats</h4>
          <div className="details-current-body">
            <div>
              <table className="line-stats-table">
                <thead>
                  <tr>
                    <th className="line-stats-table-header">Even Strength TOI</th>
                    <th className="line-stats-table-header">Power Play Goals</th>
                    <th className="line-stats-table-header">Power Play Points</th>
                    <th className="line-stats-table-header">Power Play TOI</th>
                    <th className="line-stats-table-header">Shorthanded Goals</th>
                    <th className="line-stats-table-header">Shorthanded Points</th>
                    <th className="line-stats-table-header">Shorthanded TOI</th>
                    <th className="line-stats-table-header">PIM</th>
                    <th className="line-stats-table-header">Total TOI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="line-stats-table-data">{currentStats.evenTimeOnIcePerGame}</td>
                    <td className="line-stats-table-data">{currentStats.powerPlayGoals}</td>
                    <td className="line-stats-table-data">{currentStats.powerPlayPoints}</td>
                    <td className="line-stats-table-data">{currentStats.powerPlayTimeOnIce}</td>
                    <td className="line-stats-table-data">{currentStats.shortHandedGoals}</td>
                    <td className="line-stats-table-data">{currentStats.shortHandedPoints}</td>
                    <td className="line-stats-table-data">{currentStats.shortHandedTimeOnIce}</td>
                    <td className="line-stats-table-data">{currentStats.pim}</td>
                    <td className="line-stats-table-data">{currentStats.timeOnIce}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <table className="line-stats-table">
                <thead>
                  <tr>
                    <th className="line-stats-table-header">Games</th>
                    <th className="line-stats-table-header">Goals</th>
                    <th className="line-stats-table-header">Assists</th>
                    <th className="line-stats-table-header">Points</th>
                    <th className="line-stats-table-header">Shots</th>
                    <th className="line-stats-table-header">Shot %</th>
                    <th className="line-stats-table-header">Faceoff %</th>
                    <th className="line-stats-table-header">Plus/Minus</th>
                    <th className="line-stats-table-header">Blocked Shots</th>
                    <th className="line-stats-table-header">Hits</th>
                    <th className="line-stats-table-header">Game Winning Goals</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="line-stats-table-data">{currentStats.games}</td>
                    <td className="line-stats-table-data">{currentStats.goals}</td>
                    <td className="line-stats-table-data">{currentStats.assists}</td>
                    <td className="line-stats-table-data">{currentStats.points}</td>
                    <td className="line-stats-table-data">{currentStats.shots}</td>
                    <td className="line-stats-table-data">{currentStats.shotPct}</td>
                    <td className="line-stats-table-data">{currentStats.faceOffPct}</td>
                    <td className="line-stats-table-data">{currentStats.plusMinus}</td>
                    <td className="line-stats-table-data">{currentStats.blocked}</td>
                    <td className="line-stats-table-data">{currentStats.hits}</td>
                    <td className="line-stats-table-data">{currentStats.gameWinningGoals}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : '' }
    </div>
  );
}

CurrentForwardCard.propTypes = {
  currentStats: PropTypes.shape().isRequired,
  currentInfo: PropTypes.shape().isRequired,
  playerImgURL: PropTypes.string.isRequired,
};
