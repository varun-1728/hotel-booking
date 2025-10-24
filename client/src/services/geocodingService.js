import * as maptiler from "@maptiler/client";

// Configure the API key on the main client object
maptiler.config.apiKey = import.meta.env.VITE_MAP_TILER_KEY;

export async function getCoordinatesFromAddress(address, countryCode) {
  // Check if the geocoding service is available before calling it
  if (!maptiler.geocoding) {
    console.error("MapTiler geocoding client is not properly initialized.");
    return null;
  }

  try {
    const options = {
      limit: 1,
    };

    // Add the country parameter if a country code is provided
    if (countryCode) {
      options.country = countryCode;
    }

    const results = await maptiler.geocoding.forward(address, options);

    if (results.features && results.features.length > 0) {
      const geometry = results.features[0].geometry;
      return geometry;
    } else {
      console.error("No coordinates found for that address.");
      return null;
    }
  } catch (error) {
    console.error("Error geocoding the address:", error);
    return null;
  }
}
