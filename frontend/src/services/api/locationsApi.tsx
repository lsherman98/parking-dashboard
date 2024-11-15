interface FilterParams {
  statuses?: string[];
}

export const fetchLocationData = async (params: FilterParams) => {
  const queryParams = new URLSearchParams();
  if (params.statuses) queryParams.set("statuses", params.statuses.join(","));

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("data");
    }, 1000);
  });

  const response = await fetch(`/api/locations`);
  return response.json();
};
