import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function LineStatsCard({ lineInfo }) {
  const [lineStats, setLineStats] = useState({
    totalGoals: 'Loading',
    totalAssists: 'Loading',
    totalPoints: 'Loading',
    averagePPG: 'Loading',
    forwardAveragePPG: 'Loading',
    defenseAveragePPG: 'Loading',
    pointsPerDollar: 'Loading',
    pointsCapHit: 'Loading',
    totalCapHit: 'Loading',
    totalCapHitPercent: 'Loading',
  });

  const roundNum = (num, decimalPlaces) => {
    let exp = 1;
    if (decimalPlaces >= 1) {
      exp = 10 ** decimalPlaces;
    }
    return Math.round(num * exp) / exp;
  };

  const numToDollars = (num) => new Intl.NumberFormat('us-EN', { style: 'currency', currency: 'USD' }).format(roundNum(num, 2));

  const calcSkill = (players) => {
    console.log(players);
    const playerSkillToNum = [];
    players.forEach((player) => {
      if (player === 'Below Average') playerSkillToNum.push(1);
      if (player === 'Average') playerSkillToNum.push(2);
      if (player === 'Above-Average') playerSkillToNum.push(3);
      if (player === 'Great') playerSkillToNum.push(4);
      if (player === 'Elite') playerSkillToNum.push(5);
    });
    console.log(playerSkillToNum);

    let skillTotal = 0;
    console.log(skillTotal);
    playerSkillToNum.forEach((rtg) => { skillTotal += rtg; });
    const skill = skillTotal / players.length;
    console.log(skill);
    if (skill < 1.5) return 'Below-Average';
    if (skill < 2.5) return 'Average';
    if (skill < 3.5) return 'Above-Average';
    if (skill < 4.5) return 'Great';
    return 'Elite';
  };

  useEffect(() => {
    if (lineInfo.LW && lineInfo.RW && lineInfo.C && lineInfo.D1 && lineInfo.D2) {
      setLineStats({
        totalGoals: (lineInfo?.LW.goals + lineInfo?.C.goals + lineInfo?.RW.goals + lineInfo?.D1.goals + lineInfo?.D2.goals) || 'loading',
        totalAssists: (lineInfo?.LW.assists + lineInfo?.C.assists + lineInfo?.RW.assists + lineInfo?.D1.assists + lineInfo?.D2.assists),
        totalPoints: (lineInfo?.LW.points + lineInfo?.C.points + lineInfo?.RW.points + lineInfo?.D1.points + lineInfo?.D2.points),
        averagePPG: roundNum((lineInfo?.LW.points_per_game + lineInfo?.C.points_per_game + lineInfo?.RW.points_per_game + lineInfo?.D1.points_per_game + lineInfo?.D2.points_per_game) / 5, 3),
        forwardAveragePPG: roundNum((lineInfo?.LW.points_per_game + lineInfo?.C.points_per_game + lineInfo?.RW.points_per_game) / 3, 3),
        defenseAveragePPG: roundNum((lineInfo?.D1.points_per_game + lineInfo?.D2.points_per_game) / 2, 3),
        pointsPerDollar: numToDollars((lineInfo?.LW.cap_hit + lineInfo?.C.cap_hit + lineInfo?.RW.cap_hit + lineInfo?.D1.cap_hit + lineInfo?.D2.cap_hit) / (lineInfo?.LW.points + lineInfo?.C.points + lineInfo?.RW.points + lineInfo?.D1.points + lineInfo?.D2.points)),
        pointsCapHit: roundNum(((lineInfo?.LW.cap_pct + lineInfo?.C.cap_pct + lineInfo?.RW.cap_pct + lineInfo?.D1.cap_pct + lineInfo?.D2.cap_pct) / (lineInfo?.LW.points + lineInfo?.C.points + lineInfo?.RW.points + lineInfo?.D1.points + lineInfo?.D2.points)) * 100, 3),
        totalCapHit: numToDollars((lineInfo?.LW.cap_hit + lineInfo?.C.cap_hit + lineInfo?.RW.cap_hit + lineInfo?.D1.cap_hit + lineInfo?.D2.cap_hit), 3),
        totalCapHitPercent: roundNum((lineInfo?.LW.cap_pct + lineInfo?.C.cap_pct + lineInfo?.RW.cap_pct + lineInfo?.D1.cap_pct + lineInfo?.D2.cap_pct) * 100, 3),
        fPassRtg: (lineInfo?.LW.fwd_pass_rtg + lineInfo?.C.fwd_pass_rtg + lineInfo?.RW.fwd_pass_rtg) / 3,
        dPassRtg: (lineInfo?.D1.def_pass_rtg + lineInfo?.D2.def_pass_rtg) / 2,
        fScore: (lineInfo?.LW.fwd_scoring_rtg + lineInfo?.C.fwd_scoring_rtg + lineInfo?.RW.fwd_scoring_rtg) / 3,
        dScore: (lineInfo?.D1.def_scoring_rtg + lineInfo?.D2.def_scoring_rtg) / 2,
        dBlock: (lineInfo?.D1.def_block_rtg + lineInfo?.D2.def_block_rtg) / 2,
        gaaRtg: lineInfo?.G.goalie_gaa_rtg,
        gSave: lineInfo?.G.goalie_save_rating,
        fSkill: calcSkill([lineInfo?.LW.Forward_Skill, lineInfo?.C.Forward_Skill, lineInfo?.RW.Forward_Skill]),
        dSkill: calcSkill([lineInfo?.D1.Defense_Skill, lineInfo?.D2.Defense_Skill]),
        gSkill: lineInfo?.G.Goalie_Skill,
        totalSkill: calcSkill([lineInfo?.LW.Forward_Skill, lineInfo?.C.Forward_Skill, lineInfo?.RW.Forward_Skill, lineInfo?.D1.Defense_Skill, lineInfo?.D2.Defense_Skill, lineInfo?.G.Goalie_Skill]),
      });
    }
  }, [lineInfo]);

  return (
    <div>
      Total Goals: {lineStats.totalGoals}<br />
      Total Assists: {lineStats.totalAssists}<br />
      Total Points: {lineStats.totalPoints}<br />
      Total Avg PPG: {lineStats.averagePPG}<br />
      Forward Avg PPG: {lineStats.forwardAveragePPG}<br />
      Defense Avg PPG: {lineStats.defenseAveragePPG}<br />
      Total Cap Hit: {lineStats.totalCapHit}<br />
      Total Cap Hit: {lineStats.totalCapHitPercent}%<br />
      Cost Per Point: {lineStats.pointsPerDollar}<br />
      Cap Hit Per Point: {lineStats.pointsCapHit}%<br />
      Forward Line Pass Rtg: {lineStats.fPassRtg}<br />
      Defense Line Pass Rtg: {lineStats.dPassRtg}<br />
      Forward Line Scoring Rtg: {lineStats.fScore}<br />
      Defense Line Scoring Rtg: {lineStats.dScore}<br />
      Defense Line Block Rtg: {lineStats.dBlock}<br />
      Goalie GAA Rtg: {lineStats.gaaRtg}<br />
      Goalie Save Rtg: {lineStats.gSave}<br />
      Forward Line Skill: {lineStats.fSkill}<br />
      Defense Skill: {lineStats.dSkill}<br />
      Goalie Skill: {lineStats.gSkill}<br />
      Total Line Skill: {lineStats.totalSkill}<br />
    </div>

  );
}

LineStatsCard.propTypes = {
  lineInfo: PropTypes.shape().isRequired,
};
