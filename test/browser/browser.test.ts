import { describe, test, expect } from 'vitest';
import { Parser, Store } from 'n3';
import { EyelingReasoner } from '../../dist/esm/index.browser.js';

describe('browser dist', () => {

  test('runs in actual browser', async () => {

    expect(typeof window).toBe('object');

    const data = `
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.
@prefix : <http://example.org/socrates#>.

:Socrates a :Human.
:Human rdfs:subClassOf :Mortal.
    `;

    const rules = `
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.
@prefix : <http://example.org/socrates#>.
{
    ?S a ?A .
    ?A rdfs:subClassOf ?B . 
} 
=> 
{
    ?S a ?B .
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
    expect(result.getQuads(
      'http://example.org/socrates#Socrates', 
      'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', 
      'http://example.org/socrates#Mortal', null).length).toBe(1);
  });

});