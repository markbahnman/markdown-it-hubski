function tokenize(state, silent) {
  let i, scanned, token, len, ch,
    start = state.pos,
    marker = state.src.charCodeAt(start);

  if (silent) { return false; }

  if (marker !== 0x23/* # */) { return false; }

  scanned = state.scanDelims(state.pos, true);
  len = scanned.length;
  ch = String.fromCharCode(marker);

  if (len !== 1) { return false; }

  if (scanned.can_open) token = state.push('span', 'span', 1);

  for (i = 0; i < len; i++) {
    token         = state.push('text', '', 0);
    token.content = ch;

    state.delimiters.push({
      marker: marker,
      jump:   i,
      token:  state.tokens.length - 1,
      level:  state.level,
      end:    -1,
      open:   scanned.can_open,
      close:  scanned.can_close
    });

  }

  if (scanned.can_close) token = state.push('span', 'span', -1);

  state.pos += scanned.length;

  return true;
}

function postProcess(state) {
  let i,
    startDelim,
    endDelim,
    token,
    delimiters = state.delimiters,
    max = state.delimiters.length;

  for (i = 0; i < max; i++) {
    startDelim = delimiters[i];

    if (startDelim.marker !== 0x23/* # */) {
      continue;
    }

    if (startDelim.end === -1) {
      continue;
    }

    let tagtoken = state.tokens[startDelim.token + 1];
    const tagname = tagtoken.content;
    const taglink = `/tags/${tagname}`;

    // insert preceeding # into text
    tagtoken.content = `#${tagname}`;

    endDelim = delimiters[startDelim.end];

    token         = state.tokens[startDelim.token];
    token.type    = 'tag_open';
    token.tag     = 'a';
    token.nesting = 1;
    token.markup  = '#';
    token.content = '';
    token.attrs = [ ['target', '_blank'], ['href', taglink]  ];

    token         = state.tokens[endDelim.token];
    token.type    = 'tag_close';
    token.tag     = 'a';
    token.nesting = -1;
    token.markup  = '#';
    token.content = '';
  }
}

export default function(md, options) {
  options = {
    hubtags: true,
    ...options
  };

  md.inline.ruler.before('emphasis', 'hubski_tags', tokenize);
  md.inline.ruler2.before('emphasis', 'hubski_tags', postProcess);
}
