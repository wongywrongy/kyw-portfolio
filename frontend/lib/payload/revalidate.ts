import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

// Paths containing a dynamic segment (e.g. `/mindspace/[slug]`) are a no-op
// unless revalidatePath is told the entry is a page, so branch on that here
// instead of relying on every caller to remember the second argument.
function revalidate(paths: string[]) {
  for (const p of paths) {
    try {
      if (p.includes('[')) {
        revalidatePath(p, 'page')
      } else {
        revalidatePath(p)
      }
    } catch (error) {
      // revalidatePath throws "static generation store missing" when there is
      // no Next request context — i.e. any write through the local API from a
      // plain Node process (`npm run seed`, a migration, a publish hook run
      // from cron). There is no page cache to invalidate in that case, so this
      // is genuinely nothing to do rather than a failure worth aborting on.
      console.warn(`Skipped revalidation of ${p} (no Next request context)`, error)
    }
  }
}

export const revalidateAfterChange =
  (paths: string[]): CollectionAfterChangeHook =>
  ({ doc }) => {
    revalidate(paths)
    return doc
  }

export const revalidateAfterDelete =
  (paths: string[]): CollectionAfterDeleteHook =>
  ({ doc }) => {
    revalidate(paths)
    return doc
  }

export const revalidateGlobalAfterChange =
  (paths: string[]): GlobalAfterChangeHook =>
  ({ doc }) => {
    revalidate(paths)
    return doc
  }
