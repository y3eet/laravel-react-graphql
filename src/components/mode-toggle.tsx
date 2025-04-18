import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <>
      <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>Toggle Theme</Button>
    </>
  );
}
