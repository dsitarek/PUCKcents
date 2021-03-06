import React from 'react';
import PropTypes from 'prop-types';
import noImg from '../assets/noImg.png';

export default function LineDetailsCard({ lineInfo }) {
  const getplayerImg = (id) => `https://images.weserv.nl/?url=nhl.bamcontent.com/images/headshots/current/168x168/${id}.jpg`;

  return (
    <div className="line-details-card">
      <div className="line-details-forwards">
        <div className="line-position-card">
          {lineInfo.LW?.id ? <div className="line-details-img-container"><img className="line-details-img" src={getplayerImg(lineInfo.LW?.id)} alt={lineInfo.LW.name} onError={(e) => { e.target.onerror = null; e.target.src = noImg; }} /></div> : ''}
          <span className="line-name-span">{lineInfo.LW?.name || 'LW'}</span>
        </div>
        <div className="line-position-card">
          {lineInfo.C?.id ? <div className="line-details-img-container"><img className="line-details-img" src={getplayerImg(lineInfo.C?.id)} alt={lineInfo.C.name} onError={(e) => { e.target.onerror = null; e.target.src = noImg; }} /></div> : ''}
          <span className="line-name-span">{lineInfo.C?.name || 'C'}</span>
        </div>
        <div className="line-position-card">
          {lineInfo.RW?.id ? <div className="line-details-img-container"><img className="line-details-img" src={getplayerImg(lineInfo.RW?.id)} alt={lineInfo.RW.name} onError={(e) => { e.target.onerror = null; e.target.src = noImg; }} /></div> : ''}
          <span className="line-name-span"> {lineInfo.RW?.name || 'RW'}</span>
        </div>
      </div>
      <div className="line-details-defenseman">
        <div className="line-position-card">
          {lineInfo.D1?.id ? <div className="line-details-img-container"><img className="line-details-img" src={getplayerImg(lineInfo.D1?.id)} alt={lineInfo.D1.name} onError={(e) => { e.target.onerror = null; e.target.src = noImg; }} /></div> : ''}
          <span className="line-name-span">{lineInfo.D1?.name || 'D'}</span>
        </div>
        <div className="line-position-card">
          {lineInfo.D2?.id ? <div className="line-details-img-container"><img className="line-details-img" src={getplayerImg(lineInfo.D2?.id)} alt={lineInfo.D2.name} onError={(e) => { e.target.onerror = null; e.target.src = noImg; }} /></div> : ''}
          <span className="line-name-span">{lineInfo.D2?.name || 'D'}</span>
        </div>
      </div>
      <div className="line-details-goalie">
        <div className="line-position-card">
          {lineInfo.G?.id ? <div className="line-details-img-container"><img className="line-details-img" src={getplayerImg(lineInfo.G?.id)} alt={lineInfo.G.name} onError={(e) => { e.target.onerror = null; e.target.src = noImg; }} /></div> : ''}
          <span className="line-name-span">{lineInfo.G?.name || 'G'}</span>
        </div>
      </div>
    </div>
  );
}

LineDetailsCard.propTypes = {
  lineInfo: PropTypes.shape({
    LW: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }),
    C: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }),
    RW: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }),
    D1: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }),
    D2: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }),
    G: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }),
  }).isRequired,
};
