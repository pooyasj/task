"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { Button } from "@/src/shared/components/ui/button";
import { DeviceForm } from "./DeviceForm";
import type { Device } from "../types/device";
import type { DeviceFormValues } from "../schemas/device-schema";

interface AddDeviceModalProps {
  onAdd: (device: Device) => void;
}

export function AddDeviceModal({ onAdd }: AddDeviceModalProps) {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (values: DeviceFormValues) => {
    onAdd({
      ...values,
      id: crypto.randomUUID(),
      lastPing: "Just now",
    });
    setOpen(false);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger render={<Button>Add device</Button>} />
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/50" />
        <DialogPrimitive.Viewport className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <DialogPrimitive.Popup className="w-full max-w-md rounded-lg border bg-background p-6 shadow-lg">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <DialogPrimitive.Title className="text-lg font-semibold">
                  Add new device
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="mt-1 text-sm text-muted-foreground">
                  Enter the device details below.
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
            <DeviceForm
              onSubmit={handleSubmit}
              onCancel={() => setOpen(false)}
            />
          </DialogPrimitive.Popup>
        </DialogPrimitive.Viewport>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
