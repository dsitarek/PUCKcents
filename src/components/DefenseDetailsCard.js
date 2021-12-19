import React from 'react';
import PropTypes from 'prop-types';

export default function DefenseDetailsCard({ playerDetails, roundNum }) {
  return (
    <div className="past-details-card">
      <li><b>Team:</b> {playerDetails.team}</li>
      <div>
        <table className="line-stats-table">
          <thead>
            <tr>
              <th className="line-stats-table-header">Games</th>
              <th className="line-stats-table-header">Goals</th>
              <th className="line-stats-table-header">Assists</th>
              <th className="line-stats-table-header">Points</th>
              <th className="line-stats-table-header">Plus/Minus</th>
              <th className="line-stats-table-header">Goals Per Game</th>
              <th className="line-stats-table-header">Blocked Shots Per Game</th>
              <th className="line-stats-table-header">Blocked Shots</th>
              <th className="line-stats-table-header">PIM</th>
              <th className="line-stats-table-header">PIM Per Game</th>
              <th className="line-stats-table-header">Salary Cap Hit</th>
              <th className="line-stats-table-header">Cap Hit %</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="line-stats-table-data">{playerDetails.games}</td>
              <td className="line-stats-table-data">{playerDetails.goals}</td>
              <td className="line-stats-table-data">{playerDetails.assists}</td>
              <td className="line-stats-table-data">{playerDetails.points}</td>
              <td className="line-stats-table-data">{playerDetails.plusMinus}</td>
              <td className="line-stats-table-data">{roundNum(playerDetails.goals_per_game, 3)}</td>
              <td className="line-stats-table-data">{roundNum(playerDetails.blocked_shots_per_game, 3)}</td>
              <td className="line-stats-table-data">{playerDetails.blocked}</td>
              <td className="line-stats-table-data">{playerDetails.penaltymin}</td>
              <td className="line-stats-table-data">{roundNum(playerDetails.points_per_game, 3)}</td>
              <td className="line-stats-table-data">&#36;{(playerDetails.cap_hit).toLocaleString('en-US')}</td>
              <td className="line-stats-table-data">{roundNum((playerDetails.cap_pct * 100), 1)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <table className="line-stats-table">
          <thead>
            <tr>
              <th className="line-stats-table-header">Defense Skill Rating</th>
              <th className="line-stats-table-header">Defense Scoring Rating</th>
              <th className="line-stats-table-header">Defense Pass Rating</th>
              <th className="line-stats-table-header">Defense Block Rating</th>
              <th className="line-stats-table-header">Defense Shift Usage Rating</th>
              <th className="line-stats-table-header">Penalty Liability Rating</th>
              <th className="line-stats-table-header">Price Per Goal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="line-stats-table-data">{playerDetails?.Defense_Skill}</td>
              <td className="line-stats-table-data">{playerDetails?.def_scoring_rtg}</td>
              <td className="line-stats-table-data">{playerDetails?.def_pass_rtg}</td>
              <td className="line-stats-table-data">{playerDetails?.def_block_rtg}</td>
              <td className="line-stats-table-data">{playerDetails?.def_shift_usage_rtg}</td>
              <td className="line-stats-table-data">{playerDetails?.penalty_liability_rtg}</td>
              <td className="line-stats-table-data">&#36;{(roundNum((playerDetails.cap_hit / playerDetails.goals), 2)).toLocaleString('en-US')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

DefenseDetailsCard.propTypes = {
  playerDetails: PropTypes.shape().isRequired,
  roundNum: PropTypes.func.isRequired,
};
