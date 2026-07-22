import { Card } from '../Card';
import { Placeholder } from '../Placeholder';

export type UserListItem = { id: string; name: string; email: string; createdAt: string };
export function UserList({ users, loading = false }: { users: UserListItem[]; loading?: boolean }) {
  return (
    <Card>
      {loading ? (
        <p className="text-slate-500">Loading users…</p>
      ) : !users.length ? (
        <Placeholder title="No users" description="Registered users will appear here." />
      ) : (
        <div className="grid gap-3">
          {users.map((user) => (
            <div
              className="flex items-center gap-4 border-b border-slate-200 py-3 last:border-b-0"
              key={user.id}
            >
              <div
                className="grid size-10 shrink-0 place-items-center rounded-full bg-indigo-50 font-extrabold text-indigo-600"
                aria-hidden="true"
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <strong>{user.name}</strong>
                <br />
                <span className="text-slate-500">{user.email}</span>
              </div>
              <small className="hidden text-slate-500 md:block">
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
