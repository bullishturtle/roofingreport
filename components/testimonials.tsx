import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Testimonials() {
  return (
    <section id="testimonials" className="py-12 md:py-24 bg-[#0a0d17]">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-block rounded-full bg-yellow-500/10 px-3 py-1 text-sm text-yellow-500 mb-4 border border-yellow-500/20">
            Success Stories
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-4">
            Trusted by Professionals Nationwide
          </h2>
          <p className="max-w-[700px] text-gray-400 md:text-xl">
            See what roofing contractors and property managers are saying about RoofFax.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-black/20 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-white">John Davis</p>
                  <p className="text-sm text-gray-400">Apex Roofing Solutions</p>
                </div>
              </div>
              <p className="text-gray-400">
                "RoofFax has completely transformed our business. We've increased our close rate by 35% and cut our
                proposal time in half. The accuracy of the reports is incredible."
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <Avatar>
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-white">Sarah Miller</p>
                  <p className="text-sm text-gray-400">Elite Property Management</p>
                </div>
              </div>
              <p className="text-gray-400">
                "As a property manager overseeing 200+ properties, RoofFax has been a game-changer. The detailed reports
                help us prioritize maintenance and budget accurately for repairs."
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <Avatar>
                  <AvatarFallback>RJ</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-white">Robert Johnson</p>
                  <p className="text-sm text-gray-400">Storm Chasers Roofing</p>
                </div>
              </div>
              <p className="text-gray-400">
                "The storm tracking feature alone is worth the subscription. We can now target affected neighborhoods
                immediately after a storm and be the first to offer our services."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
