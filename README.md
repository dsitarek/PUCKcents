# NETworth

## Features
- As a user, you can be able to login with google.
- As a user, you can be view your line combinations including specifics for:
  - Line stats
  - Combined data from players on the line to determine line effectiveness such as goals, assists, points per dollar etc.
- As a user, you can add players to your line combinations.
- As a user, you can delete your line combinations.
- As a user, you can update the players on your line combinations.
- As a user, you can view a players details including:
  - Current stats
  - Player Info such as height, weight, etc.
  - Past stats, salary info, and grading by season

## ERD
![ERD](https://user-images.githubusercontent.com/82732748/146465599-da53799b-e087-4aa1-8098-2d6ffe5b0125.png)

### [Project Board](https://github.com/dsitarek/hockey-battles/projects/1)

## Code Snippet
```
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

  if (error) console.warn(error);
  return { ...data[0], ...salaryData[0] };
};
```

## Contributors
- [Daniel Sitarek](https://github.com/dsitarek) (App)
- [Jonathan Lloyd](https://github.com/Jonathan-Lloyd) (Data)

