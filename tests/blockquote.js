import test from 'ava';
import mdIt from './utils/md-it';

test('blockquote should work with basic text', t => {
  t.is(mdIt('  Test', {}), '<pre><code>Test</code></pre>\n');
});
