import React, { useState } from 'react';
import { SearchList } from '../components/index';
import { getSearchedPlayers } from '../data/nhlCalls';

export default function PlayerSearch() {
  const [formInput, setFormInput] = useState({ search: '' });
  const [searchedPlayers, setSearchedPlayers] = useState([]);

  const handleChange = (e) => {
    setFormInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const returnSearch = async (e) => {
    e.preventDefault();
    getSearchedPlayers(formInput.search).then(setSearchedPlayers);
  };

  return (
    <div className="search-container">
      <form onSubmit={returnSearch} className="seach-form">
        <div className="search-bar-container"><input type="text" name="search" placeholder="Search Players By Name" className="search-bar" value={formInput.search} onChange={handleChange} tabIndex="0" />
          <button className="btn-shape player-search-btn" type="submit">Search</button>
        </div>
      </form>
      <div className="search-list-container">
        {searchedPlayers.length > 0 ? (
          <div className="search-card">
            <span className="search-card-header" />
            <span className="search-card-header">Name</span>
            <span className="search-card-header">Team</span>
            <span className="search-card-header">POS</span>
          </div>
        ) : ''}
        {searchedPlayers ? searchedPlayers.map((player) => <SearchList key={player.id} player={player} />) : ''}
      </div>
    </div>
  );
}
