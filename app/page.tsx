"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, Filter, AlertCircle, Info } from "lucide-react"

export default function Page() {
  const [progress] = useState(65)
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const filters = ["Active", "Pending", "Inactive", "Draft"]

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    )
  }

  return (
    <div className="min-h-svh bg-background p-10">

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-foreground">Thematic.Design</h1>
        <p className="text-muted-foreground mt-2">Enterprise Design System — Component Showcase</p>
        <div className="text-xs text-muted-foreground mt-1 font-mono">(Press d to toggle dark mode)</div>
      </div>

      <Separator className="mb-12" />

      {/* Alerts */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-4">Alerts</h2>
        <div className="flex flex-col gap-3 max-w-xl">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>This is an informational alert using your token system.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Something went wrong. Please try again.</AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Buttons */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button disabled>Disabled</Button>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>This is a tooltip</TooltipContent>
          </Tooltip>
        </div>
      </section>

      {/* Badges */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-4">Badges</h2>
        <div className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </section>

      {/* Progress & Skeleton */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-4">Progress & Skeleton</h2>
        <div className="flex flex-col gap-4 max-w-sm">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Progress — {progress}%</p>
            <Progress value={progress} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground mb-1">Skeleton loader</p>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </section>

      {/* Inputs & Controls */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-4">Inputs & Controls</h2>
        <div className="flex flex-col gap-4 max-w-sm">
          <Input placeholder="Default input" />
          <Input placeholder="Disabled input" disabled />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-3">
            <Checkbox id="terms" />
            <label htmlFor="terms" className="text-sm text-foreground">Accept terms and conditions</label>
          </div>
          <div className="flex items-center gap-3">
            <Switch id="notifications" />
            <label htmlFor="notifications" className="text-sm text-foreground">Enable notifications</label>
          </div>
        </div>
      </section>

      {/* Filter Pattern */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-4">Filter Pattern</h2>
        <p className="text-sm text-muted-foreground mb-4">Built by composing Popover + Command + Checkbox</p>
        <div className="flex items-center gap-3">
          <Popover open={filterOpen} onOpenChange={setFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter Status
                {selectedFilters.length > 0 && (
                  <Badge className="ml-2" variant="secondary">{selectedFilters.length}</Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0">
              <Command>
                <CommandInput placeholder="Search filters..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Status">
                    {filters.map(filter => (
                      <CommandItem key={filter} onSelect={() => toggleFilter(filter)}>
                        <Checkbox
                          checked={selectedFilters.includes(filter)}
                          className="mr-2"
                        />
                        {filter}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {selectedFilters.length > 0 && (
            <div className="flex gap-2">
              {selectedFilters.map(f => (
                <Badge key={f} variant="secondary">{f}</Badge>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Avatar & Dropdown */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-4">Avatar & Dropdown</h2>
        <div className="flex items-center gap-6">
          <Avatar><AvatarFallback>VB</AvatarFallback></Avatar>
          <Avatar><AvatarFallback>TD</AvatarFallback></Avatar>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      {/* Accordion */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-4">Accordion</h2>
        <Accordion type="single" collapsible className="max-w-lg">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is a design token?</AccordionTrigger>
            <AccordionContent>Design tokens are named values that represent design decisions like colors, spacing, and typography — stored as data.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What is Radix UI?</AccordionTrigger>
            <AccordionContent>Radix UI provides unstyled, accessible component primitives for building high-quality design systems.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What is Style Dictionary?</AccordionTrigger>
            <AccordionContent>Style Dictionary by Amazon transforms token JSON files into CSS variables, JS constants, and other platform-specific formats.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Collapsible */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-4">Collapsible</h2>
        <Collapsible className="max-w-lg">
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              Advanced Options <ChevronDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <Card>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground">Hidden content revealed on expand. Useful for advanced settings or secondary information.</p>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </section>

      {/* Sheet */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-4">Sheet / Drawer</h2>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Sheet Panel</SheetTitle>
              <SheetDescription>This slides in from the right. Used for detail panels, settings, and side navigation in enterprise apps.</SheetDescription>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-4">
              <Input placeholder="Search..." />
              <Button>Save Changes</Button>
            </div>
          </SheetContent>
        </Sheet>
      </section>

      {/* Alert Dialog */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-4">Alert Dialog</h2>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Item</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone. This will permanently delete the item.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>

      {/* Scroll Area */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-4">Scroll Area</h2>
        <ScrollArea className="h-40 w-72 rounded-md border p-4">
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i} className="text-sm text-muted-foreground py-1">Scrollable item {i + 1}</p>
          ))}
        </ScrollArea>
      </section>

      {/* Tabs */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-4">Tabs</h2>
        <Tabs defaultValue="overview" className="max-w-lg">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Card><CardHeader><CardTitle>Overview</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">Your overview content goes here.</p></CardContent></Card>
          </TabsContent>
          <TabsContent value="analytics">
            <Card><CardHeader><CardTitle>Analytics</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">Your analytics content goes here.</p></CardContent></Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card><CardHeader><CardTitle>Settings</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">Your settings content goes here.</p></CardContent></Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Table */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-foreground mb-4">Table</h2>
        <div className="rounded-md border max-w-2xl">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Varsha Bhide</TableCell>
                <TableCell>Designer</TableCell>
                <TableCell><Badge>Active</Badge></TableCell>
                <TableCell><Button size="sm" variant="ghost">Edit</Button></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Sumant N</TableCell>
                <TableCell>Developer</TableCell>
                <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
                <TableCell><Button size="sm" variant="ghost">Edit</Button></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">John Doe</TableCell>
                <TableCell>Manager</TableCell>
                <TableCell><Badge variant="destructive">Inactive</Badge></TableCell>
                <TableCell><Button size="sm" variant="ghost">Edit</Button></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

    </div>
  )
}
