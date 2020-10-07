# Pulumi

## Stack

AWS -

## Dev

`pulumi up`

from `--help`:

This command creates or updates resources in a stack. The new desired goal state for the target stack is computed by running the current Pulumi program and observing all resource allocations to produce a resource graph. This goal state is then compared against the existing state to determine what create,
read, update, and/or delete operations must take place to achieve the desired goal state, in the most minimally disruptive way. This command records a full transactional snapshot of the stack's new state afterwards so that the stack may be updated incrementally again later on.

`pulumi destroy`

Destroy an existing stack and its resources

This command deletes an entire existing stack by name. The current state is
loaded from the associated state file in the workspace. After running to completion,
all of this stack's resources and associated state will be gone.Destroy an existing stack and its resources

This command deletes an entire existing stack by name. The current state is
loaded from the associated state file in the workspace. After running to completion,
all of this stack's resources and associated state will be gone.

`pulumi logs -f`

[PREVIEW] Show aggregated logs for a stack
