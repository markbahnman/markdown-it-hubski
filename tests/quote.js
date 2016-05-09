import test from 'ava';
import mdIt from './utils/md-it';

test('quotes should work with basic text', t => {
  t.is(mdIt('|test|', {}), '<p><ul class="quotetext">test</ul></p>\n');
});

test('quotes should work with multiline text', t => {
  t.is(mdIt('|test\ntesting as well|', {}),
       '<p><ul class="quotetext">test\ntesting as well</ul></p>\n');
});
