import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleLine } from '../data/databaseCalls';
import { getUser } from '../api/auth';
import LineDetailsCard from '../components/LineDetailsCard';
import { getSearchedPlayers } from '../data/nhlCalls';
import { LineSearchList } from '../components';

export default function LineManagement() {
  const [line, setLine] = useState({});
  const [btnText, setBtnText] = useState('Save');
  const { lineId } = useParams();
  const user = getUser();

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
      });
    } else { getSingleLine(lineId).then(setLine); }
  }, []);

  const [formInput, setFormInput] = useState({ search: '' });
  const [searchedPlayers, setSearchedPlayers] = useState([]);

  const handleChange = (e) => {
    setFormInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const returnSearch = async (e) => {
    e.preventDefault();
    getSearchedPlayers(formInput.search).then((playerArr) => setSearchedPlayers(() => {
      if (playerArr.length > 4) { return [playerArr[0], playerArr[1], playerArr[2], playerArr[3], playerArr[4]]; } return playerArr;
    }));
  };

  const addPlayer = (postion, playerId, year) => {
    setLine((prevState) => ({ ...prevState, [postion]: { id: playerId, season: year } }));
  };

  const saveLine = async () => {
    if (line.LW?.id && line.RW?.id && line.C?.id && line.D1?.id && line.D2?.id && line.G?.id) {
      setBtnText('good');
    } else setBtnText('bad');
  };
  if (line.user_id === user.id) {
    return (
      <div className="line-management-container">
        <div className="line-edit-container">
          <LineDetailsCard line={line} />
          <div className="line-search line">
            <form onSubmit={returnSearch} className="seach-form line">
              <div className="search-bar-container"><input type="text" name="search" className="search-bar line" value={formInput.search} onChange={handleChange} tabIndex="0" />
                <button className="btn btn-primary" type="submit">Search</button>
              </div>
            </form>
            {searchedPlayers ? searchedPlayers.map((player) => <LineSearchList key={player.id} player={player} addPlayer={addPlayer} />) : ''}
          </div>
        </div>
        {lineId === 'create' ? <button className="btn btn-primary" type="button" onClick={saveLine}>{btnText}</button> : ''}
      </div>
    );
  } return (<>This line belongs to another user</>);
}
