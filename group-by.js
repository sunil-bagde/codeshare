import React from 'react';

const GroupedData = () => {
  const groupedByAge = {
    25: [
      { name: 'John', age: 25 },
      { name: 'Alice', age: 25 }
    ],
    30: [
      { name: 'Jane', age: 30 },
      { name: 'Bob', age: 30 }
    ],
    35: [
      { name: 'Charlie', age: 35 }
    ]
  };

  return (
    <div>
      <h1>Grouped by Age</h1>
      {Object.keys(groupedByAge).map((ageGroup) => (
        <div key={ageGroup}>
          <h2>Age Group: {ageGroup}</h2>
          <ul>
            {groupedByAge[ageGroup].map((person) => (
              <li key={person.name}>
                {person.name} (Age: {person.age})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default GroupedData;
