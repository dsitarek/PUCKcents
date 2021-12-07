import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import getPlayerDetails from '../data/databaseCalls';
import { ForwardDetailsCard, DefenseDetailsCard, GoalieDetailsCard } from '../components/index';

export default function PlayerDetails() {
  const [formInput, setFormInput] = useState({
    year: '2020-2021',
  });
  const [playerDetails, setplayerDetails] = useState({});
  const playerId = 8475798;

  useEffect(() => {
    getPlayerDetails(playerId, formInput.year).then(setplayerDetails);
  }, [formInput]);

  const handleChange = (e) => {
    setFormInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const roundNum = (num, decimalPlaces) => {
    let exp = 1;
    if (decimalPlaces >= 1) {
      exp = 10 ** decimalPlaces;
    }
    return Math.round(num * exp) / exp;
  };

  return (
    <div className="details-container">
      <select id="year" name="year" className="form-select" aria-label="Default select example" value={formInput.year} onChange={handleChange}>
        <option value="2020-2021">2020-2021</option>
        <option value="2019-2020">2019-2020</option>
        <option value="2018-2019">2018-2019</option>
        <option value="2017-2018">2017-2018</option>
        <option value="2016-2017">2016-2017</option>
        <option value="2015-2016">2015-2016</option>
        <option value="2014-2015">2014-2015</option>
        <option value="2013-2014">2013-2014</option>
        <option value="2012-2013">2012-2013</option>
        <option value="2011-2012">2011-2012</option>

      </select>
      <h3>{playerDetails.name}</h3>
      {playerDetails.position === 'Forward' ? <ForwardDetailsCard playerDetails={playerDetails} roundNum={roundNum} /> : ''}
      {playerDetails.position === 'Defenseman' ? <DefenseDetailsCard playerDetails={playerDetails} roundNum={roundNum} /> : ''}
      {playerDetails.position === 'Goalie' ? <GoalieDetailsCard playerDetails={playerDetails} roundNum={roundNum} /> : ''}
      {!playerDetails.id ? `No player data for ${formInput.year}` : ''}
    </div>
  );
}
