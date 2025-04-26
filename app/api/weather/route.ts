import { type NextRequest, NextResponse } from "next/server"
import axios from "axios"

// Define weather data types
type WeatherData = {
  location: {
    name: string
    region: string
    country: string
    lat: number
    lon: number
  }
  current: {
    temp_f: number
    temp_c: number
    condition: {
      text: string
      icon: string
      code: number
    }
    wind_mph: number
    wind_kph: number
    wind_degree: number
    wind_dir: string
    pressure_mb: number
    pressure_in: number
    precip_mm: number
    precip_in: number
    humidity: number
    cloud: number
    feelslike_f: number
    feelslike_c: number
    vis_miles: number
    vis_km: number
    uv: number
    gust_mph: number
    gust_kph: number
  }
  forecast?: {
    forecastday: Array<{
      date: string
      day: {
        maxtemp_f: number
        maxtemp_c: number
        mintemp_f: number
        mintemp_c: number
        avgtemp_f: number
        avgtemp_c: number
        maxwind_mph: number
        maxwind_kph: number
        totalprecip_mm: number
        totalprecip_in: number
        avgvis_miles: number
        avgvis_km: number
        avghumidity: number
        daily_will_it_rain: number
        daily_chance_of_rain: number
        daily_will_it_snow: number
        daily_chance_of_snow: number
        condition: {
          text: string
          icon: string
          code: number
        }
        uv: number
      }
      astro: {
        sunrise: string
        sunset: string
        moonrise: string
        moonset: string
        moon_phase: string
        moon_illumination: string
      }
      hour: Array<{
        time: string
        temp_c: number
        temp_f: number
        condition: {
          text: string
          icon: string
          code: number
        }
        wind_mph: number
        wind_kph: number
        wind_degree: number
        wind_dir: string
        pressure_mb: number
        pressure_in: number
        precip_mm: number
        precip_in: number
        humidity: number
        cloud: number
        feelslike_c: number
        feelslike_f: number
        windchill_c: number
        windchill_f: number
        heatindex_c: number
        heatindex_f: number
        dewpoint_c: number
        dewpoint_f: number
        will_it_rain: number
        chance_of_rain: number
        will_it_snow: number
        chance_of_snow: number
        vis_km: number
        vis_miles: number
        gust_mph: number
        gust_kph: number
        uv: number
      }>
    }>
  }
  alerts?: {
    alert: Array<{
      headline: string
      msgtype: string
      severity: string
      urgency: string
      areas: string
      category: string
      certainty: string
      event: string
      note: string
      effective: string
      expires: string
      desc: string
      instruction: string
    }>
  }
  history?: {
    events: Array<{
      date: string
      type: string
      severity: string
      description: string
      wind_mph?: number
      wind_kph?: number
      precip_in?: number
      precip_mm?: number
    }>
  }
}

// Storm history data
const stormHistoryData = {
  "Orlando, FL": [
    {
      date: "2023-09-28",
      type: "Hurricane",
      name: "Idalia",
      severity: "Category 3",
      description: "Hurricane Idalia brought sustained winds of 85 mph and heavy rainfall to the Orlando area.",
      wind_mph: 85,
      wind_kph: 136.8,
      precip_in: 6.2,
      precip_mm: 157.5,
    },
    {
      date: "2023-07-15",
      type: "Severe Thunderstorm",
      severity: "Moderate",
      description: "Severe thunderstorm with wind gusts up to 60 mph and hail reported in parts of Orlando.",
      wind_mph: 60,
      wind_kph: 96.6,
      precip_in: 2.3,
      precip_mm: 58.4,
    },
    {
      date: "2022-11-10",
      type: "Hurricane",
      name: "Nicole",
      severity: "Category 1",
      description: "Hurricane Nicole caused significant wind damage and flooding in the Orlando metropolitan area.",
      wind_mph: 75,
      wind_kph: 120.7,
      precip_in: 5.8,
      precip_mm: 147.3,
    },
    {
      date: "2022-09-28",
      type: "Hurricane",
      name: "Ian",
      severity: "Category 4",
      description:
        "Hurricane Ian was one of the most destructive hurricanes to hit Florida, causing catastrophic damage.",
      wind_mph: 150,
      wind_kph: 241.4,
      precip_in: 12.5,
      precip_mm: 317.5,
    },
  ],
  "Tampa, FL": [
    {
      date: "2023-08-30",
      type: "Hurricane",
      name: "Idalia",
      severity: "Category 3",
      description: "Hurricane Idalia made landfall near Tampa, causing significant storm surge and wind damage.",
      wind_mph: 120,
      wind_kph: 193.1,
      precip_in: 8.5,
      precip_mm: 215.9,
    },
    {
      date: "2023-06-18",
      type: "Severe Thunderstorm",
      severity: "Severe",
      description: "Severe thunderstorm with wind gusts up to 70 mph and large hail reported in Tampa Bay area.",
      wind_mph: 70,
      wind_kph: 112.7,
      precip_in: 3.1,
      precip_mm: 78.7,
    },
    {
      date: "2022-09-28",
      type: "Hurricane",
      name: "Ian",
      severity: "Category 4",
      description: "Hurricane Ian caused catastrophic damage in the Tampa Bay area with extreme storm surge.",
      wind_mph: 155,
      wind_kph: 249.4,
      precip_in: 15.0,
      precip_mm: 381.0,
    },
  ],
  "Miami, FL": [
    {
      date: "2023-11-16",
      type: "Tropical Storm",
      name: "Patty",
      severity: "Moderate",
      description: "Tropical Storm Patty brought heavy rainfall and moderate winds to the Miami metropolitan area.",
      wind_mph: 50,
      wind_kph: 80.5,
      precip_in: 7.2,
      precip_mm: 182.9,
    },
    {
      date: "2023-08-02",
      type: "Severe Thunderstorm",
      severity: "Moderate",
      description: "Severe thunderstorm with wind gusts up to 55 mph and street flooding in parts of Miami.",
      wind_mph: 55,
      wind_kph: 88.5,
      precip_in: 4.5,
      precip_mm: 114.3,
    },
    {
      date: "2022-06-15",
      type: "Tropical Storm",
      name: "Alex",
      severity: "Moderate",
      description: "Tropical Storm Alex caused significant street flooding in Miami and surrounding areas.",
      wind_mph: 65,
      wind_kph: 104.6,
      precip_in: 10.2,
      precip_mm: 259.1,
    },
  ],
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const location = searchParams.get("location")
    const forecast = searchParams.get("forecast") === "true"
    const history = searchParams.get("history") === "true"
    const days = Number.parseInt(searchParams.get("days") || "3")

    if (!location) {
      return NextResponse.json({ error: "Location parameter is required" }, { status: 400 })
    }

    // Get weather data from API or mock data
    let weatherData: WeatherData

    try {
      // Try to get real weather data if API key is available
      const apiKey = process.env.WEATHER_API_KEY
      if (apiKey) {
        const endpoint = forecast
          ? `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(
              location,
            )}&days=${days}&aqi=no&alerts=yes`
          : `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=no`

        const response = await axios.get(endpoint)
        weatherData = response.data
      } else {
        // Use mock data if no API key
        weatherData = getMockWeatherData(location, forecast, days)
      }
    } catch (error) {
      console.error("Error fetching from weather API:", error)
      weatherData = getMockWeatherData(location, forecast, days)
    }

    // Add storm history data if requested
    if (history) {
      const cityKey = Object.keys(stormHistoryData).find((key) => location.includes(key.split(",")[0])) || "Orlando, FL"
      weatherData.history = {
        events: stormHistoryData[cityKey],
      }
    }

    return NextResponse.json(weatherData)
  } catch (error) {
    console.error("Weather API error:", error)
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 })
  }
}

// Mock weather data for demo purposes
function getMockWeatherData(location: string, includeForecast: boolean, days: number): WeatherData {
  const city = location.split(",")[0] || "Orlando"
  const state = location.split(",")[1]?.trim() || "FL"

  const baseData: WeatherData = {
    location: {
      name: city,
      region: state,
      country: "United States of America",
      lat: 28.54,
      lon: -81.38,
    },
    current: {
      temp_f: 85.6 + (Math.random() * 10 - 5),
      temp_c: 29.8 + (Math.random() * 5 - 2.5),
      condition: {
        text: ["Sunny", "Partly cloudy", "Cloudy", "Light rain", "Moderate rain"][Math.floor(Math.random() * 5)],
        icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
        code: 1003,
      },
      wind_mph: 8.1 + (Math.random() * 6 - 3),
      wind_kph: 13.0 + (Math.random() * 10 - 5),
      wind_degree: 90 + (Math.random() * 40 - 20),
      wind_dir: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][Math.floor(Math.random() * 8)],
      pressure_mb: 1015.0 + (Math.random() * 10 - 5),
      pressure_in: 29.97 + (Math.random() * 0.3 - 0.15),
      precip_mm: Math.random() * 5,
      precip_in: Math.random() * 0.2,
      humidity: 65 + (Math.random() * 20 - 10),
      cloud: Math.floor(Math.random() * 100),
      feelslike_f: 92.1 + (Math.random() * 8 - 4),
      feelslike_c: 33.4 + (Math.random() * 4 - 2),
      vis_miles: 10.0 + (Math.random() * 2 - 1),
      vis_km: 16.1 + (Math.random() * 3 - 1.5),
      uv: 6.0 + (Math.random() * 4 - 2),
      gust_mph: 10.5 + (Math.random() * 8 - 4),
      gust_kph: 16.9 + (Math.random() * 13 - 6.5),
    },
  }

  // Add forecast data if requested
  if (includeForecast) {
    const forecastDays = []

    for (let i = 0; i < days; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)

      forecastDays.push({
        date: date.toISOString().split("T")[0],
        day: {
          maxtemp_f: 87.8 + (Math.random() * 5 - 2.5),
          maxtemp_c: 31.0 + (Math.random() * 3 - 1.5),
          mintemp_f: 73.4 + (Math.random() * 4 - 2),
          mintemp_c: 23.0 + (Math.random() * 2 - 1),
          avgtemp_f: 80.6 + (Math.random() * 3 - 1.5),
          avgtemp_c: 27.0 + (Math.random() * 2 - 1),
          maxwind_mph: 12.5 + (Math.random() * 5 - 2.5),
          maxwind_kph: 20.1 + (Math.random() * 8 - 4),
          totalprecip_mm: Math.random() * 5,
          totalprecip_in: Math.random() * 0.2,
          avgvis_miles: 9.0 + (Math.random() * 2 - 1),
          avgvis_km: 14.5 + (Math.random() * 3 - 1.5),
          avghumidity: 65 + (Math.random() * 10 - 5),
          daily_will_it_rain: Math.random() > 0.7 ? 1 : 0,
          daily_chance_of_rain: Math.random() > 0.7 ? Math.floor(Math.random() * 50) + 10 : 0,
          daily_will_it_snow: 0,
          daily_chance_of_snow: 0,
          condition: {
            text: ["Sunny", "Partly cloudy", "Cloudy", "Light rain", "Moderate rain"][Math.floor(Math.random() * 5)],
            icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
            code: 1003,
          },
          uv: 6.0 + (Math.random() * 2 - 1),
        },
        astro: {
          sunrise: "06:30 AM",
          sunset: "08:15 PM",
          moonrise: "09:45 PM",
          moonset: "07:20 AM",
          moon_phase: "Waxing Gibbous",
          moon_illumination: "75",
        },
        hour: Array(24)
          .fill(null)
          .map((_, hour) => ({
            time: `${date.toISOString().split("T")[0]} ${hour.toString().padStart(2, "0")}:00`,
            temp_c: 23.0 + (Math.random() * 10 - 5) + (hour > 6 && hour < 18 ? 5 : 0),
            temp_f: 73.4 + (Math.random() * 18 - 9) + (hour > 6 && hour < 18 ? 9 : 0),
            condition: {
              text: ["Sunny", "Partly cloudy", "Cloudy", "Light rain", "Moderate rain"][Math.floor(Math.random() * 5)],
              icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
              code: 1003,
            },
            wind_mph: 8.1 + (Math.random() * 6 - 3),
            wind_kph: 13.0 + (Math.random() * 10 - 5),
            wind_degree: 90 + (Math.random() * 40 - 20),
            wind_dir: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][Math.floor(Math.random() * 8)],
            pressure_mb: 1015.0 + (Math.random() * 10 - 5),
            pressure_in: 29.97 + (Math.random() * 0.3 - 0.15),
            precip_mm: Math.random() * 2,
            precip_in: Math.random() * 0.08,
            humidity: 65 + (Math.random() * 20 - 10),
            cloud: Math.floor(Math.random() * 100),
            feelslike_c: 23.0 + (Math.random() * 10 - 5) + (hour > 6 && hour < 18 ? 5 : 0),
            feelslike_f: 73.4 + (Math.random() * 18 - 9) + (hour > 6 && hour < 18 ? 9 : 0),
            windchill_c: 23.0 + (Math.random() * 5 - 2.5),
            windchill_f: 73.4 + (Math.random() * 9 - 4.5),
            heatindex_c: 25.0 + (Math.random() * 8 - 4),
            heatindex_f: 77.0 + (Math.random() * 14 - 7),
            dewpoint_c: 18.0 + (Math.random() * 4 - 2),
            dewpoint_f: 64.4 + (Math.random() * 7 - 3.5),
            will_it_rain: Math.random() > 0.8 ? 1 : 0,
            chance_of_rain: Math.random() > 0.8 ? Math.floor(Math.random() * 50) + 10 : 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 14.5 + (Math.random() * 3 - 1.5),
            vis_miles: 9.0 + (Math.random() * 2 - 1),
            gust_mph: 10.5 + (Math.random() * 8 - 4),
            gust_kph: 16.9 + (Math.random() * 13 - 6.5),
            uv: 6.0 + (Math.random() * 2 - 1),
          })),
      })
    }

    baseData.forecast = {
      forecastday: forecastDays,
    }

    // Add weather alerts
    baseData.alerts = {
      alert:
        Math.random() > 0.7
          ? [
              {
                headline: "Flood Watch for Orlando, FL",
                msgtype: "Alert",
                severity: "Moderate",
                urgency: "Expected",
                areas: "Orange County",
                category: "Met",
                certainty: "Likely",
                event: "Flood Watch",
                note: "Alert issued by the National Weather Service",
                effective: new Date().toISOString(),
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
                desc: "Heavy rainfall expected over the next 24 hours which may lead to flooding in low-lying areas.",
                instruction: "Monitor local weather reports and be prepared to take action if flooding occurs.",
              },
            ]
          : [],
    }
  }

  return baseData
}
