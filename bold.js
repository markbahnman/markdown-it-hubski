function tokenize(state, silent) {
  let i, scanned, token, len, ch,
    start = state.pos,
    marker = state.src.charCodeAt(start);
  console.log('tokenize', marker);

  if (silent) { return false; }

  if (marker !== 0x2B/* + */) { return false; }

  scanned = state.scanDelims(state.pos, true);
  len = scanned.length;
  ch = String.fromCharCode(marker);

  if (len !== 1) { return false; }

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

  state.pos += scanned.length;

  return true;
}

function postProcess(state) {
  let i, j,
    startDelim,
    endDelim,
    token,
    loneMarkers = [],
    delimiters = state.delimiters,
    max = state.delimiters.length;

  for (i = 0; i < max; i++) {
    startDelim = delimiters[i];

    if (startDelim.marker !== 0x2B/* + */) {
      continue;
    }

    if (startDelim.end === -1) {
      continue;
    }

    endDelim = delimiters[startDelim.end];

    token         = state.tokens[startDelim.token];
    token.type    = 'b_open';
    token.tag     = 'b';
    token.nesting = 1;
    token.markup  = '+';
    token.content = '';

    token         = state.tokens[endDelim.token];
    token.type    = 'b_close';
    token.tag     = 'b';
    token.nesting = -1;
    token.markup  = '+';
    token.content = '';
  }
}

export default function(md, options) {
  options = {
    hubbold: true,
    ...options
  };

  md.inline.ruler.before('emphasis', 'hubski_bold', tokenize);
  md.inline.ruler2.before('emphasis', 'hubski_bold', postProcess);
}
