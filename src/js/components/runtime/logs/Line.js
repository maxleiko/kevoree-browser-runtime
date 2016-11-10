import React from 'react';
import linkifyStr from 'linkifyjs/string';

import ListItem from 'grommet/components/ListItem';

const EOL = new RegExp(/\n/, 'g');

const getTime = time => {
  const t = new Date(time);
  const hours = (t.getHours().toString().length === 1) ?
    `0${t.getHours()}` : t.getHours();
  const mins = (t.getMinutes().toString().length === 1) ?
    `0${t.getMinutes()}` : t.getMinutes();
  const secs = (t.getSeconds().toString().length === 1) ?
    `0${t.getSeconds()}` : t.getSeconds();
  const ms = (t.getMilliseconds().toString().length === 1) ?
    `00${t.getMilliseconds()}` : (t.getMilliseconds().toString().length === 2) ?
      `0${t.getMilliseconds()}` : t.getMilliseconds();
  return `${hours}:${mins}:${secs}:${ms}`;
};

const htmlify = (content) => {
  return linkifyStr(content).replace(EOL, '<br/>&nbsp;&nbsp;');
};

const Line = (msg) => (
  <ListItem pad={null} align="start" className={['kevoree-log-line', msg.level.toLowerCase()]}>
    <div className="time">{getTime(msg.time)}</div>
    <div className="tag">{msg.tag}</div>
    <div className="content" dangerouslySetInnerHTML={{
      __html: htmlify(msg.content)
    }} />
  </ListItem>
);

export default Line;
