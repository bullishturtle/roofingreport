"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, Shield, Clock, Phone, Mail, Calendar, ArrowRight } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Success! You're All Set</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your request has been submitted and verified pros in your area will be contacting you soon.
          </p>
        </div>

        {/* Status Card */}
        <Card className="max-w-2xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <CheckCircle className="h-6 w-6" />
              Request Confirmed
            </CardTitle>
            <CardDescription>
              Reference ID: #RF-2024-{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">What Happens Next:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Pro verification in progress
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Matching with local experts
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    Pros will contact you within 24 hours
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    Receive quotes and schedules
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Expected Timeline:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Pro matching:</span>
                    <Badge variant="outline">2-4 hours</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>First contact:</span>
                    <Badge variant="outline">4-24 hours</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Quotes received:</span>
                    <Badge variant="outline">1-3 days</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Work scheduled:</span>
                    <Badge variant="outline">3-7 days</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <Phone className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Expect Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                2-3 verified pros will contact you directly to discuss your project and provide quotes.
              </p>
              <Badge variant="outline">Within 24 hours</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Mail className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>Check Email</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">We'll send you pro profiles, quotes, and project updates via email.</p>
              <Badge variant="outline">Ongoing updates</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Calendar className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>Schedule Work</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Compare quotes, check references, and schedule your roofing project with confidence.
              </p>
              <Badge variant="outline">Your choice</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Pro Verification Tools */}
        <Card className="max-w-4xl mx-auto mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              While You Wait: Use Our Pro Verification Tools
            </CardTitle>
            <CardDescription>Research and verify any roofing professional before making your decision</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Verify Any Pro Instantly</h3>
                <p className="text-gray-600 text-sm">
                  Use our database to check licenses, insurance, certifications, and work history of any pro who
                  contacts you.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  <Shield className="h-4 w-4 mr-2" />
                  Verify a Pro Now
                </Button>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">Demo Our AI Analysis</h3>
                <p className="text-gray-600 text-sm">
                  See how our AI analyzes roof conditions and provides detailed reports for homeowners and pros.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  <Star className="h-4 w-4 mr-2" />
                  Try Demo Analysis
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card className="max-w-4xl mx-auto mb-12">
          <CardHeader>
            <CardTitle>Tips for Working with Roofing Pros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-green-800">✅ Do This:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Ask for detailed written quotes</li>
                  <li>• Verify their license and insurance</li>
                  <li>• Check recent customer references</li>
                  <li>• Get multiple quotes for comparison</li>
                  <li>• Ask about warranties and guarantees</li>
                  <li>• Ensure proper permits are obtained</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-red-800">❌ Avoid This:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Never pay large amounts upfront</li>
                  <li>• Don't sign contracts under pressure</li>
                  <li>• Avoid door-to-door solicitors</li>
                  <li>• Don't skip the permit process</li>
                  <li>• Never work with uninsured pros</li>
                  <li>• Don't ignore red flags or gut feelings</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Need Something Else?</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="outline">
              Track My Request
            </Button>
            <Button size="lg" variant="outline">
              Submit Another Request
            </Button>
            <Button size="lg" variant="outline">
              Contact Support
            </Button>
            <Button size="lg">
              Browse Pro Directory
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-12 p-6 bg-blue-50 rounded-lg max-w-2xl mx-auto">
          <h3 className="font-semibold text-blue-900 mb-2">Built for Pros. Trusted by Homeowners.</h3>
          <p className="text-blue-800 text-sm">
            We connect homeowners with licensed pros who meet our strict quality standards. Your satisfaction and safety
            are our top priorities.
          </p>
        </div>
      </div>
    </div>
  )
}
