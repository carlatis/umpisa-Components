import type { Metadata } from 'next';
import '../assets/styles.css';
import { AuthProvider } from '../components/AuthProvider';

export const metadata: Metadata = {
  title: 'Components Playground',
  description: 'Interactive preview of the reusable Umpisa Inc. component library',
};

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="m-0 bg-slate-50 font-sans text-slate-800 antialiased">
        <AuthProvider storagePrefix="umpisa_playground">{children}</AuthProvider>
      </body>
    </html>
  );
}
