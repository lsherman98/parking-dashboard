import { Button } from "@/components/custom/button";
import { Layout } from "@/components/custom/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { UserNav } from "@/components/user-nav";
import { ChevronDownIcon } from "lucide-react";

export default function Violations() {
  return (
    <Layout>
      <Layout.Body>
        <div className="mb-1 flex items-center justify-between space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <div className="h-full mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Invite your team members to collaborate.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/01.png" />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">Sofia Davis</p>
                    <p className="text-sm text-muted-foreground">m@example.com</p>
                  </div>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                      Admin <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="end">
                    <Command>
                      <CommandInput placeholder="Select new role..." />
                      <CommandList>
                        <CommandEmpty>No roles found.</CommandEmpty>
                        <CommandGroup>
                          <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                            <p>Admin</p>
                          </CommandItem>
                          <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                            <p>Sales</p>
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/02.png" />
                    <AvatarFallback>JL</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">Jackson Lee</p>
                    <p className="text-sm text-muted-foreground">p@example.com</p>
                  </div>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                      Sales <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="end">
                    <Command>
                      <CommandInput placeholder="Select new role..." />
                      <CommandList>
                        <CommandEmpty>No roles found.</CommandEmpty>
                        <CommandGroup className="p-1.5">
                          <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                            <p>Admin</p>
                          </CommandItem>
                          <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                            <p>Sales</p>
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout.Body>
    </Layout>
  );
}
