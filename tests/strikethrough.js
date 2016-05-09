import test from 'ava';
import mdIt from './utils/md-it';

test('strikethrough should work with nothing', t => {
  t.is(mdIt('', {}), '');
});

test('strikethrough should work with basic text', t => {
  t.is(mdIt('~test~', {}), '<p><span class="redacted">test</span></p>\n');
});
