import React from 'react';
import PropTypes from 'prop-types';

export default function DefenseDetailsCard({ playerDetails, roundNum }) {
  return (
    <div className="past-details-card">
      <li><b>Games:</b> {playerDetails.games}</li>
      <li><b>Games Started:</b> {playerDetails.games_started}</li>
      <li><b>Goals:</b> {playerDetails.goals}</li>
      <li><b>Goals Per Game:</b> {roundNum(playerDetails.goals_per_game, 3)}</li>
      <li><b>Blocked Shots Per Game</b> {roundNum(playerDetails.blocked_shots_per_game, 3)}</li>
      <li><b>Blocked Shots:</b> {playerDetails.blocked}</li>
      <li><b>Plus/Minus:</b> {playerDetails.plusMinus}</li>
      <li><b>Assists:</b> {playerDetails.assists}</li>
      <li><b>PIM:</b> {playerDetails.penaltymin}</li>
      <li><b>PIM Per Game:</b> {roundNum(playerDetails.pim_per_game, 3)}</li>
      <li><b>Points:</b> {playerDetails.points}</li>
      <li><b>Points Per Game:</b> {roundNum(playerDetails.points_per_game, 3)}</li>
      <li><b>Salary Cap Hit:</b> &#36;{(playerDetails.cap_hit).toLocaleString()}</li>
      <li><b>Cap Hit Percentage:</b> {roundNum((playerDetails.cap_pct * 100), 1)}%</li>
      {playerDetails.Defense_Skill ? <li><b>Defense Skill Rating:</b> {playerDetails.Defense_Skill}</li> : ''}
      {playerDetails.def_pass_rtg ? <li><b>Defensive Pass Rating:</b> {playerDetails.def_pass_rtg}/10</li> : ''}
      {playerDetails.def_scoring_rtg ? <li><b>Defensive Scoring Rating:</b> {playerDetails.def_scoring_rtg}/10</li> : ''}
      {playerDetails.def_shift_usage_rtg ? <li><b>Defensive Shift Usage Rating:</b> {playerDetails.def_shift_usage_rtg}/10</li> : ''}
      {playerDetails.penalty_liability_rtg ? <li><b>Penalty Liability Rating:</b> {playerDetails.penalty_liability_rtg}/10</li> : ''}
      {playerDetails.def_block_rtg ? <li><b>Defensive Block Rating:</b> {playerDetails.def_block_rtg}/10</li> : ''}
    </div>
  );
}

DefenseDetailsCard.propTypes = {
  playerDetails: PropTypes.shape().isRequired,
  roundNum: PropTypes.func.isRequired,
};
