"use client"

import { Home, MapPin, Calendar, User } from "lucide-react"

export function PropertyDetails() {
  // Sample data
  const property = {
    address: "123 Main Street",
    city: "Anytown",
    state: "CA",
    zip: "12345",
    type: "Single Family",
    yearBuilt: 2005,
    squareFeet: 2200,
    bedrooms: 4,
    bathrooms: 2.5,
    owner: "John Smith",
    lastInspection: "2023-04-15",
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <Home className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2" />
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Property Details</h3>
        </div>
      </div>

      <div className="px-4 py-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start">
          <div className="flex-1">
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <MapPin className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2" />
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</h4>
              </div>
              <p className="text-base font-medium text-gray-900 dark:text-white">{property.address}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {property.city}, {property.state} {property.zip}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Property Type</h4>
                <p className="text-base text-gray-900 dark:text-white">{property.type}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Year Built</h4>
                <p className="text-base text-gray-900 dark:text-white">{property.yearBuilt}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Square Footage</h4>
                <p className="text-base text-gray-900 dark:text-white">{property.squareFeet} sq ft</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Bedrooms/Bathrooms</h4>
                <p className="text-base text-gray-900 dark:text-white">
                  {property.bedrooms} bd / {property.bathrooms} ba
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start">
                <User className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Property Owner</h4>
                  <p className="text-base text-gray-900 dark:text-white">{property.owner}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Last Inspection</h4>
                  <p className="text-base text-gray-900 dark:text-white">
                    {new Date(property.lastInspection).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
            <div className="h-48 w-full sm:w-64 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
              <img src="/placeholder.svg?key=0hvnn" alt="Property" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
