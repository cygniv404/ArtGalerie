export default async function handler(
  params: { objectNumber: string } | string,
) {
  const API_KEY = process.env.RIJKSDATA_API_KEY;
  try {
    if (typeof params !== "string" && params?.objectNumber) {
      const painting = await fetch(
        "https://www.rijksmuseum.nl/api/en/collection/" +
          params.objectNumber +
          "?key=" +
          API_KEY,
      );
      return await painting.json();
    }
    const paints = await fetch(
      `https://www.rijksmuseum.nl/api/en/collection?key=${API_KEY}&ps=9&${params}`,
    );
    return await paints.json();
  } catch (error) {
    throw Error("Error fetching rijksmuseum data");
  }
}
export const RIJKSDATA_API_MAX_QUERY_RESULTS = 10000; // Note that p * ps cannot exceed 10,000.
