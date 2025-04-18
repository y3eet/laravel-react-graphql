import { Home, LayoutDashboard, LifeBuoy, Package, Settings, Users } from 'lucide-react';

export const navigationData = [
  {
    label: 'Main',
    items: [
      {
        id: 'home',
        label: 'Home',
        href: '/',
        icon: Home,
      },
      {
        id: 'dashboard',
        label: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: 'Dev',
    items: [
      {
        id: 'crud',
        label: 'CRUD',
        href: '/crud',
        icon: Home,
      },
      {
        id: 'ws',
        label: 'Websocket',
        href: '/websocket',
        icon: LayoutDashboard,
      },
      {
        id: 'gql',
        label: 'Graphiql',
        href: 'http://localhost:8000/graphiql',
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: 'Management',
    items: [
      {
        id: 'users',
        label: 'Users',
        icon: Users,
        children: [
          {
            id: 'all-users',
            label: 'All Users',
            href: '/users',
          },
          {
            id: 'add-user',
            label: 'Add New',
            href: '/users/new',
          },
          {
            id: 'permissions',
            label: 'Permissions',
            href: '/users/permissions',
            children: [
              {
                id: 'roles',
                label: 'Roles',
                href: '/users/permissions/roles',
              },
              {
                id: 'groups',
                label: 'Groups',
                href: '/users/permissions/groups',
              },
            ],
          },
        ],
      },
      {
        id: 'products',
        label: 'Products',
        icon: Package,
        children: [
          {
            id: 'inventory',
            label: 'Inventory',
            href: '/products/inventory',
          },
          {
            id: 'categories',
            label: 'Categories',
            href: '/products/categories',
          },
          {
            id: 'orders',
            label: 'Orders',
            href: '/products/orders',
          },
        ],
      },
    ],
  },
  {
    label: 'Settings',
    items: [
      {
        id: 'settings',
        label: 'Settings',
        href: '/settings',
        icon: Settings,
      },
      {
        id: 'help',
        label: 'Help & Support',
        href: '/help',
        icon: LifeBuoy,
      },
    ],
  },
];
