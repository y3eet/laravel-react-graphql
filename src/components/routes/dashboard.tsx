const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Welcome to your dashboard. This is a sample content area.</p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border p-4">
            <h2 className="font-semibold">Card 1</h2>
            <p className="text-sm text-muted-foreground">Sample content</p>
          </div>
          <div className="rounded-lg border p-4">
            <h2 className="font-semibold">Card 2</h2>
            <p className="text-sm text-muted-foreground">Sample content</p>
          </div>
          <div className="rounded-lg border p-4">
            <h2 className="font-semibold">Card 3</h2>
            <p className="text-sm text-muted-foreground">Sample content</p>
          </div>
        </div>
        <div className="mt-4 rounded-lg border p-4">
          <h2 className="text-lg font-semibold">Mobile Sidebar Instructions</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            On small screens, the sidebar is hidden by default. Click the menu button in the
            top-left corner to open it. The sidebar will appear as a slide-out panel. Click outside
            the sidebar or on a navigation item to close it.
          </p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
