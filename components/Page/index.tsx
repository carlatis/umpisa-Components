import type { ReactNode } from 'react';
import { Container } from '../Container';

export function Page({ children }: { children: ReactNode }) {
  return <Container className="py-4 md:py-8">{children}</Container>;
}
