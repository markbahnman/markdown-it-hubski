import test from 'ava';
import mdIt from './utils/md-it';

test('mentions should work with nothing', t => {
  t.is(mdIt('', {}), '');
});

test('mentions should work with basic text', t => {
  t.is(mdIt('@test@', {}), '<p><span><a target="_blank" href="/user/test">test</a></span></p>\n');
});
