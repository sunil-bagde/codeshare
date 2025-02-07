import React, { ReactNode } from 'react';

type ListType = 'disc' | 'decimal' | 'square' | 'none';

interface UnorderListProps {
  children: ReactNode;
  listType?: ListType;
}

const UnorderList: React.FC<UnorderListProps> = ({ children, listType = 'disc' }) => {
  const listClass = `list-${listType}`;
  return <ul className={`pl-5 ${listClass}`}>{children}</ul>;
};

interface ListItemProps {
  children: ReactNode;
}

const ListItem: React.FC<ListItemProps> = ({ children }) => {
  return <li className="mb-2">{children}</li>;
};

const App: React.FC = () => {
  return (
    <div>
      <h2>Disc List</h2>
      <UnorderList listType="disc">
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
      </UnorderList>

      <h2>Decimal List</h2>
      <UnorderList listType="decimal">
        <ListItem>First</ListItem>
        <ListItem>Second</ListItem>
        <ListItem>Third</ListItem>
      </UnorderList>

      <h2>Square List</h2>
      <UnorderList listType="square">
        <ListItem>A</ListItem>
        <ListItem>B</ListItem>
        <ListItem>C</ListItem>
      </UnorderList>
    </div>
  );
};

export default App;
