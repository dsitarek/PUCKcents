import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  getSingleLine, createLine, updateLine, getPlayerDetails,
} from '../data/databaseCalls';
import { getUser } from '../api/auth';
import LineDetailsCard from '../components/LineDetailsCard';
import { getSearchedPlayers } from '../data/nhlCalls';
import { LineSearchList, LineStatsCard } from '../components';

export default function LineManagement() {
  const [line, setLine] = useState({ name: '' });
  const [btnText, setBtnText] = useState('Save');

  const [lineInfo, setLineInfo] = useState({
    LW: null,
    C: null,
    RW: null,
    D1: null,
    D2: null,
    G: null,
  });

  const { lineId } = useParams();
  const user = getUser();
  const history = useHistory();

  useEffect(() => {
    if (lineId === 'create') {
      setLine({
        name: '',
        user_id: user.id,
        LW: null,
        C: null,
        RW: null,
        D1: null,
        D2: null,
        G: null,
        public: false,
      });
    } else { getSingleLine(lineId).then(setLine); }
  }, []);

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

  const [formInput, setFormInput] = useState({ search: '' });
  const [searchedPlayers, setSearchedPlayers] = useState([]);

  const handleChange = (e) => {
    setFormInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleName = (e) => {
    setLine((prevState) => ({ ...prevState, name: e.target.value }));
  };

  const returnSearch = async (e) => {
    e.preventDefault();
    getSearchedPlayers(formInput.search).then((playerArr) => setSearchedPlayers(() => {
      console.log(playerArr);
      if (playerArr.length > 4) { return [playerArr[0], playerArr[1], playerArr[2], playerArr[3], playerArr[4]]; }
      return playerArr;
    }));
  };

  const addPlayer = (postion, playerId, year) => {
    setLine((prevState) => ({ ...prevState, [postion]: { id: playerId, season: year } }));
  };

  const saveLine = async () => {
    if (line.LW?.id && line.RW?.id && line.C?.id && line.D1?.id && line.D2?.id && line.G?.id && line.name) {
      createLine(line).then((data) => history.push(`/LineManagement/${data[0].line_id}`));
    } if (!line.name) setBtnText('Please Enter Name');
    else setBtnText('Please Complete Line');
  };

  const changeLine = async () => {
    updateLine(line, lineId);
  };

  if (line.user_id === user.id) {
    return (
      <div className="line-management-container">
        <div className="line-edit-container">
          <div className="line-details-container">
            <div>Line Name: <input type="text" className="create-line-name" name="name" value={line.name} onChange={handleName} /></div>
            <LineDetailsCard line={line} lineInfo={lineInfo} setLineInfo={setLineInfo} />
          </div>
          <div className="line-search line">
            <form onSubmit={returnSearch} className="seach-form line">
              <div className="search-bar-container"><input type="text" name="search" className="search-bar line" value={formInput.search} onChange={handleChange} tabIndex="0" />
                <button className="btn btn-primary" type="submit">Search</button>
              </div>
            </form>
            {searchedPlayers ? searchedPlayers.map((player) => <LineSearchList key={player.id} player={player} addPlayer={addPlayer} />) : console.log('nothing')}
          </div>
        </div>
        {lineId === 'create' ? <button className="btn btn-primary" type="button" onClick={saveLine}>{btnText}</button>
          : <button className="btn btn-success" type="button" onClick={changeLine}>Update</button>}
        <div className="line-stats-container">{lineId !== 'create' ? <LineStatsCard lineInfo={lineInfo} /> : ''}</div>
      </div>
    );
  } return (<>This line belongs to another user</>);
}
