import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function SearchList({ player, addPlayer }) {
  const [formInput, setFormInput] = useState({
    year: '2020-2021',
  });
  const handleChange = (e) => {
    setFormInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  const playerImgURL = `https://images.weserv.nl/?url=nhl.bamcontent.com/images/headshots/current/168x168/${player.id}.jpg`;

  return (
    <div className="search-card">
      <div className="search-img-container"><img className="search-img" src={playerImgURL} alt={player.name} /></div>
      <span className="search-card-span">{player.name}</span>
      <span className="search-card-span">{player.team}</span>
      <span className="search-card-span">{player.position}</span>
      <select id="year" name="year" className="form-select year-dropdown" aria-label="Default select example" value={formInput.year} onChange={handleChange}>
        <option value="2020-2021">20-21</option>
        <option value="2019-2020">19-20</option>
        <option value="2018-2019">18-19</option>
        <option value="2017-2018">17-18</option>
        <option value="2016-2017">16-17</option>
        <option value="2015-2016">15-16</option>
        <option value="2014-2015">14-15</option>
        <option value="2013-2014">13-14</option>
        <option value="2012-2013">12-13</option>
        <option value="2011-2012">11-12</option>
      </select>
      <button className="btn btn-primary" type="button" onClick={addPlayer}>Add</button>
    </div>
  );
}

SearchList.propTypes = {
  player: PropTypes.shape().isRequired,
  addPlayer: PropTypes.func.isRequired,
};
