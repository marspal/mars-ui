import React from  'react';
import { storiesOf } from '@storybook/react';
import AutoComplete, { DataSourceType } from './autoComplete';
import { action } from '@storybook/addon-actions';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);
interface LakerPlayerProps {
  value: string,
  number: number
}

interface GitHubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}
const SimpleComplete = () => {
  const lakers = ['bradley', 'pope', 'cook', 'cousins', 'james',
  'AD', 'green', 'howard', 'kuzma'];
  const lakerWithNumber = [{
    value: "bradley",
    number: 11,
  },{
    value: "James",
    number: 23,
  }]
  // const handleFetch = (query: string) => {
  //   return lakers.filter(name => name.includes(query)).map(name => ({value: name}));
  // }
  // const handleFetch = (query: string) => {
  //   return lakerWithNumber.filter(player => player.value.includes(query))
  // }
  // const renderOptions = (item: DataSourceType<LakerPlayerProps>) => {
  //   return (
  //   <>
  //     <h2>Name: {item.value}</h2>
  //     <p>Number：{item.number}</p>
  //   </>
  //   )
  // }

  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
            .then(res => res.json())
            .then(({items}) => {
              const formatItems = items.slice(0, 10).map((item: any) => ({
                value: item.login,
                ...item
              }));
              return formatItems;
            });
  }
  const renderOptions = (item: DataSourceType<GitHubUserProps>) => {
    return (
    <>
      <h2>Name: {item.login}</h2>
      <p>Number：{item.url}</p>
    </>
    )
  }
  return <AutoComplete 
    fetchSuggestions={handleFetch}
    onSelect={action("selected")}
    // renderOptions={renderOptions}
  />
}

storiesOf("AutoComplete", module)
  .add('最简单的搜索款',SimpleComplete);