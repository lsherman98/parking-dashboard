import { database } from "@/data/database";

interface FilterParams {
  statuses: string[];
}

export const fetchLocationData = async (params: FilterParams) => {
  const queryParams = new URLSearchParams();
  if (params.statuses) queryParams.set("statuses", params.statuses.join(","));

  return new Promise((resolve) => {
    setTimeout(() => {
      const data = database.locations.filter((location) => {
        if (params.statuses.length > 0) {
          return params.statuses.includes(location.status);
        }
        return true;
      });
      resolve(data);
    }, 200);
  });

  const response = await fetch(`/api/locations`);
  return response.json();
};
