import { Button } from '../Button';
import { Card } from '../Card';
import { EmptyState } from '../EmptyState';

export type UserListItem = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  isProtected: boolean;
};
export function UserList({
  users,
  loading = false,
  onEdit,
  onDelete,
}: {
  users: UserListItem[];
  loading?: boolean;
  onEdit: (user: UserListItem) => void;
  onDelete: (user: UserListItem) => void;
}) {
  return (
    <Card>
      {loading ? (
        <p className="text-slate-500">Loading users…</p>
      ) : !users.length ? (
        <EmptyState title="No users" description="Registered users will appear here." />
      ) : (
        <div className="grid gap-3">
          {users.map((user) => (
            <div
              className="flex items-center gap-4 border-b border-slate-200 py-3 last:border-b-0"
              key={user.id}
            >
              <div className="grid size-10 shrink-0 place-items-center rounded-full bg-indigo-50 font-extrabold text-indigo-600">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <strong>{user.name}</strong>
                {user.isProtected && (
                  <span className="ml-2 rounded-full bg-slate-100 px-2 py-1 text-xs">
                    First user
                  </span>
                )}
                <br />
                <span className="text-slate-500">{user.email}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  className="bg-slate-200 px-3 py-2 text-slate-700 hover:bg-slate-300"
                  onClick={() => onEdit(user)}
                >
                  Edit
                </Button>
                <Button
                  className="bg-red-600 px-3 py-2 hover:bg-red-700"
                  disabled={user.isProtected}
                  title={user.isProtected ? 'The first user cannot be deleted' : 'Delete user'}
                  onClick={() => onDelete(user)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
