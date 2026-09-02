"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/src/shared/components/ui/button";
import { Input } from "@/src/shared/components/ui/input";
import { Label } from "@/src/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/components/ui/select";
import { deviceSchema, type DeviceFormValues } from "../schemas/device-schema";

interface DeviceFormProps {
  onSubmit: (values: DeviceFormValues) => void;
  onCancel: () => void;
}

export function DeviceForm({ onSubmit, onCancel }: DeviceFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DeviceFormValues>({
    resolver: zodResolver(deviceSchema),
    defaultValues: { name: "", ip: "", status: "Online" },
  });
  const status = watch("status");

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="space-y-2">
        <Label htmlFor="device-name">Device name</Label>
        <Input
          id="device-name"
          {...register("name")}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="device-ip">IP address</Label>
        <Input
          id="device-ip"
          placeholder="192.168.1.10"
          {...register("ip")}
          aria-invalid={!!errors.ip}
        />
        {errors.ip && (
          <p className="text-sm text-destructive">{errors.ip.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="device-status">Initial status</Label>
        <Select
          value={status}
          onValueChange={(value) =>
            setValue("status", value as DeviceFormValues["status"], {
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger id="device-status" aria-label="Initial status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Online">Online</SelectItem>
            <SelectItem value="Offline">Offline</SelectItem>
            <SelectItem value="Warning">Warning</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && (
          <p className="text-sm text-destructive">{errors.status.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Add device
        </Button>
      </div>
    </form>
  );
}
