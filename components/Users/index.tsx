import { Page } from '../Page';
import { PageHeader } from '../PageHeader';
import { UserList, type UserListItem } from '../UserList';

export function Users({ users, loading = false }: { users: UserListItem[]; loading?: boolean }) {
  return (
    <Page>
      <PageHeader title="Users" description="People registered in TaskFlow." />
      <UserList users={users} loading={loading} />
    </Page>
  );
}
