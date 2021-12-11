import { supabase } from '../api/auth';

const getSalaryData = async (id, year) => {
  const { data, error } = await supabase
    .from('stats_with_salaries')
    .select('cap_hit, cap_pct, Forward_Skill, Defense_Skill, Goalie_Skill, Skill')
    .eq('id', id)
    .eq('yearid', year);

  if (error) console.warn(error);
  return data;
};

const getPlayerDetails = async (id, year) => {
  const { data, error } = await supabase
    .from('stats_with_grades')
    .select('*')
    .eq('id', id)
    .eq('yearid', year);

  const salaryData = await getSalaryData(id, year);
  if (data.length > 1) data[0].team = `${data[0].team} / ${data[1].team}`;
  console.log(data, id, year);

  if (error) console.warn(error);
  return { ...data[0], ...salaryData[0] };
};

const getLines = async (userId) => {
  const linesCall = await supabase
    .from('line_combinations')
    .select('*')
    .eq('user_id', userId);

  return linesCall.data;
};

const getSingleLine = async (lineId) => {
  const linesCall = await supabase
    .from('line_combinations')
    .select('*')
    .eq('line_id', lineId);

  return linesCall.data[0];
};

const getPlayerSeasons = async (playerId) => {
  const { data } = await supabase
    .from('stats_with_grades')
    .select('yearid')
    .eq('id', playerId);
  return data;
};

export {
  getPlayerDetails, getLines, getSingleLine, getPlayerSeasons,
};
