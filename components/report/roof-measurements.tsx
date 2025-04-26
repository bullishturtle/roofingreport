export function RoofMeasurements() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 border rounded-md">
          <div className="text-sm text-muted-foreground">Total Area</div>
          <div className="text-2xl font-bold">2,450 sq ft</div>
        </div>
        <div className="p-4 border rounded-md">
          <div className="text-sm text-muted-foreground">Pitch</div>
          <div className="text-2xl font-bold">6:12</div>
        </div>
        <div className="p-4 border rounded-md">
          <div className="text-sm text-muted-foreground">Ridges</div>
          <div className="text-2xl font-bold">86 ft</div>
        </div>
        <div className="p-4 border rounded-md">
          <div className="text-sm text-muted-foreground">Valleys</div>
          <div className="text-2xl font-bold">42 ft</div>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden">
        <div className="bg-muted px-4 py-2 font-medium">Facets Breakdown</div>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3 text-sm font-medium">Facet</th>
              <th className="text-left p-3 text-sm font-medium">Area</th>
              <th className="text-left p-3 text-sm font-medium">Pitch</th>
              <th className="text-left p-3 text-sm font-medium">Direction</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-3">Main Front</td>
              <td className="p-3">820 sq ft</td>
              <td className="p-3">6:12</td>
              <td className="p-3">South</td>
            </tr>
            <tr className="border-b">
              <td className="p-3">Main Back</td>
              <td className="p-3">780 sq ft</td>
              <td className="p-3">6:12</td>
              <td className="p-3">North</td>
            </tr>
            <tr className="border-b">
              <td className="p-3">Left Side</td>
              <td className="p-3">425 sq ft</td>
              <td className="p-3">5:12</td>
              <td className="p-3">East</td>
            </tr>
            <tr>
              <td className="p-3">Right Side</td>
              <td className="p-3">425 sq ft</td>
              <td className="p-3">5:12</td>
              <td className="p-3">West</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="border rounded-md overflow-hidden">
        <div className="bg-muted px-4 py-2 font-medium">Material Estimation</div>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3 text-sm font-medium">Material</th>
              <th className="text-left p-3 text-sm font-medium">Quantity</th>
              <th className="text-left p-3 text-sm font-medium">Unit</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-3">Shingles</td>
              <td className="p-3">25</td>
              <td className="p-3">Squares</td>
            </tr>
            <tr className="border-b">
              <td className="p-3">Underlayment</td>
              <td className="p-3">2,450</td>
              <td className="p-3">sq ft</td>
            </tr>
            <tr className="border-b">
              <td className="p-3">Ridge Cap</td>
              <td className="p-3">86</td>
              <td className="p-3">ft</td>
            </tr>
            <tr>
              <td className="p-3">Drip Edge</td>
              <td className="p-3">180</td>
              <td className="p-3">ft</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
