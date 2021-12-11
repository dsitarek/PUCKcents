import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleLine } from '../data/databaseCalls';
import { getUser } from '../api/auth';
import LineDetailsCard from '../components/LineDetailsCard';
import { getSearchedPlayers } from '../data/nhlCalls';
import { LineSearchList } from '../components';

export default function LineManagement() {
  const [line, setLine] = useState({});
  const { lineId } = useParams();
  const user = getUser();

  useEffect(() => {
    if (lineId === 'create') {
      setLine({
        name: '',
        user_id: user.id,
        ranking: 0,
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
    getSearchedPlayers(formInput.search).then((playerArr) => setSearchedPlayers([playerArr[0], playerArr[1], playerArr[2]]));
  };

  const addPlayer = (postion, playerId) => {
    setLine((prevState) => ({ ...prevState, [postion]: playerId }));
  };

  if (line.user_id === user.id) {
    return (
      <div className="line-management-container">
        <div className="line-edit-container">
          <div className="line-search">
            <form onSubmit={returnSearch} className="seach-form">
              <div className="search-bar-container"><input type="text" name="search" className="search-bar" value={formInput.search} onChange={handleChange} tabIndex="0" />
                <button className="btn btn-primary" type="submit">Search</button>
              </div>
            </form>
            {searchedPlayers ? searchedPlayers.map((player) => <LineSearchList key={player.id} player={player} addPlayer={addPlayer} />) : ''}
          </div>
          <LineDetailsCard line={line} />
        </div>
      </div>
    );
  } return (<>This line belongs to another user</>);
}
