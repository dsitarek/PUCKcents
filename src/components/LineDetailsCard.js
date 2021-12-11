import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPlayerDetails } from '../data/databaseCalls';

export default function LineDetailsCard({ line }) {
  const [lineInfo, setLineInfo] = useState({
    LW: null,
    C: null,
    RW: null,
    D1: null,
    D2: null,
    G: null,
  });

  useEffect(() => {
    if (line.RW?.id) getPlayerDetails(line.RW.id, line.RW.season).then((playerObj) => setLineInfo((prevState) => ({ ...prevState, RW: playerObj })));
  }, [line.RW]);

  useEffect(() => {
    if (line.C?.id) getPlayerDetails(line.C.id, line.C.season).then((playerObj) => setLineInfo((prevState) => ({ ...prevState, C: playerObj })));
  }, [line.C]);

  useEffect(() => {
    if (line.LW?.id) getPlayerDetails(line.LW.id, line.LW.season).then((playerObj) => setLineInfo((prevState) => ({ ...prevState, LW: playerObj })));
  }, [line.LW]);

  useEffect(() => {
    if (line.D1?.id) getPlayerDetails(line.D1.id, line.D1.season).then((playerObj) => setLineInfo((prevState) => ({ ...prevState, D1: playerObj })));
  }, [line.D1]);

  useEffect(() => {
    if (line.D2?.id) getPlayerDetails(line.D2.id, line.D2.season).then((playerObj) => setLineInfo((prevState) => ({ ...prevState, D2: playerObj })));
  }, [line.D2]);

  useEffect(() => {
    if (line.G?.id) getPlayerDetails(line.G.id, line.G.season).then((playerObj) => setLineInfo((prevState) => ({ ...prevState, G: playerObj })));
  }, [line.G]);

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
  line: PropTypes.shape().isRequired,
};
