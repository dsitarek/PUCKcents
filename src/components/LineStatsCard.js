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
    const playerSkillToNum = [];
    players.forEach((player) => {
      if (player === 'Below Average') playerSkillToNum.push(1);
      if (player === 'Average') playerSkillToNum.push(2);
      if (player === 'Above-Average') playerSkillToNum.push(3);
      if (player === 'Great') playerSkillToNum.push(4);
      if (player === 'Elite') playerSkillToNum.push(5);
    });

    let skillTotal = 0;

    playerSkillToNum.forEach((rtg) => { skillTotal += rtg; });
    const skill = skillTotal / players.length;

    if (skill < 1.5) return 'Below-Average';
    if (skill < 2.5) return 'Average';
    if (skill < 3.5) return 'Above-Average';
    if (skill < 4.5) return 'Great';
    return 'Elite';
  };

  useEffect(() => {
    if (lineInfo.LW && lineInfo.RW && lineInfo.C && lineInfo.D1 && lineInfo.D2 && lineInfo.G) {
      setLineStats({
        totalGoals: (lineInfo?.LW.goals + lineInfo?.C.goals + lineInfo?.RW.goals + lineInfo?.D1.goals + lineInfo?.D2.goals) || 'loading',
        totalAssists: (lineInfo?.LW.assists + lineInfo?.C.assists + lineInfo?.RW.assists + lineInfo?.D1.assists + lineInfo?.D2.assists),
        totalPoints: (lineInfo?.LW.points + lineInfo?.C.points + lineInfo?.RW.points + lineInfo?.D1.points + lineInfo?.D2.points),
        averagePPG: roundNum((lineInfo?.LW.points_per_game + lineInfo?.C.points_per_game + lineInfo?.RW.points_per_game + lineInfo?.D1.points_per_game + lineInfo?.D2.points_per_game) / 5, 3),
        totalPlusMinus: (lineInfo?.LW.plusMinus + lineInfo?.C.plusMinus + lineInfo?.RW.plusMinus + lineInfo?.D1.plusMinus + lineInfo?.D2.plusMinus),
        avgPlusMinus: roundNum((lineInfo?.LW.plusMinus + lineInfo?.C.plusMinus + lineInfo?.RW.plusMinus + lineInfo?.D1.plusMinus + lineInfo?.D2.plusMinus) / 5, 1),
        totalPimPerGame: roundNum(lineInfo?.LW.pim_per_game + lineInfo?.C.pim_per_game + lineInfo?.RW.pim_per_game + lineInfo?.D1.pim_per_game + lineInfo?.D2.pim_per_game, 2),
        forwardAveragePPG: roundNum((lineInfo?.LW.points_per_game + lineInfo?.C.points_per_game + lineInfo?.RW.points_per_game) / 3, 3),
        defenseAveragePPG: roundNum((lineInfo?.D1.points_per_game + lineInfo?.D2.points_per_game) / 2, 3),
        totalAveragePPG: roundNum((lineInfo?.LW.points_per_game + lineInfo?.C.points_per_game + lineInfo?.RW.points_per_game + lineInfo?.D1.points_per_game + lineInfo?.D2.points_per_game) / 5, 3),
        pointsPerDollar: numToDollars((lineInfo?.LW.cap_hit + lineInfo?.C.cap_hit + lineInfo?.RW.cap_hit + lineInfo?.D1.cap_hit + lineInfo?.D2.cap_hit) / (lineInfo?.LW.points + lineInfo?.C.points + lineInfo?.RW.points + lineInfo?.D1.points + lineInfo?.D2.points)),
        pointsCapHit: roundNum(((lineInfo?.LW.cap_pct + lineInfo?.C.cap_pct + lineInfo?.RW.cap_pct + lineInfo?.D1.cap_pct + lineInfo?.D2.cap_pct) / (lineInfo?.LW.points + lineInfo?.C.points + lineInfo?.RW.points + lineInfo?.D1.points + lineInfo?.D2.points)) * 100, 3),
        totalCapHit: numToDollars((lineInfo?.LW.cap_hit + lineInfo?.C.cap_hit + lineInfo?.RW.cap_hit + lineInfo?.D1.cap_hit + lineInfo?.D2.cap_hit), 3),
        totalCapHitPercent: roundNum((lineInfo?.LW.cap_pct + lineInfo?.C.cap_pct + lineInfo?.RW.cap_pct + lineInfo?.D1.cap_pct + lineInfo?.D2.cap_pct) * 100, 3),
        fPassRtg: roundNum((lineInfo?.LW.fwd_pass_rtg + lineInfo?.C.fwd_pass_rtg + lineInfo?.RW.fwd_pass_rtg) / 3, 1),
        dPassRtg: (lineInfo?.D1.def_pass_rtg + lineInfo?.D2.def_pass_rtg) / 2,
        fScore: roundNum((lineInfo?.LW.fwd_scoring_rtg + lineInfo?.C.fwd_scoring_rtg + lineInfo?.RW.fwd_scoring_rtg) / 3, 1),
        dScore: roundNum((lineInfo?.D1.def_scoring_rtg + lineInfo?.D2.def_scoring_rtg) / 2, 1),
        dBlock: roundNum((lineInfo?.D1.def_block_rtg + lineInfo?.D2.def_block_rtg) / 2, 1),
        gaaRtg: lineInfo?.G.goalie_gaa_rtg,
        gSave: lineInfo?.G.goalie_save_rating,
        penaltyLiability: roundNum((lineInfo?.LW.penalty_liability_rtg + lineInfo?.C.penalty_liability_rtg + lineInfo?.RW.penalty_liability_rtg + lineInfo?.D1.penalty_liability_rtg + lineInfo?.D2.penalty_liability_rtg) / 5, 1),
        fSkill: calcSkill([lineInfo?.LW.Forward_Skill, lineInfo?.C.Forward_Skill, lineInfo?.RW.Forward_Skill]),
        dSkill: calcSkill([lineInfo?.D1.Defense_Skill, lineInfo?.D2.Defense_Skill]),
        gSkill: lineInfo?.G.Goalie_Skill,
        totalSkill: calcSkill([lineInfo?.LW.Forward_Skill, lineInfo?.C.Forward_Skill, lineInfo?.RW.Forward_Skill, lineInfo?.D1.Defense_Skill, lineInfo?.D2.Defense_Skill, lineInfo?.G.Goalie_Skill]),
      });
    }
  }, [lineInfo]);

  return (
    <>
      <div>
        <table className="line-stats-table">
          <thead>
            <tr>
              <th className="line-stats-table-header">Total Goals</th>
              <th className="line-stats-table-header">Total Assists</th>
              <th className="line-stats-table-header">Total Plus/Minus</th>
              <th className="line-stats-table-header">Avg Plus/Minus</th>
              <th className="line-stats-table-header">Total PIM Per Game</th>
              <th className="line-stats-table-header">Total Avg PPG</th>
              <th className="line-stats-table-header">Forward Avg PPG</th>
              <th className="line-stats-table-header">Defense Avg PPG</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="line-stats-table-data">{lineStats.totalGoals}</td>
              <td className="line-stats-table-data">{lineStats.totalAssists}</td>
              <td className="line-stats-table-data">{lineStats.totalPoints}</td>
              <td className="line-stats-table-data">{lineStats.totalPlusMinus}</td>
              <td className="line-stats-table-data">{lineStats.avgPlusMinus}</td>
              <td className="line-stats-table-data">{lineStats.totalAveragePPG}</td>
              <td className="line-stats-table-data">{lineStats.forwardAveragePPG}</td>
              <td className="line-stats-table-data">{lineStats.defenseAveragePPG}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <table className="line-stats-table">
          <thead>
            <tr>
              <th className="line-stats-table-header">Total Cap Hit</th>
              <th className="line-stats-table-header">Total Cap Hit %</th>
              <th className="line-stats-table-header">Cost Per Point</th>
              <th className="line-stats-table-header">Cap Hit Per Point</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="line-stats-table-data">{lineStats.totalCapHit}</td>
              <td className="line-stats-table-data">{lineStats.totalCapHitPercent}%</td>
              <td className="line-stats-table-data">{lineStats.pointsPerDollar}</td>
              <td className="line-stats-table-data">{lineStats.pointsCapHit}%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <table className="line-stats-table">
          <thead>
            <tr>
              <th className="line-stats-table-header">Forward Line Scoring Rtg</th>
              <th className="line-stats-table-header">Forward Line Pass Rtg</th>
              <th className="line-stats-table-header">Defense Line Scoring Rtg</th>
              <th className="line-stats-table-header">Defense Line Pass Rtg</th>
              <th className="line-stats-table-header">Defense Line Block Rtg</th>
              <th className="line-stats-table-header">Goalie GAA Rtg</th>
              <th className="line-stats-table-header">Goalie Save Rtg</th>
              <th className="line-stats-table-header">Penalty Liability Rtg</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="line-stats-table-data">{lineStats.fScore}</td>
              <td className="line-stats-table-data">{lineStats.fPassRtg}</td>
              <td className="line-stats-table-data">{lineStats.dScore}</td>
              <td className="line-stats-table-data">{lineStats.dPassRtg}</td>
              <td className="line-stats-table-data">{lineStats.dBlock}</td>
              <td className="line-stats-table-data">{lineStats.gaaRtg}</td>
              <td className="line-stats-table-data">{lineStats.gSave}</td>
              <td className="line-stats-table-data">{lineStats.penaltyLiability}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <table className="line-stats-table">
          <thead>
            <tr>
              <th className="line-stats-table-header">Line Forward Skill</th>
              <th className="line-stats-table-header">Line Defense Skill</th>
              <th className="line-stats-table-header">Goalie Skill</th>
              <th className="line-stats-table-header">Total Line Skill</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="line-stats-table-data">{lineStats.fSkill}</td>
              <td className="line-stats-table-data">{lineStats.dSkill}</td>
              <td className="line-stats-table-data">{lineStats.gSkill}</td>
              <td className="line-stats-table-data">{lineStats.totalSkill}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>

  );
}

LineStatsCard.propTypes = {
  lineInfo: PropTypes.shape({
    LW: PropTypes.shape({
      goals: PropTypes.number,
      assists: PropTypes.number,
      points: PropTypes.number,
      points_per_game: PropTypes.number,
      plusMinus: PropTypes.number,
      pim_per_game: PropTypes.number,
      cap_hit: PropTypes.number,
      cap_pct: PropTypes.number,
      fwd_pass_rtg: PropTypes.number,
      fwd_scoring_rtg: PropTypes.number,
      penalty_liability_rtg: PropTypes.number,
      Forward_Skill: PropTypes.string,
    }),
    RW: PropTypes.shape({
      goals: PropTypes.number,
      assists: PropTypes.number,
      points: PropTypes.number,
      points_per_game: PropTypes.number,
      plusMinus: PropTypes.number,
      pim_per_game: PropTypes.number,
      cap_hit: PropTypes.number,
      cap_pct: PropTypes.number,
      fwd_pass_rtg: PropTypes.number,
      fwd_scoring_rtg: PropTypes.number,
      penalty_liability_rtg: PropTypes.number,
      Forward_Skill: PropTypes.string,
    }),
    C: PropTypes.shape({
      goals: PropTypes.number,
      assists: PropTypes.number,
      points: PropTypes.number,
      points_per_game: PropTypes.number,
      plusMinus: PropTypes.number,
      pim_per_game: PropTypes.number,
      cap_hit: PropTypes.number,
      cap_pct: PropTypes.number,
      fwd_pass_rtg: PropTypes.number,
      fwd_scoring_rtg: PropTypes.number,
      penalty_liability_rtg: PropTypes.number,
      Forward_Skill: PropTypes.string,
    }),
    D1: PropTypes.shape({
      goals: PropTypes.number,
      assists: PropTypes.number,
      points: PropTypes.number,
      points_per_game: PropTypes.number,
      plusMinus: PropTypes.number,
      pim_per_game: PropTypes.number,
      cap_hit: PropTypes.number,
      cap_pct: PropTypes.number,
      def_pass_rtg: PropTypes.number,
      def_scoring_rtg: PropTypes.number,
      def_block_rtg: PropTypes.number,
      penalty_liability_rtg: PropTypes.number,
      Defense_Skill: PropTypes.string,
    }),
    D2: PropTypes.shape({
      goals: PropTypes.number,
      assists: PropTypes.number,
      points: PropTypes.number,
      points_per_game: PropTypes.number,
      plusMinus: PropTypes.number,
      pim_per_game: PropTypes.number,
      cap_hit: PropTypes.number,
      cap_pct: PropTypes.number,
      def_pass_rtg: PropTypes.number,
      def_scoring_rtg: PropTypes.number,
      def_block_rtg: PropTypes.number,
      penalty_liability_rtg: PropTypes.number,
      Defense_Skill: PropTypes.string,
    }),
    G: PropTypes.shape({
      goalie_gaa_rtg: PropTypes.number,
      goalie_save_rating: PropTypes.number,
      Goalie_Skill: PropTypes.string,
    }),
  }).isRequired,
};
