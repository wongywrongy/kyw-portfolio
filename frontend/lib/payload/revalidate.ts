import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

export const revalidateAfterChange =
  (paths: string[]): CollectionAfterChangeHook =>
  ({ doc }) => {
    for (const p of paths) {
      revalidatePath(p)
    }
    return doc
  }

export const revalidateAfterDelete =
  (paths: string[]): CollectionAfterDeleteHook =>
  ({ doc }) => {
    for (const p of paths) {
      revalidatePath(p)
    }
    return doc
  }

export const revalidateGlobalAfterChange =
  (paths: string[]): GlobalAfterChangeHook =>
  ({ doc }) => {
    for (const p of paths) {
      revalidatePath(p)
    }
    return doc
  }
