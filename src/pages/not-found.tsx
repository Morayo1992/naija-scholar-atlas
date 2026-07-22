import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
      <Empty className="max-w-md">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Compass />
          </EmptyMedia>
          <EmptyTitle>Page not found</EmptyTitle>
          <EmptyDescription>
            The page you're looking for doesn't exist or may have moved.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link to="/">Back to home</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
