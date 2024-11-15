interface FilterParams {
  location?: string[];
  statuses?: string[];
}

export const fetchPermitData = async (params: FilterParams) => {
  const queryParams = new URLSearchParams();
  if (params.location) queryParams.set("location", params.location.join(","));
  if (params.statuses) queryParams.set("statuses", params.statuses.join(","));

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("data");
    }, 1000);
  });

  const response = await fetch(`/api/permits?${queryParams}`);
  return response.json();
};
