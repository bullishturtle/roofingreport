"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cloud, CloudRain, Droplets, Search, Sun, Wind, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import axios from "axios"
import type { WeatherData } from "@/lib/api/weather"

export function WeatherWidget() {
  const [location, setLocation] = useState("Orlando, FL")
  const [searchInput, setSearchInput] = useState("")
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [forecastData, setForecastData] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("current")

  // Fetch weather data on component mount and when location changes
  useEffect(() => {
    fetchWeatherData()
  }, [location])

  const fetchWeatherData = async () => {
    setIsLoading(true)

    try {
      // Fetch current weather
      const currentResponse = await axios.get(`/api/weather?location=${encodeURIComponent(location)}`)
      setWeatherData(currentResponse.data)

      // Fetch forecast if on forecast tab
      if (activeTab === "forecast") {
        const forecastResponse = await axios.get(
          `/api/weather?location=${encodeURIComponent(location)}&forecast=true&days=5`,
        )
        setForecastData(forecastResponse.data)
      }
    } catch (error) {
      console.error("Error fetching weather data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      setLocation(searchInput)
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)

    // Fetch forecast data if switching to forecast tab and we don't have it yet
    if (value === "forecast" && !forecastData) {
      fetchForecastData()
    }
  }

  const fetchForecastData = async () => {
    setIsLoading(true)

    try {
      const response = await axios.get(`/api/weather?location=${encodeURIComponent(location)}&forecast=true&days=5`)
      setForecastData(response.data)
    } catch (error) {
      console.error("Error fetching forecast data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Get weather icon based on condition code
  const getWeatherIcon = (code: number) => {
    if (code >= 1000 && code <= 1003) {
      return <Sun className="h-8 w-8 text-yellow-400" />
    } else if (code >= 1004 && code <= 1030) {
      return <Cloud className="h-8 w-8 text-gray-400" />
    } else if (code >= 1063 && code <= 1189) {
      return <CloudRain className="h-8 w-8 text-blue-400" />
    } else if (code >= 1192 && code <= 1201) {
      return <CloudRain className="h-8 w-8 text-blue-600" />
    } else {
      return <Cloud className="h-8 w-8 text-gray-400" />
    }
  }

  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center justify-between">
          <span>Weather Conditions</span>
          {weatherData && (
            <span className="text-sm font-normal text-white/70">
              {weatherData.location.name}, {weatherData.location.region}
            </span>
          )}
        </CardTitle>
        <CardDescription className="text-white/70">Current weather and forecast for your area</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Enter location..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="bg-black/30 border-white/20 text-white placeholder:text-white/50 focus:border-neon-gold"
          />
          <Button type="submit" variant="outline" size="icon" className="border-white/20 text-white hover:bg-white/10">
            <Search className="h-4 w-4" />
          </Button>
        </form>

        <Tabs defaultValue="current" value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10">
            <TabsTrigger
              value="current"
              className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
            >
              Current
            </TabsTrigger>
            <TabsTrigger
              value="forecast"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              Forecast
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-4 pt-4">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
              </div>
            ) : weatherData ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {getWeatherIcon(weatherData.current.condition.code)}
                    <div>
                      <h3 className="text-2xl font-bold text-white">{weatherData.current.temp_f}°F</h3>
                      <p className="text-sm text-white/70">{weatherData.current.condition.text}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white/70">Feels like</p>
                    <p className="text-lg font-medium text-white">{weatherData.current.feelslike_f}°F</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 p-2 rounded-md bg-black/30">
                    <Wind className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="text-xs text-white/70">Wind</p>
                      <p className="text-sm font-medium text-white">
                        {weatherData.current.wind_mph} mph ({weatherData.current.wind_dir})
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-md bg-black/30">
                    <Droplets className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="text-xs text-white/70">Humidity</p>
                      <p className="text-sm font-medium text-white">{weatherData.current.humidity}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-md bg-black/30">
                    <CloudRain className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="text-xs text-white/70">Precipitation</p>
                      <p className="text-sm font-medium text-white">{weatherData.current.precip_in}" in</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-md bg-black/30">
                    <Sun className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="text-xs text-white/70">UV Index</p>
                      <p className="text-sm font-medium text-white">{weatherData.current.uv}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-8 text-white/50">No weather data available</div>
            )}
          </TabsContent>

          <TabsContent value="forecast" className="space-y-4 pt-4">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
              </div>
            ) : forecastData?.forecast ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="grid gap-2">
                  {forecastData.forecast.forecastday.slice(0, 5).map((day, index) => (
                    <motion.div
                      key={day.date}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-2 rounded-md bg-black/30"
                    >
                      <div className="flex items-center gap-3">
                        {getWeatherIcon(day.day.condition.code)}
                        <div>
                          <p className="text-sm font-medium text-white">
                            {new Date(day.date).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                          <p className="text-xs text-white/70">{day.day.condition.text}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-white">{Math.round(day.day.maxtemp_f)}°F</p>
                        <p className="text-xs text-white/70">{Math.round(day.day.mintemp_f)}°F</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="text-xs text-white/50 text-center">
                  Weather data updated {new Date().toLocaleTimeString()}
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-8 text-white/50">No forecast data available</div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button
          onClick={fetchWeatherData}
          variant="outline"
          className="w-full border-white/20 text-white hover:bg-white/10"
        >
          Refresh Weather Data
        </Button>
      </CardFooter>
    </Card>
  )
}
