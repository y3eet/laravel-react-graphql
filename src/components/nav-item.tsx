import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import type { NavItem } from '@/types/navigation';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { NavLink } from 'react-router';

interface NavItemProps {
  item: NavItem;
  level?: number;
}

export function NavItemComponent({ item, level = 0 }: NavItemProps) {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const Icon = item.icon;

  // Top level items
  if (level === 0) {
    if (hasChildren) {
      return (
        <Collapsible open={open} onOpenChange={setOpen} className="w-full">
          <SidebarMenuItem>
            <CollapsibleTrigger className="flex w-full" asChild>
              <SidebarMenuButton>
                {Icon && <Icon className="h-4 w-4" />}
                <span>{item.label}</span>
                <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.children?.map(child => (
                  <NavItemComponent key={child.id} item={child} level={level + 1} />
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      );
    }

    return (
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <NavLink to={item.href || '#'}>
            {Icon && <Icon className="h-4 w-4" />}
            <span>{item.label}</span>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  // Nested items (level > 0)
  if (hasChildren) {
    return (
      <>
        <SidebarMenuSubItem>
          <SidebarMenuSubButton asChild>
            <a href={item.href || '#'}>{item.label}</a>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
        {item.children?.map(child => (
          <NavItemComponent key={child.id} item={child} level={level + 1} />
        ))}
      </>
    );
  }

  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton asChild>
        <a href={item.href || '#'}>{item.label}</a>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
