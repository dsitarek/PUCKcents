import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPlayerSeasons } from '../data/databaseCalls';
import noImg from '../assets/noImg.png';

export default function LineSearchList({ player, addPlayer }) {
  const [formInput, setFormInput] = useState({
    year: '',
    position: '',
  });

  const generateSearchId = (idString) => {
    const rNum = Math.random().toString(36);
    const key = `${idString}-${rNum}`;
    return key;
  };

  const [playerSeasons, setPlayerSeasons] = useState(null);

  const removeDuplicatesFromArrayByProperty = (arr, prop) => arr.reduce((accumulator, currentValue) => {
    if (!accumulator.find((obj) => obj[prop] === currentValue[prop])) {
      accumulator.push(currentValue);
    }
    return accumulator;
  }, []);

  useEffect(async () => {
    let isMounted = true;
    if (player.position === 'Forward') formInput.position = 'LW';
    else if (player.position === 'Defenseman') formInput.position = 'D1';
    else if (player.position === 'Goalie') formInput.position = 'G';
    await getPlayerSeasons(player.id).then((years) => {
      if (isMounted) {
        const uniqueYearList = removeDuplicatesFromArrayByProperty(years, 'yearid');
        setPlayerSeasons(uniqueYearList);
        const defaultYear = years.length > 0 ? years[0]?.yearid : null;
        setFormInput((prevState) => ({ ...prevState, year: defaultYear }));
      }
    }); return () => { isMounted = false; };
  }, []);

  const handleChange = (e) => {
    setFormInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  const playerImgURL = `https://images.weserv.nl/?url=nhl.bamcontent.com/images/headshots/current/168x168/${player.id}.jpg`;

  return (
    <>{ formInput.year ? (
      <div className="line-search-card">
        <div className="line-search-img-container"><img className="line-search-img" src={playerImgURL} alt={player.name} onError={(e) => { e.target.onerror = null; e.target.src = noImg; }} /></div>
        <span className="line-search-card-span">{player.name}</span>
        <span className="line-search-card-span">{player.team}</span>
        <span className="line-search-card-span">{player.position}</span>
        <span className="line-search-card-span">
          <select id="year" name="year" className="year-dropdown line-dropdown" aria-label="Default select example" value={formInput.year} onChange={handleChange}>
            {playerSeasons ? playerSeasons.map((year) => <option key={generateSearchId(year.yearid)} value={year.yearid}>{year.yearid}</option>) : ''}
          </select>
          <select id="position" name="position" className="pos-dropdown line-dropdown" aria-label="Default select example" value={formInput.position} onChange={handleChange}>
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
        </span>
        <button className="btn-shape" type="button" onClick={() => addPlayer(formInput.position, Number(player.id), formInput.year)}>Add</button>
      </div>
    ) : ''}
      <hr className="line-search-card-hr" />
    </>
  );
}

LineSearchList.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    team: PropTypes.string,
    position: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  addPlayer: PropTypes.func.isRequired,
};
