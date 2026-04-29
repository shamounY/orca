import { describe, expect, it } from 'vitest'
import { appendUniqueOpenFileIds, buildUnsavedDiffModelKey } from './unsaved-close-queue'

describe('buildUnsavedDiffModelKey', () => {
  it('includes file id and request id so each open gets a fresh model identity', () => {
    expect(buildUnsavedDiffModelKey('/repo/file.ts', 1)).toBe('unsaved-close:/repo/file.ts:1')
    expect(buildUnsavedDiffModelKey('/repo/file.ts', 2)).toBe('unsaved-close:/repo/file.ts:2')
  })
})

describe('appendUniqueOpenFileIds', () => {
  it('appends only open file ids and skips duplicates', () => {
    const result = appendUniqueOpenFileIds(
      ['a'],
      ['a', 'b', 'missing', 'c', 'b'],
      new Set(['a', 'b', 'c'])
    )
    expect(result).toEqual(['a', 'b', 'c'])
  })

  it('returns the original queue when no requested ids are provided', () => {
    const queue = ['a']
    expect(appendUniqueOpenFileIds(queue, [], new Set(['a']))).toEqual(['a'])
  })
})
