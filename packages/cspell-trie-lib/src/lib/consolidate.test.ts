import { createTriFromList } from '.';
import { consolidate } from './consolidate';
import { genSequence } from 'gensequence';
import { TrieNode } from './TrieNode';

describe('Validate Consolidate', () => {
    test('consolidate', () => {
        const trie = createTriFromList(sampleWords);
        const origCount = countNodes(trie);
        const trie2 = consolidate(trie);
        const countTrie2 = countNodes(trie2);
        const countTrie = countNodes(trie);
        expect(countTrie2).toBeLessThan(origCount);
        expect(countTrie2).toBe(countTrie);
        const words = [...walk(trie2)];
        expect(words).toEqual(sampleWords.sort());
        const trie3 = consolidate(trie);
        const countTrie3 = countNodes(trie3);
        expect(countTrie3).toBe(countTrie2);
    });

    test('consolidate', () => {
        expect(countNodes(consolidate(createTriFromList(sampleWords), 1))).toBe(112);
        expect(countNodes(consolidate(createTriFromList(sampleWords), 2))).toBe(98);
        expect(countNodes(consolidate(createTriFromList(sampleWords), 3))).toBe(96);
        expect(countNodes(consolidate(createTriFromList(sampleWords), 4))).toBe(96);
        expect(countNodes(consolidate(createTriFromList(sampleWords), 5))).toBe(96);
    });
});

function walk(root: TrieNode): IterableIterator<string> {
    function *w(node: TrieNode, prefix: string): IterableIterator<string> {
        if (node.f) {
            yield prefix;
        }
        if (node.c) {
            yield *genSequence(node.c)
            .concatMap(a => genSequence(w(a[1], a[0])).map(suffix => prefix + suffix));
        }
    }
    return w(root, '');
}

function countNodes(root: TrieNode) {
    const seen = new Set<TrieNode>();

    function walk(n: TrieNode) {
        if (seen.has(n)) return;
        seen.add(n);
        if (n.c) {
            [...n.c].forEach(([, n]) => walk(n));
        }
    }

    walk(root);
    return seen.size;
}

const sampleWords = [
    'journal',
    'journalism',
    'journalist',
    'journalistic',
    'journals',
    'journey',
    'journeyer',
    'journeyman',
    'journeymen',
    'joust',
    'jouster',
    'jousting',
    'jovial',
    'joviality',
    'jowl',
    'jowly',
    'joy',
    'joyful',
    'joyfuller',
    'joyfullest',
    'joyfulness',
    'joyless',
    'joylessness',
    'joyous',
    'joyousness',
    'joyridden',
    'joyride',
    'joyrider',
    'joyriding',
    'joyrode',
    'joystick',
    'lift',
    'lifted',
    'lifter',
    'lifting',
    'lifts',
    'talk',
    'talked',
    'talker',
    'talking',
    'talks',
    'walk',
    'walked',
    'walker',
    'walking',
    'walks',
    'Big Apple',
    'New York',
    'apple',
    'big apple',
    'fun journey',
    'long walk',
    'fun walk',
];