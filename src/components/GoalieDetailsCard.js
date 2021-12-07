import React from 'react';
import PropTypes from 'prop-types';

export default function GoalieDetailsCard({ playerDetails, roundNum }) {
  return (
    <div>
      <li>Games: {playerDetails.games}</li>
      <li>Wins: {playerDetails.wins}</li>
      <li>Losses: {playerDetails.losses}</li>
      <li>Shutouts: {playerDetails.shutouts}</li>
      <li>Goals Against: {playerDetails.goals_against}</li>
      <li>GAA: {roundNum(playerDetails.gaa, 3)}</li>
      <li>Shots Against: {playerDetails.shots_against}</li>
      <li>Saves: {playerDetails.saves}</li>
      <li>Save Percentage: {roundNum(playerDetails.save_percentage, 3)}</li>
      <li>Games Started: {playerDetails.games_started}</li>
      <li>Time on Ice: {roundNum(playerDetails.time_on_ice, 0)}</li>
      <li>Goals: {playerDetails.goals}</li>
      <li>Assists: {playerDetails.assists}</li>
      <li>Points: {playerDetails.points}</li>
      <li>Salary Cap Hit: &#36;{(playerDetails.cap_hit).toLocaleString()}</li>
      <li>Cap Hit Percentage: {roundNum((playerDetails.cap_pct * 100), 1)}%</li>
      {playerDetails.Goalie_Skill ? <li>Goalie Skill Rating: {playerDetails.Goalie_Skill}</li> : ''}
      {playerDetails.goalie_usage_rating ? <li>Goalie Usage Rating: {playerDetails.goalie_usage_rating}</li> : ''}
      {playerDetails.goalie_save_rating ? <li>Goalie Save Rating: {playerDetails.goalie_save_rating}</li> : ''}
      {playerDetails.goalie_gaa_rtg ? <li>Goalie GAA Rating: {playerDetails.goalie_gaa_rtg}</li> : ''}
    </div>
  );
}

GoalieDetailsCard.propTypes = {
  playerDetails: PropTypes.shape().isRequired,
  roundNum: PropTypes.func.isRequired,
};
