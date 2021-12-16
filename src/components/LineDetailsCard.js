import React from 'react';
import PropTypes from 'prop-types';

export default function LineDetailsCard({ lineInfo }) {
  const getplayerImg = (id) => `https://images.weserv.nl/?url=nhl.bamcontent.com/images/headshots/current/168x168/${id}.jpg`;

  return (
    <div className="line-details-card">
      <div className="line-details-forwards">
        <div className="line-position-card">
          {lineInfo.LW?.id ? <div className="line-details-img-container"><img className="line-details-img" src={getplayerImg(lineInfo.LW?.id)} alt={lineInfo.LW.name} /></div> : ''}
          <span>{lineInfo.LW?.name || 'LW'}</span>
        </div>
        <div className="line-position-card">
          {lineInfo.C?.id ? <div className="line-details-img-container"><img className="line-details-img" src={getplayerImg(lineInfo.C?.id)} alt={lineInfo.C.name} /></div> : ''}
          <span>{lineInfo.C?.name || 'C'}</span>
        </div>
        <div className="line-position-card">
          {lineInfo.RW?.id ? <div className="line-details-img-container"><img className="line-details-img" src={getplayerImg(lineInfo.RW?.id)} alt={lineInfo.RW.name} /></div> : ''}
          <span> {lineInfo.RW?.name || 'RW'}</span>
        </div>
      </div>
      <div className="line-details-defenseman">
        <div className="line-position-card">
          {lineInfo.D1?.id ? <div className="line-details-img-container"><img className="line-details-img" src={getplayerImg(lineInfo.D1?.id)} alt={lineInfo.D1.name} /></div> : ''}
          <span>{lineInfo.D1?.name || 'D'}</span>
        </div>
        <div className="line-position-card">
          {lineInfo.D2?.id ? <div className="line-details-img-container"><img className="line-details-img" src={getplayerImg(lineInfo.D2?.id)} alt={lineInfo.D2.name} /></div> : ''}
          <span>{lineInfo.D2?.name || 'D'}</span>
        </div>
      </div>
      <div className="line-details-goalie">
        <div className="line-position-card">
          {lineInfo.G?.id ? <div className="line-details-img-container"><img className="line-details-img" src={getplayerImg(lineInfo.G?.id)} alt={lineInfo.G.name} /></div> : ''}
          <span>{lineInfo.G?.name || 'G'}</span>
        </div>
      </div>
    </div>
  );
}

LineDetailsCard.propTypes = {
  lineInfo: PropTypes.shape().isRequired,
};
