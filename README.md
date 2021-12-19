# PUCK¢ents [![Netlify Status](https://api.netlify.com/api/v1/badges/6439dfd7-a06d-4404-82e0-022148c9c8a9/deploy-status)](https://app.netlify.com/sites/djs-puckcents/deploys)

### [Deployed Site](https://djs-puckcents.netlify.app/)

## Info
There are tons of places to get player stats and salary data for almost every professional sport; however, I wasn’t able to find any apps that allowed you to combine a group of players and view their stats as a set.I wanted to build an app that allowed a user to create a hockey line combination of players and view that lines total stats and average stats. I also wanted to use data I had gotten to show rankings and grades of those players, based on certain metrics, individually and as a set.


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


![capstoneSS](https://user-images.githubusercontent.com/82732748/146659443-94db42c9-2fcd-49a5-bed9-9d2440ac799b.png)

## ERD
![ERD](https://user-images.githubusercontent.com/82732748/146465599-da53799b-e087-4aa1-8098-2d6ffe5b0125.png)

## Technical Flowchart
![NETworthFlowchart](https://user-images.githubusercontent.com/82732748/146624245-7703778f-5fa4-4830-9c7d-de9f3115accb.png)


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
