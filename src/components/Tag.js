import React from 'react';

const tagStyle = {
  javascript: { backgroundColor: '#F0DB4F', color: 'black' },
  nodejs: { backgroundColor: '#68A063', color: 'white' },
  angular: { backgroundColor: '#B52E31', color: 'white' },
  gatsby: { backgroundColor: '#663399', color: 'white' },
  css: {
    backgroundColor: '#2965f1',
    color: 'white',
    textTransform: 'uppercase',
  },
  cli: {
    backgroundColor: 'var(--textNormal)',
    color: 'var(--bg)',
    textTransform: 'uppercase',
  },
  linux: {
    backgroundColor: 'var(--textNormal)',
    color: 'var(--bg)',
    textTransform: 'uppercase',
  },
  git: { backgroundColor: '#F1502F', color: 'white' },
  react: { backgroundColor: '#61DBFB', color: 'black' },
  rabbitmq: { backgroundColor: 'rgb(232, 78, 42)', color: 'white' },
  docker: { backgroundColor: '#384d54', color: 'white' },
  terraform: { backgroundColor: '#7b42bc', color: 'black' },
  default: { backgroundColor: 'var(--textNormal)', color: 'var(--bg)' },
};

export default props => {
  const style = tagStyle[props.tag] || tagStyle['default'];
  const className = props.isSmall
    ? 'post-tag-small post-tag-with-margin-btm'
    : 'post-tag post-tag-with-margin-btm';
  return (
    <div key={props.tag} className={className} style={style}>
      {props.tag}
    </div>
  );
};
