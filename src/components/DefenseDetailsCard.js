import React from 'react';
import PropTypes from 'prop-types';

export default function DefenseDetailsCard({ playerDetails, roundNum }) {
  return (
    <div>
      <li>Games: {playerDetails.games}</li>
      <li>Games Started: {playerDetails.games_started}</li>
      <li>Time on Ice: {roundNum(playerDetails.time_on_ice, 0)}</li>
      <li>Goals: {playerDetails.goals}</li>
      <li>Goals Per Game: {roundNum(playerDetails.goals_per_game, 3)}</li>
      <li>Blocked Shots Per Game: {roundNum(playerDetails.blocked_shots_per_game, 3)}</li>
      <li>Blocked Shots: {playerDetails.blocked}</li>
      <li>Plus/Minus: {playerDetails.plusMinus}</li>
      <li>Assists: {playerDetails.assists}</li>
      <li>PIM: {playerDetails.penaltymin}</li>
      <li>PIM Per Game: {roundNum(playerDetails.pim_per_game, 3)}</li>
      <li>Points: {playerDetails.points}</li>
      <li>Points Per Game: {roundNum(playerDetails.points_per_game, 3)}</li>
      <li>Salary Cap Hit: &#36;{(playerDetails.cap_hit).toLocaleString()}</li>
      <li>Cap Hit Percentage: {roundNum((playerDetails.cap_pct * 100), 1)}%</li>
      {playerDetails.Defense_Skill ? <li>Defense Skill Rating: {playerDetails.Defense_Skill}</li> : ''}
      {playerDetails.def_pass_rtg ? <li>Defensive Pass Rating: {playerDetails.fwd_pass_rtg}</li> : ''}
      {playerDetails.def_scoring_rtg ? <li>Defensive Scoring Rating: {playerDetails.fwd_scoring_rtg}</li> : ''}
      {playerDetails.def_shift_usage_rtg ? <li>Defensive Shift Usage Rating: {playerDetails.fwd_shift_usage_rtg}</li> : ''}
      {playerDetails.penalty_liability_rtg ? <li>Penalty Liability Rating: {playerDetails.penalty_liability_rtg}</li> : ''}
      {playerDetails.def_block_rtg ? <li>Defensive Block Rating: {playerDetails.def_block_rtg}</li> : ''}
    </div>
  );
}

DefenseDetailsCard.propTypes = {
  playerDetails: PropTypes.shape().isRequired,
  roundNum: PropTypes.func.isRequired,
};
