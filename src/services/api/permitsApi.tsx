import { database } from "@/data/database";

interface FilterParams {
  location: string[];
  statuses: string[];
}

export const fetchPermitData = async (params: FilterParams) => {
  const queryParams = new URLSearchParams();
  if (params.location) queryParams.set("location", params.location.join(","));
  if (params.statuses) queryParams.set("statuses", params.statuses.join(","));

  const permits = database.permits
    .filter((permit) => {
      if (params.location.length > 0) {
        return params.location.includes(permit.location_code);
      }
      return true;
    })
    .filter((permit) => {
      if (params.statuses.length > 0) {
        return params.statuses.includes(permit.status);
      }
      return true;
    });

  return new Promise((resolve) => {
    setTimeout(() => {
      const data = {
        tableData: permits,
        stats: {
          activePermits: permits.filter((permit) => permit.status === "active").length,
          requestedPermits: permits.filter((permit) => permit.status === "requested").length,
          expiredPermits: permits.filter((permit) => permit.status === "expired").length,
        },
      };
      resolve(data);
    }, 200);
  });

  const response = await fetch(`/api/permits?${queryParams}`);
  return response.json();
};
