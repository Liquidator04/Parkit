import { createClient } from "@supabase/supabase-js";

export async function POST(request) {
  console.log("Entered Post");
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  try {
    // Parse the request body
    const hostData = await request.json();

    // Make a call to the Mapbox geocoding API
    let response = await fetch(
      `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
        hostData.place
      )}&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`
    );

    if (response.ok) {
      let data = await response.json();

      // Check if any results were returned
      if (data.features && data.features.length > 0) {
        // Extract the first result's coordinates (longitude, latitude)
        let coordinates = data.features[0].geometry.coordinates;
        let longitude = coordinates[0];
        let latitude = coordinates[1];

        console.log("Longitude:", longitude);
        console.log("Latitude:", latitude);

        const { insertData, error } = await supabase
          .from("Host")
          .insert({
            longitude: longitude,
            latitude: latitude,
            ParkingSlots: hostData.ParkingSlots,
            Pricing: hostData.Pricing,
          })
          .select();

        // Return the coordinates as JSON
        return new Response(JSON.stringify({ longitude, latitude }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        console.log("No results found.");
        return new Response(JSON.stringify({ error: "No results found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }
    } else {
      console.error("Error fetching geolocation data:", response.statusText);
      return new Response(
        JSON.stringify({ error: "Error fetching geolocation data" }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
