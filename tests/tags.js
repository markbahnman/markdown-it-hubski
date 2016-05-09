import test from 'ava';
import mdIt from './utils/md-it';

test('tags should work with nothing', t => {
  t.is(mdIt('', {}), '');
});

test('tags should work with basic text', t => {
  t.is(mdIt('#test#', {}), '<p><span><a target="_blank" href="/tags/test">#test</a></span></p>\n');
});
