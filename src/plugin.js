import mentions from './mentions';
import tags from './tags';
import italics from './italics';
import strikethrough from './strikethrough';
import bold from './bold';
import quote from './quote';
import text from './text';
import md from 'markdown-it';

function plugin(md, options) {
  // We replace default text rules to add | as a terminating character
  md.inline.ruler.at('text', text);

  quote(md, options);
  mentions(md, options);
  tags(md, options);
  italics(md, options);
  strikethrough(md, options);
  bold(md, options);
}

export default (options = {}, pluginOptions = {}) => {
  return md(options)
  .disable(['heading',
           'emphasis',
           'strikethrough',
           'code',
           'fence',
           'blockquote',
           'reference',
           'list',
           'hr',
           'html_block',
           'table',
           'backticks'])
  .use(plugin, pluginOptions);
};
