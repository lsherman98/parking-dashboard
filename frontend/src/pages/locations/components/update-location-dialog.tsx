import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLocationFormSchema, CreateLocationFormSchema } from "../data/schema";
import { states } from "@/data";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/custom/button";

// @ts-ignore
export default function UpdateLocationDialog({ location }: { location: any }) {
  const updateLocationForm = useForm<CreateLocationFormSchema>({
    resolver: zodResolver(createLocationFormSchema),
    defaultValues: {
      location_code: "LOC001",
      address: "",
      city: "",
      state: "",
      zip_code: "",
      lot_size: 0,
      activate: false,
    },
  });

  function onSubmit(values: CreateLocationFormSchema) {
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Update Location</DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Update Location</DialogTitle>
        </DialogHeader>
        <div>
          <Form {...updateLocationForm}>
            <form onSubmit={updateLocationForm.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex gap-4">
                <FormField
                  disabled
                  control={updateLocationForm.control}
                  name="location_code"
                  render={({ field }) => (
                    <FormItem className="w-[200px]">
                      <FormLabel>Location Code</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. LOC001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={updateLocationForm.control}
                  name="lot_size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parking Spots</FormLabel>
                      <FormControl>
                        <Input
                          className="w-[96px]"
                          type="number"
                          min={0}
                          placeholder="Enter number of spots"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4 w-full">
                <FormField
                  control={updateLocationForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input className="w-[200px]" placeholder="e.g. 123 Main St" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={updateLocationForm.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input className="w-[200px]" placeholder="e.g. Boston" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4">
                <FormField
                  control={updateLocationForm.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="flex flex-col pt-1">
                      <FormLabel className="mb-.5 text-sm">State</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn("w-[200px] justify-between", !field.value && "text-muted-foreground")}
                            >
                              {field.value ? states.find((state) => state.value === field.value)?.label : "Select State"}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search framework..." className="h-9" />
                            <CommandList>
                              <CommandGroup>
                                {states.map((state) => (
                                  <CommandItem
                                    value={state.label}
                                    key={state.value}
                                    onSelect={() => {
                                      updateLocationForm.setValue("state", state.value);
                                    }}
                                  >
                                    {state.label}
                                    <Check className={cn("ml-auto", state.value === field.value ? "opacity-100" : "opacity-0")} />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={updateLocationForm.control}
                  name="zip_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input className="w-[125px]" placeholder="e.g. 02110" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={updateLocationForm.control}
                name="activate"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Activate Lot</FormLabel>
                      <FormDescription>Choose to activate lot on creation.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-2">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="button" variant="destructive">
                  Delete Location
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
