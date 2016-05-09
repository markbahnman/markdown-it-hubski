import mentions from './mentions';
import tags from './tags';
import italics from './italics';
import strikethrough from './strikethrough';
import bold from './bold';
import quote from './quote';
import text from './text';

export default function(md, options) {
  // We replace default text rules to add | as a terminating character
  md.inline.ruler.at('text', text);

  quote(md, options);
  mentions(md, options);
  tags(md, options);
  italics(md, options);
  strikethrough(md, options);
  bold(md, options);
}
