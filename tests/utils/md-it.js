import markdownIt from 'markdown-it';
import markdownItHubski from '../../index';

export default (md, options = {}, mdOptions = {}, renderEnv = {}) => {
  const mdIt = markdownIt({
    html: true,
    linkify: true,
    typography: true,
    ...mdOptions,
  })
    .disable(['heading', 'emphasis', 'strikethrough'])
    .use(markdownItHubski, options);

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
