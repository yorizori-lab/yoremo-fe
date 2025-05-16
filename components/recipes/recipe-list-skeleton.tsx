import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function RecipeListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="h-full overflow-hidden">
          <div className="aspect-video w-full bg-muted animate-pulse" />
          <CardHeader className="p-4">
            <div className="h-6 bg-muted animate-pulse rounded w-3/4" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-4 bg-muted animate-pulse rounded w-1/2 mb-2" />
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <div className="h-6 bg-muted animate-pulse rounded w-16" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
