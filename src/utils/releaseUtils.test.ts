import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatBytes,
  validateSha256,
  generateShasumCommand,
  generateGatekeeperCommand,
  parseSemanticVersion,
  filterDocumentation,
  filterShortcuts,
} from './releaseUtils';
import { DocArticle, KeyboardShortcut } from '../types';

test('formatBytes handles zero and various sizes accurately', () => {
  assert.equal(formatBytes(0), '0 Bytes');
  assert.equal(formatBytes(1024), '1 KB');
  assert.equal(formatBytes(1048576), '1 MB');
  assert.equal(formatBytes(14889728), '14.2 MB');
  assert.equal(formatBytes(1073741824), '1 GB');
});

test('validateSha256 validates 64-char hex strings correctly', () => {
  const validHash = 'c3f76921b0dc38b1d431c9408e08f2a4de4bb91e4aa6b86da59d99787ffea1e2';
  assert.equal(validateSha256(validHash), true);

  // Invalid: too short
  assert.equal(validateSha256('c3f76921b0dc38b1'), false);
  // Invalid: contains non-hex character
  assert.equal(
    validateSha256('c3f76921b0dc38b1d431c9408e08f2a4de4bb91e4aa6b86da59d99787ffea1eZ'),
    false
  );
  // Invalid: empty or non-string
  assert.equal(validateSha256(''), false);
});

test('generateShasumCommand produces clean terminal command', () => {
  assert.equal(
    generateShasumCommand('NPad++-v1.0.0-rc.1-arm64.dmg'),
    'shasum -a 256 "NPad++-v1.0.0-rc.1-arm64.dmg"'
  );
});

test('generateGatekeeperCommand generates valid quarantine removal command', () => {
  assert.equal(
    generateGatekeeperCommand(),
    'sudo xattr -r -d com.apple.quarantine "/Applications/NPad++.app"'
  );
  assert.equal(
    generateGatekeeperCommand('/Custom/NPad++.app'),
    'sudo xattr -r -d com.apple.quarantine "/Custom/NPad++.app"'
  );
});

test('parseSemanticVersion parses standard and prerelease tags', () => {
  const normal = parseSemanticVersion('1.2.3');
  assert.equal(normal.major, 1);
  assert.equal(normal.minor, 2);
  assert.equal(normal.patch, 3);
  assert.equal(normal.prerelease, undefined);

  const pre = parseSemanticVersion('v1.0.0-rc.1');
  assert.equal(pre.major, 1);
  assert.equal(pre.minor, 0);
  assert.equal(pre.patch, 0);
  assert.equal(pre.prerelease, 'rc.1');
});

test('filterDocumentation filters by search query and category', () => {
  const sampleDocs: DocArticle[] = [
    {
      id: 'install',
      title: 'Installing NPad++ on macOS',
      category: 'getting-started',
      summary: 'How to install the DMG and bypass Gatekeeper.',
      content: 'Drag NPad++.app into Applications folder.',
      tags: ['install', 'dmg', 'gatekeeper'],
    },
    {
      id: 'regex',
      title: 'Regex Find and Replace Guide',
      category: 'search-replace',
      summary: 'Master regular expressions with PCRE syntax.',
      content: 'Use backreferences and grouping patterns.',
      tags: ['regex', 'search', 'replace'],
    },
  ];

  // Search by keyword
  const searchResults = filterDocumentation(sampleDocs, 'gatekeeper');
  assert.equal(searchResults.length, 1);
  assert.equal(searchResults[0].id, 'install');

  // Search by category
  const categoryResults = filterDocumentation(sampleDocs, '', 'search-replace');
  assert.equal(categoryResults.length, 1);
  assert.equal(categoryResults[0].id, 'regex');

  // No match
  assert.equal(filterDocumentation(sampleDocs, 'nonexistent').length, 0);
});

test('filterShortcuts filters shortcuts by action and category', () => {
  const sampleShortcuts: KeyboardShortcut[] = [
    {
      id: 'sc-1',
      action: 'Duplicate Line',
      shortcut: 'Cmd+D',
      macKeys: ['⌘', 'D'],
      category: 'Editing',
      notepadComparison: 'Ctrl+D in Notepad++',
    },
    {
      id: 'sc-2',
      action: 'Find in Document',
      shortcut: 'Cmd+F',
      macKeys: ['⌘', 'F'],
      category: 'Search',
    },
  ];

  const editMatches = filterShortcuts(sampleShortcuts, 'duplicate');
  assert.equal(editMatches.length, 1);
  assert.equal(editMatches[0].action, 'Duplicate Line');

  const categoryMatches = filterShortcuts(sampleShortcuts, '', 'Search');
  assert.equal(categoryMatches.length, 1);
  assert.equal(categoryMatches[0].id, 'sc-2');
});
