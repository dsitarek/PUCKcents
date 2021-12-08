import React from 'react';
import PropTypes from 'prop-types';

export default function RecentgameInfo({ game, position }) {
  const gameDate = new Date(game.date).toLocaleString('en-US', { dateStyle: 'short' });

  return (
    <div className="recent-game-card">
      <span className="recent-game-date">{gameDate}</span>
      <span className="recent-game-opponent"><b>{game.isWin ? 'WIN' : 'LOSS'}</b> vs {game.opponent.name}</span>
      <div className="recent-game-stats">
        <ul>
          <li>{position === 'G' ? <><b>Saves:</b> {game.stat.saves}</> : ''}</li>
          <li>{position === 'G' ? <><b>Save Pct:</b> {game.stat.savePercentage === 1 ? '1.0' : game.stat.savePercentage}{game.stat.shutouts ? '(Shutout)' : ''}</> : ''}</li>
          <li>{position === 'G' ? <><b>Goals Against:</b> {game.stat.goalsAgainst}</> : ''}</li>
          <li>{position !== 'G' ? <><b>Goals:</b> {game.stat.goals}</> : ''}</li>
          <li>{position !== 'G' ? <><b>Assists:</b> {game.stat.assists}</> : ''}</li>
          <li>{position !== 'G' ? <><b>Plus/Minus:</b> {game.stat.plusMinus}</> : ''}</li>
        </ul>
      </div>
    </div>
  );
}

RecentgameInfo.defaultProps = {
  position: '',
};

RecentgameInfo.propTypes = {
  game: PropTypes.shape().isRequired,
  position: PropTypes.string,
};
