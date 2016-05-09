import markdownIt from 'markdown-it';
import markdownItHubski from '../../src';

export default (md, options = {}, mdOptions = {}, renderEnv = {}) => {
  const mdIt = markdownItHubski(mdOptions);

  const mdRender = [];
  if (typeof md === 'string') {
    return mdIt.render(md, renderEnv);
  }
  else if (md.constructor === Array) {
    for (const s of md) {
      mdRender.push(mdIt.render(s, renderEnv));
    }
    return mdRender;
  }
};
