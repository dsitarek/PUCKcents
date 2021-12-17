import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import noImg from '../assets/noImg.png';

export default function SearchList({ player }) {
  const playerImgURL = `https://images.weserv.nl/?url=nhl.bamcontent.com/images/headshots/current/168x168/${player.id}.jpg`;

  const history = useHistory();
  const pushToPlayer = () => history.push(`/playerDetails/${player.id}`);

  return (
    <div className="search-card" onClick={pushToPlayer} onKeyUp={(event) => { if (event.key === 'Enter') pushToPlayer(); }} role="button" tabIndex="0">
      <div className="search-img-container"><img className="search-img" src={playerImgURL} alt={noImg} /></div>
      <span className="search-card-span">{player.name}</span>
      <span className="search-card-span">{player.team}</span>
      <span className="search-card-span">{player.position}</span>

    </div>
  );
}

SearchList.propTypes = {
  player: PropTypes.shape().isRequired,
};
