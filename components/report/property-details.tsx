export function PropertyDetails() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border rounded-md">
          <div className="text-sm text-muted-foreground">Year Built</div>
          <div className="text-xl font-medium">1998</div>
        </div>
        <div className="p-4 border rounded-md">
          <div className="text-sm text-muted-foreground">Property Type</div>
          <div className="text-xl font-medium">Single Family</div>
        </div>
        <div className="p-4 border rounded-md">
          <div className="text-sm text-muted-foreground">Square Footage</div>
          <div className="text-xl font-medium">2,350 sq ft</div>
        </div>
        <div className="p-4 border rounded-md">
          <div className="text-sm text-muted-foreground">Lot Size</div>
          <div className="text-xl font-medium">0.25 acres</div>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden">
        <div className="bg-muted px-4 py-2 font-medium">Property Details</div>
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">Bedrooms</div>
            <div className="text-sm">4</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">Bathrooms</div>
            <div className="text-sm">2.5</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">Garage</div>
            <div className="text-sm">2-Car Attached</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">Foundation</div>
            <div className="text-sm">Concrete Slab</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">Heating</div>
            <div className="text-sm">Forced Air</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">Cooling</div>
            <div className="text-sm">Central AC</div>
          </div>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden">
        <div className="bg-muted px-4 py-2 font-medium">Roof Details</div>
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">Roof Type</div>
            <div className="text-sm">Gable</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">Material</div>
            <div className="text-sm">Asphalt Shingles</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">Last Replaced</div>
            <div className="text-sm">2010</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">Ventilation</div>
            <div className="text-sm">Ridge Vents, Soffit Vents</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">Gutters</div>
            <div className="text-sm">Aluminum, 5-inch</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">Skylights</div>
            <div className="text-sm">None</div>
          </div>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden">
        <div className="bg-muted px-4 py-2 font-medium">Local Building Codes</div>
        <div className="p-4">
          <p className="text-sm text-muted-foreground mb-3">
            Based on your location, the following building codes apply to roof replacements:
          </p>
          <ul className="text-sm space-y-2">
            <li className="flex items-start gap-2">
              <span className="h-2 w-2 rounded-full bg-primary mt-2"></span>
              <span>Wind resistance rating: 130 mph minimum</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="h-2 w-2 rounded-full bg-primary mt-2"></span>
              <span>Ice barrier required for eaves</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="h-2 w-2 rounded-full bg-primary mt-2"></span>
              <span>Class A fire rating required</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="h-2 w-2 rounded-full bg-primary mt-2"></span>
              <span>Permit required for replacements over 100 sq ft</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
