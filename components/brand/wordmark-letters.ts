/* Hickok Design wordmark: which contours make which letter.
 *
 * Each word in wordmark-paths.ts is one compound path, a contour per closed shape. A
 * letter can be more than one: the o, D and g each have a counter, the i has its dot, the
 * k has a stem and two arms. To reveal the words a letter at a time they have to be
 * regrouped into letters, and that grouping is the data below: for each word, the
 * contours (counted from 0, in the order they appear in the path) that belong to each
 * letter, left to right.
 *
 * Found once, by measuring each contour's width on the page and joining the ones that
 * overlap in x; the nearest neighbours the letters have are 1.3 units apart, so nothing
 * joins that should not. It is a list of numbers and not a copy of the paths, so the
 * approved artwork stays in one place and is never edited. If the artwork is
 * regenerated, the contour count changes, `wordmarkLetters` notices, and the wordmark
 * simply renders whole and unrevealed until this list is redone. */

import { WORDMARK } from './wordmark-paths'

const LETTERS = {
  hickok: [[0], [1, 2], [3], [4, 5, 6], [7, 8], [9, 10, 11]],
  design: [[0, 1], [2], [3], [4, 5], [6, 7], [8]],
} as const

export type WordmarkLetter = {
  word: 'hickok' | 'design'
  /** One path, so a counter (the hole in an o) stays a hole. */
  d: string
}

let cache: WordmarkLetter[] | null | undefined

/** The wordmark as letters, left to right, or null if the artwork no longer matches the
 *  grouping. */
export function wordmarkLetters(): WordmarkLetter[] | null {
  if (cache !== undefined) return cache

  const letters: WordmarkLetter[] = []
  for (const word of ['hickok', 'design'] as const) {
    const contours = WORDMARK[word].d.match(/M[^M]*/g) ?? []
    const groups = LETTERS[word]
    const used = groups.reduce((n, g) => n + g.length, 0)
    if (contours.length !== used) return (cache = null)
    for (const g of groups) letters.push({ word, d: g.map((i) => contours[i]).join(' ') })
  }
  return (cache = letters)
}
