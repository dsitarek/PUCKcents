import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPlayerSeasons } from '../data/databaseCalls';

export default function SearchList({ player, addPlayer }) {
  const [formInput, setFormInput] = useState({
    year: '',
    position: '',
  });

  const [playerSeasons, setPlayerSeasons] = useState(null);

  const removeDuplicatesFromArrayByProperty = (arr, prop) => arr.reduce((accumulator, currentValue) => {
    if (!accumulator.find((obj) => obj[prop] === currentValue[prop])) {
      accumulator.push(currentValue);
    }
    return accumulator;
  }, []);

  useEffect(async () => {
    if (player.position === 'Forward') formInput.position = 'LW';
    else if (player.position === 'Defenseman') formInput.position = 'D1';
    else if (player.position === 'Goalie') formInput.position = 'G';
    await getPlayerSeasons(player.id).then((years) => {
      const uniqueYearList = removeDuplicatesFromArrayByProperty(years, 'yearid');
      setPlayerSeasons(uniqueYearList);
      const defaultYear = years.length > 0 ? years[0]?.yearid : null;
      setFormInput((prevState) => ({ ...prevState, year: defaultYear }));
    });
  }, [player]);

  const handleChange = (e) => {
    setFormInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  const playerImgURL = `https://images.weserv.nl/?url=nhl.bamcontent.com/images/headshots/current/168x168/${player.id}.jpg`;

  return (
    <>{ formInput.year ? (
      <div className="search-card">
        <div className="search-img-container"><img className="search-img" src={playerImgURL} alt={player.name} /></div>
        <span className="search-card-span">{player.name}</span>
        <span className="search-card-span">{player.team}</span>
        <span className="search-card-span">{player.position}</span>
        <select id="year" name="year" className="form-select year-dropdown" aria-label="Default select example" value={formInput.year} onChange={handleChange}>
          {playerSeasons ? playerSeasons.map((year) => <option key={`${player.name}-${year.yearid}`} value={year.yearid}>{year.yearid}</option>) : ''}
        </select>
        <select id="position" name="position" className="form-select pos-dropdown" aria-label="Default select example" value={formInput.position} onChange={handleChange}>
          {player.position === 'Defenseman'
            ? (
              <>
                <option value="D1">LD</option>
                <option value="D2">RD</option>
              </>
            ) : ''}
          {player.position === 'Forward'
            ? (
              <>
                <option value="LW">LW</option>
                <option value="C">C</option>
                <option value="RW">RW</option>

              </>
            ) : ''}
          {player.position === 'Goalie'
            ? (
              <>
                <option value="G">G</option>
              </>
            ) : ''}

        </select>
        <button className="btn btn-primary" type="button" onClick={() => addPlayer(formInput.position, Number(player.id), formInput.year)}>Add</button>
      </div>
    ) : ''}
    </>
  );
}

SearchList.propTypes = {
  player: PropTypes.shape().isRequired,
  addPlayer: PropTypes.func.isRequired,
};
