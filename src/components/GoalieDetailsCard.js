import React from 'react';
import PropTypes from 'prop-types';

export default function GoalieDetailsCard({ playerDetails, roundNum }) {
  return (
    <div className="past-details-card">
      <li><b>Team:</b> {playerDetails.team}</li>
      <li><b>Games:</b> {playerDetails.games}</li>
      <li><b>Wins:</b> {playerDetails.wins}</li>
      <li><b>Losses:</b> {playerDetails.losses}</li>
      <li><b>Shutouts:</b> {playerDetails.shutouts}</li>
      <li><b>Goals Against:</b> {playerDetails.goals_against}</li>
      <li><b>GAA:</b> {roundNum(playerDetails.gaa, 3)}</li>
      <li><b>Shots Against:</b> {playerDetails.shots_against}</li>
      <li><b>Saves:</b> {playerDetails.saves}</li>
      <li><b>Save Percentage:</b> {roundNum(playerDetails.save_percentage, 3)}</li>
      <li><b>Games Started:</b> {playerDetails.games_started}</li>
      <li><b>Goals:</b> {playerDetails.goals}</li>
      <li><b>Assists:</b> {playerDetails.assists}</li>
      <li><b>Points:</b> {playerDetails.points}</li>
      <li><b>Salary Cap Hit:</b> &#36;{(playerDetails.cap_hit).toLocaleString()}</li>
      <li><b>Cap Hit Percentage:</b> {roundNum((playerDetails.cap_pct * 100), 1)}%</li>
      {playerDetails.Goalie_Skill ? <li><b>Goalie Skill Rating:</b> {playerDetails.Goalie_Skill}</li> : ''}
      {playerDetails.goalie_usage_rating ? <li><b>Goalie Usage Rating:</b> {playerDetails.goalie_usage_rating}/10</li> : ''}
      {playerDetails.goalie_save_rating ? <li><b>Goalie Save Rating:</b> {playerDetails.goalie_save_rating}/10</li> : ''}
      {playerDetails.goalie_gaa_rtg ? <li><b>Goalie GAA Rating:</b> {playerDetails.goalie_gaa_rtg}/10</li> : ''}
    </div>
  );
}

GoalieDetailsCard.propTypes = {
  playerDetails: PropTypes.shape().isRequired,
  roundNum: PropTypes.func.isRequired,
};
