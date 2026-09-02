"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { Trash2, X } from "lucide-react";
import { Button } from "@/src/shared/components/ui/button";
import type { Device } from "../types/device";

interface DeleteDeviceDialogProps {
  device: Device;
  onDelete: (id: string) => void;
}

export function DeleteDeviceDialog({
  device,
  onDelete,
}: DeleteDeviceDialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleDelete = () => {
    onDelete(device.id);
    setOpen(false);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Delete ${device.name}`}
            className="cursor-pointer"
          >
            <Trash2 className="text-red-500" />
          </Button>
        }
      />
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/50" />
        <DialogPrimitive.Viewport className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <DialogPrimitive.Popup className="w-full max-w-md rounded-lg border bg-background p-6 shadow-lg">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <DialogPrimitive.Title className="text-lg font-semibold">
                  Delete device
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="mt-1 text-sm text-muted-foreground">
                  Are you sure you want to delete {device.name}? This action
                  cannot be undone.
                </DialogPrimitive.Description>
              </div>
              <DialogPrimitive.Close
                render={
                  <Button variant="ghost" size="icon-sm" aria-label="Close">
                    <X />
                  </Button>
                }
              />
            </div>
            <div className="flex justify-end gap-2">
              <DialogPrimitive.Close
                render={<Button variant="outline">Cancel</Button>}
              />
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </DialogPrimitive.Popup>
        </DialogPrimitive.Viewport>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
