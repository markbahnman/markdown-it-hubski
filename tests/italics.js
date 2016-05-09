import test from 'ava';
import mdIt from './utils/md-it';

test('italics should work with basic text', t => {
  t.is(mdIt('*test*', {}), '<p><i>test</i></p>\n');
});
