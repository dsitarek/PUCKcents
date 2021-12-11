import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function lineCard({ line }) {
  const getplayerImg = (id) => `https://images.weserv.nl/?url=nhl.bamcontent.com/images/headshots/current/168x168/${id}.jpg`;
  const history = useHistory();
  const pushToLine = () => history.push(`/LineManagement/${line.line_id}`);

  return (
    <div className="line-card" onClick={pushToLine} onKeyUp={(event) => { if (event.key === 'Enter') pushToLine(); }} role="button" tabIndex="0">
      <span className="line-title">{line.name}</span>
      <div className="line-img-container"><img className="line-img" src={getplayerImg(line.LW)} alt={line.LW} /></div>
      <div className="line-img-container"><img className="line-img" src={getplayerImg(line.C)} alt={line.C} /></div>
      <div className="line-img-container"><img className="line-img" src={getplayerImg(line.RW)} alt={line.RW} /></div>
      <div className="line-img-container"><img className="line-img" src={getplayerImg(line.D1)} alt={line.D1} /></div>
      <div className="line-img-container"><img className="line-img" src={getplayerImg(line.D2)} alt={line.D2} /></div>
      <div className="line-img-container"><img className="line-img" src={getplayerImg(line.G)} alt={line.G} /></div>
    </div>
  );
}

lineCard.propTypes = {
  line: PropTypes.shape().isRequired,
};
