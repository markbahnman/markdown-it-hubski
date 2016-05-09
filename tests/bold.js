import test from 'ava';
import mdIt from './utils/md-it';

test('bold should work with basic text', t => {
  t.is(mdIt('+test+', {}), '<p><b>test</b></p>\n');
});
