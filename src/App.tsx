import { MainLayout } from "@/components/layout/MainLayout"
import { Button } from "@/components/ui/button"

const ComponentA = () => {
  const toastMessage = () => {
    console.log("asdasd")
  }

  return (
    <Button className="mt-2" onClick={toastMessage}>
      Button
    </Button>
  )
}

export function App() {
  return (
    <MainLayout>
      <div className="flex flex-1 flex-col gap-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
      <div className="flex min-h-svh">
        <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
          <div>
            <h1 className="text-base font-medium">Project ready!</h1>
            <p>You may now add components and start building.</p>
            <p>We&apos;ve already added the button component for you.</p>
            <ComponentA />
          </div>
          <input placeholder="asdasd asd" />
          <div className="font-mono text-xs text-muted-foreground">
            (Press <kbd>d</kbd> to toggle dark mode)
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default App
