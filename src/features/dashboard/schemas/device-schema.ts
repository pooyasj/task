import { z } from "zod";

const ipv4Schema = z
    .string()
    .trim()
    .min(1, "IP address is required")
    .refine(
        (value) => {
            const parts = value.split(".");
            return (
                parts.length === 4 &&
                parts.every((part) => /^(0|[1-9]\d{0,2})$/.test(part) && Number(part) <= 255)
            );
        },
        "IP address must be a valid IPv4 address",
    );

export const deviceSchema = z.object({
    name: z.string().trim().min(1, "Device name is required"),
    ip: ipv4Schema,
    status: z.enum(["Online", "Offline", "Warning"]),
});

export type DeviceFormValues = z.infer<typeof deviceSchema>;
