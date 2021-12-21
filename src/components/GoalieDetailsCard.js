import React from 'react';
import PropTypes from 'prop-types';

export default function GoalieDetailsCard({ playerDetails, roundNum }) {
  return (
    <div className="past-details-card">
      <li><b>Team:</b> {playerDetails.team}</li>
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
              <th className="line-stats-table-header">Shots Against</th>
              <th className="line-stats-table-header">Salary Cap Hit</th>
              <th className="line-stats-table-header">Cap Hit %</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="line-stats-table-data">{playerDetails.games}</td>
              <td className="line-stats-table-data">{playerDetails.wins}</td>
              <td className="line-stats-table-data">{playerDetails.losses}</td>
              <td className="line-stats-table-data">{playerDetails.shutouts}</td>
              <td className="line-stats-table-data">{roundNum(playerDetails.save_percentage, 3)}</td>
              <td className="line-stats-table-data">{playerDetails.saves}</td>
              <td className="line-stats-table-data">{roundNum(playerDetails.gaa, 3)}</td>
              <td className="line-stats-table-data">{playerDetails.goals_against}</td>
              <td className="line-stats-table-data">{playerDetails.shots_against}</td>
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
              <th className="line-stats-table-header">Goalie Skill Rating</th>
              <th className="line-stats-table-header">Goalie Save Rating</th>
              <th className="line-stats-table-header">Goalie GAA Rating</th>
              <th className="line-stats-table-header">Goalie Usage</th>
              <th className="line-stats-table-header">Price Per Save</th>
              <th className="line-stats-table-header">Price Per Win</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="line-stats-table-data">{playerDetails?.Goalie_Skill}</td>
              <td className="line-stats-table-data">{playerDetails?.goalie_save_rating}</td>
              <td className="line-stats-table-data">{playerDetails?.goalie_gaa_rtg}</td>
              <td className="line-stats-table-data">{playerDetails?.goalie_usage_rating}</td>
              <td className="line-stats-table-data">&#36;{(roundNum((playerDetails.cap_hit / playerDetails.saves), 2)).toLocaleString('en-US')}</td>
              <td className="line-stats-table-data">&#36;{(roundNum((playerDetails.cap_hit / playerDetails.wins), 2)).toLocaleString('en-US')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

GoalieDetailsCard.propTypes = {
  playerDetails: PropTypes.shape({
    team: PropTypes.string,
    games: PropTypes.number,
    wins: PropTypes.number,
    losses: PropTypes.number,
    save_percentage: PropTypes.number,
    saves: PropTypes.number,
    gaa: PropTypes.number,
    goals_against: PropTypes.number,
    shots_against: PropTypes.number,
    cap_hit: PropTypes.number,
    cap_pct: PropTypes.number,
    Goalie_Skill: PropTypes.string,
    goalie_save_rating: PropTypes.number,
    goalie_gaa_rtg: PropTypes.number,
    goalie_usage_rating: PropTypes.number,
    shutouts: PropTypes.number,
  }).isRequired,
  roundNum: PropTypes.func.isRequired,
};
