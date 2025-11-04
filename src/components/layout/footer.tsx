export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto py-6 px-4">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Jus Délice. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
