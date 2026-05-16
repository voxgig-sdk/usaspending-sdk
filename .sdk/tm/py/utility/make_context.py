# Usaspending SDK utility: make_context

from core.context import UsaspendingContext


def make_context_util(ctxmap, basectx):
    return UsaspendingContext(ctxmap, basectx)
