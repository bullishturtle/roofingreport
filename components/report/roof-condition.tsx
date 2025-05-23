import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function RoofCondition() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Overall Condition</h3>
          <p className="text-sm text-muted-foreground">Based on AI analysis of satellite imagery</p>
        </div>
        <Badge className="bg-amber-500 text-white">Fair</Badge>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="text-sm font-medium">Shingle Condition</div>
            <div className="text-sm text-muted-foreground">65%</div>
          </div>
          <Progress value={65} className="h-2" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="text-sm font-medium">Structural Integrity</div>
            <div className="text-sm text-muted-foreground">80%</div>
          </div>
          <Progress value={80} className="h-2" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="text-sm font-medium">Drainage</div>
            <div className="text-sm text-muted-foreground">75%</div>
          </div>
          <Progress value={75} className="h-2" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="text-sm font-medium">Flashing & Seals</div>
            <div className="text-sm text-muted-foreground">60%</div>
          </div>
          <Progress value={60} className="h-2" />
        </div>
      </div>

      <div className="border rounded-md p-4 space-y-3">
        <h3 className="font-medium">Detected Issues</h3>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500 mt-2"></span>
            <div>
              <p className="text-sm font-medium">Granule Loss</p>
              <p className="text-xs text-muted-foreground">
                Moderate granule loss detected on south-facing slope, indicating aging shingles.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-500 mt-2"></span>
            <div>
              <p className="text-sm font-medium">Wind Damage</p>
              <p className="text-xs text-muted-foreground">
                Minor wind damage detected on ridge caps and southeast corner.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-500 mt-2"></span>
            <div>
              <p className="text-sm font-medium">Flashing Wear</p>
              <p className="text-xs text-muted-foreground">
                Chimney flashing shows signs of wear and potential for leaks.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border rounded-md p-4">
        <h3 className="font-medium mb-3">Estimated Remaining Lifespan</h3>
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-full border-8 border-primary flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold">5-7</div>
              <div className="text-xs text-muted-foreground">years</div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>
              Based on current condition, material type, and local weather patterns, this roof has an estimated 5-7
              years of useful life remaining.
            </p>
            <p className="mt-2">Regular maintenance could extend this timeframe.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
