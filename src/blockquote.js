function tokenize(state, startLine, endLine) {
  var nextLine, last, token;

  if (state.sCount[startLine] - state.blkIndent < 2) {
    return false;
  }

  last = (nextLine = startLine + 1);

  while (nextLine < endLine) {
    if (state.isEmpty(nextLine)) {
      nextLine++;
      continue;
    }

    if (state.sCount[nextLine] - state.blkIndent >= 2) {
      nextLine++;
      last = nextLine;
      continue;
    }
    break;
  }

  state.line = last;

  token = state.push('code_block', 'code', 0);
  token.content = state.getLines(startLine, last, 2 + state.blkIndent, true);
  token.map = [startLine, state.line];

  return true;
}

export default function(md, options) {
  md.block.ruler.before('fence', 'hubkski-block', tokenize);
}
