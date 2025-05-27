import {rankRepos, generateReport} from '../index';
import type {RepoInfo} from '../index';
import {expect, test} from 'bun:test';

test('rankRepos sorts by stars descending', () => {
  const repos: RepoInfo[] = [
    {name: 'b', stars: 2},
    {name: 'a', stars: 5},
    {name: 'c', stars: 3}
  ];
  const ranked = rankRepos(repos);
  expect(ranked[0]?.name).toBe('a');
  expect(ranked[1]?.name).toBe('c');
  expect(ranked[2]?.name).toBe('b');
});

test('generateReport outputs ranked list', () => {
  const repos: RepoInfo[] = [
    {name: 'repo1', stars: 10},
    {name: 'repo2', stars: 5}
  ];
  const report = generateReport(repos);
  expect(report.split('\n')[0]).toContain('repo1');
  expect(report.split('\n')[1]).toContain('repo2');
});
