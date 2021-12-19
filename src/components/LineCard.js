import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { deleteLine, getLines } from '../data/databaseCalls';
import { getUser } from '../api/auth';

export default function lineCard({ line, setLines }) {
  const getplayerImg = (id) => `https://images.weserv.nl/?url=nhl.bamcontent.com/images/headshots/current/168x168/${id}.jpg`;
  const history = useHistory();
  const pushToLine = () => history.push(`/LineManagement/${line.line_id}`);

  const removeLine = async () => {
    const userId = getUser();
    await deleteLine(line.line_id);
    getLines(userId.id).then(setLines);
  };

  return (
    <div className="line-card">
      <div className="line-card-items" onClick={pushToLine} onKeyUp={(event) => { if (event.key === 'Enter') pushToLine(); }} role="button" tabIndex="0">
        <span className="line-title">{line.name}</span>
        <div className="line-img-container"><img className="line-img" src={getplayerImg(line.LW.id)} alt={line.LW.id} /></div>
        <div className="line-img-container"><img className="line-img" src={getplayerImg(line.C.id)} alt={line.C.id} /></div>
        <div className="line-img-container"><img className="line-img" src={getplayerImg(line.RW.id)} alt={line.RW.id} /></div>
        <div className="line-img-container"><img className="line-img" src={getplayerImg(line.D1.id)} alt={line.D1.id} /></div>
        <div className="line-img-container"><img className="line-img" src={getplayerImg(line.D2.id)} alt={line.D2.id} /></div>
        <div className="line-img-container"><img className="line-img" src={getplayerImg(line.G.id)} alt={line.G.id} /></div>
        <div className="line-img-container"><button className="btn-shape delete-line-btn" type="button" onClick={removeLine}>Delete</button></div>
      </div>
    </div>
  );
}

lineCard.propTypes = {
  line: PropTypes.shape().isRequired,
  setLines: PropTypes.func.isRequired,
};
