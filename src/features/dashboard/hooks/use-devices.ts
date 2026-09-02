import { useQuery } from "@tanstack/react-query";
import rawData from "../data/devices.json";
import type { Device } from "../types/device";

const fetchDevices = async (): Promise<Device[]> => {
    await new Promise((resolve) => window.setTimeout(resolve, 700));
    return rawData as Device[];
};

export function useDevices() {
    return useQuery({
        queryKey: ["devices"],
        queryFn: fetchDevices,
    });
}
