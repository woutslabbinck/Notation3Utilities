import { describe, test, expect } from 'vitest';

import { Parser, Store } from 'n3';

import { EyelingReasoner } from '../dist/esm/index.browser.js';

describe('browser dist', () => {

  test('runs in actual browser', async () => {

    expect(typeof window).toBe('object');

    const data = `
      @prefix ex: <http://example.org/> .

      ex:john ex:parent ex:mary .
    `;

    const rules = `
      {
        ?x ex:parent ?y .
      }
      =>
      {
        ?y ex:child ?x .
      } .
    `;

    const store = new Store(
      new Parser().parse(data)
    );

    const reasoner = new EyelingReasoner();
    
    const result = await reasoner.reason(store, rules);
    expect(
      result.getQuads(null, null, null, null).length
    ).toBeGreaterThan(0);
  });

});