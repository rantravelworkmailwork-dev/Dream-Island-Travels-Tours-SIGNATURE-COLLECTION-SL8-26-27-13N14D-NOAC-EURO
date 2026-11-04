document.addEventListener("DOMContentLoaded", function () {
  // Initialize map container safely
  const mapElement = document.getElementById("sri-lanka-map");
  if (!mapElement) return;

  const map = L.map("sri-lanka-map", {
    scrollWheelZoom: false // Prevents accidental scrolling on mobile
  }).setView([7.5, 80.5], 8);

  // Clean English-Only Map (Esri - Free, No API Key, No Watermarks)
  L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom'
  }).addTo(map);

  // Route pins matching the 14-day itinerary
  const routeStops = [
    {
      day: "Days 1 – 2",
      title: "Sigiriya & Habarana",
      stay: "Habarana Village by Cinnamon (2 Nights, Half Board)",
      coords: [8.0339, 80.7533],
      desc: "Airport welcome & private transfer, Ayurveda massage, Sigiriya Rock Fortress, Hiriwadunna Village Tour, Habarana Elephant Safari & cultural dance show."
    },
    {
      day: "Day 3",
      title: "Dambulla to Kandy",
      stay: "Thilanka Hotel (1 Night, Half Board)",
      coords: [7.2906, 80.6337],
      desc: "Dambulla Cave & Golden Temple, Spice Garden and the Temple of the Sacred Tooth Relic."
    },
    {
      day: "Day 4",
      title: "Nuwara Eliya",
      stay: "Araliya Green Hills (1 Night, Half Board)",
      coords: [6.9497, 80.7891],
      desc: "Peradeniya Royal Botanical Garden, Tea Plantation & Factory and Ramboda Falls."
    },
    {
      day: "Day 5",
      title: "Ella",
      stay: "Flower Garden Hotel (1 Night, Half Board)",
      coords: [6.8667, 81.0466],
      desc: "Scenic train ride from Nuwara Eliya to Ella and an afternoon exploring the mountain village."
    },
    {
      day: "Day 6",
      title: "Yala",
      stay: "Kithala Resort (1 Night, Half Board)",
      coords: [6.2850, 81.3000],
      desc: "Little Adam's Peak hike, Nine Arch Bridge and a scenic drive down to the wilderness of Yala."
    },
    {
      day: "Days 7 – 9",
      title: "Mirissa",
      stay: "Turtle Bay Beach (3 Nights, Half Board)",
      coords: [5.9483, 80.4716],
      desc: "Early morning Yala National Park Jeep Safari, then the south coast to Mirissa, followed by a full beach leisure day."
    },
    {
      day: "Day 10",
      title: "Induruwa",
      stay: "Pandanus Beach Resort & Spa (1 Night, Half Board)",
      coords: [6.4500, 79.9958],
      desc: "Sea Turtle Hatchery, Koggala Lagoon Boat Safari and Galle Fort on the coastal drive north."
    },
    {
      day: "Days 11 – 13",
      title: "Colombo",
      stay: "Cinnamon Lakeside (3 Nights, Half Board)",
      coords: [6.9271, 79.8612],
      desc: "Colombo City Tour, followed by two leisure days for shopping, café culture and a stroll around Beira Lake."
    },
    {
      day: "Day 14",
      title: "Departure",
      stay: "Bandaranaike International Airport",
      coords: [7.1808, 79.8841],
      desc: "After breakfast, private transfer to the airport for your departure flight home."
    }
  ];

  const routeCoords = [];

  // Add Custom Numbered Markers & Popups
  routeStops.forEach((stop, index) => {
    routeCoords.push(stop.coords);

    const customIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `<span>${index + 1}</span>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    const popupContent = `
      <div style="font-family: 'Jost', sans-serif; padding: 4px; max-width: 220px;">
        <span style="background:#a8843f; color:white; font-size:11px; font-weight:bold; padding:2px 8px; border-radius:10px;">${stop.day}</span>
        <h6 style="margin: 6px 0 2px 0; font-weight:800; color:#0f172a; font-size: 14px;">${stop.title}</h6>
        <p style="font-size:12px; margin:0; color:#334155;"><strong>Stay:</strong> ${stop.stay}</p>
        <p style="font-size:12px; margin-top:4px; color:#1e293b; line-height: 1.4;">${stop.desc}</p>
      </div>
    `;

    L.marker(stop.coords, { icon: customIcon })
      .addTo(map)
      .bindPopup(popupContent);
  });

  // Draw Dashed Route Line Connecting the Destinations
  const polyline = L.polyline(routeCoords, {
    color: '#a8843f',
    weight: 4,
    opacity: 0.9,
    dashArray: '6, 8'
  }).addTo(map);

  // Auto Fit Map View to show all Pins cleanly
  const fitMapBounds = () => {
    const isMobile = window.innerWidth < 768;
    const paddingVal = isMobile ? [15, 15] : [35, 35];
    map.fitBounds(polyline.getBounds(), { padding: paddingVal });
  };

  fitMapBounds();

  // Recalculate on screen resize or orientation change
  window.addEventListener('resize', () => {
    map.invalidateSize();
    fitMapBounds();
  });
});