import { Button } from "@/components/custom/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useState } from "react";

export default function ViolationPhotosDialog({ violation }: { violation: any }) {
  const [camera, setCamera] = useState("DS-101 ENT-1 (Adaptive)");
  const [timeOfEntry, setTimeOfEntry] = useState("04/08/2024 8:43 AM");
  const [timeOfExit, setTimeOfExit] = useState("04/08/2024 8:43 AM");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>View Photos</DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="min-w-[800px] sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Violation Photos</DialogTitle>
          <DialogDescription>Entry and exit photos of violation vehicle.</DialogDescription>
        </DialogHeader>
        <div>
          <h2>
            <span className="font-bold">Camera: </span>
            {camera}
          </h2>
          <h4>
            <span className="font-bold"> Time of entry: </span>{timeOfEntry}
          </h4>
          <h4>
            <span className="font-bold"> Time of exit: </span>{timeOfExit}
          </h4>
        </div>
        <div className="justify-center space-y-4">
          <div className="flex gap-8">
            <div>
              <div className="font-bold">Plate Entry</div>
              <img src="https://via.placeholder.com/400x300" alt="Violation photo" />
            </div>
            <div>
              <div className="font-bold">Vehicle Entry</div>
              <img src="https://via.placeholder.com/400x300" alt="Violation photo" />
            </div>
          </div>
          <div className="flex gap-8">
            <div>
              <div className="font-bold">Plate Exit</div>
              <img src="https://via.placeholder.com/400x300" alt="Violation photo" />
            </div>
            <div>
              <div className="font-bold">Vehicle Exit</div>
              <img src="https://via.placeholder.com/400x300" alt="Violation photo" />
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
