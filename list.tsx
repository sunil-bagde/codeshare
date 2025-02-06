import React, { ReactNode } from "react";

type UlProps = {
  children: ReactNode;
  className?: string;
  listStyle?: string;
};

type LiProps = {
  children: ReactNode;
  className?: string;
};

type LiButtonProps = {
  children: ReactNode;
  onClick: () => void;
  className?: string;
};

type LiLinkProps = {
  children: ReactNode;
  href: string;
  className?: string;
};

const Ul: React.FC<UlProps> & {
  Li: React.FC<LiProps> & {
    Text: React.FC<LiProps>;
    Button: React.FC<LiButtonProps>;
    Link: React.FC<LiLinkProps>;
  };
} = ({ children, className, listStyle = "list-disc" }) => (
  <ul className={`${listStyle} pl-5 ${className || ""}`}>{children}</ul>
);

const Li: React.FC<LiProps> & {
  Text: React.FC<LiProps>;
  Button: React.FC<LiButtonProps>;
  Link: React.FC<LiLinkProps>;
} = ({ children, className }) => <li className={className}>{children}</li>;

Li.Text = ({ children, className }) => <li className={className}>{children}</li>;

Li.Button = ({ children, onClick, className }) => (
  <li className={className}>
    <button onClick={onClick} className="px-3 py-1 bg-blue-500 text-white rounded">
      {children}
    </button>
  </li>
);

Li.Link = ({ children, href, className }) => (
  <li className={className}>
    <a href={href} className="text-blue-600 hover:underline">
      {children}
    </a>
  </li>
);

Ul.Li = Li;

export default Ul;


// uses

import React from "react";
import Ul from "./MyListComponents";

const ExampleList = () => (
  <Ul className="space-y-2" listStyle="list-decimal">
    <Ul.Li.Text>Decimal List Item 1: Simple Text</Ul.Li.Text>
    <Ul.Li.Link href="https://example.com">Decimal List Item 2: Link</Ul.Li.Link>
    <Ul.Li.Button onClick={() => alert("Button Clicked!")}>
      Decimal List Item 3: Button
    </Ul.Li.Button>
  </Ul>
);
