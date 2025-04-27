import axios from "axios"

// Weather API types
export type WeatherData = {
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
}

// Get current weather for a location
export async function getCurrentWeather(location: string): Promise<WeatherData> {
  try {
    // In a real implementation, you would use your actual API key
    const apiKey = process.env.WEATHER_API_KEY || "demo_key"

    // For demo purposes, return mock data
    if (apiKey === "demo_key") {
      return getMockWeatherData(location)
    }

    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=no`,
    )

    return response.data
  } catch (error) {
    console.error("Error fetching weather data:", error)
    throw new Error("Failed to fetch weather data")
  }
}

// Get forecast weather for a location
export async function getForecastWeather(location: string, days = 3): Promise<WeatherData> {
  try {
    // In a real implementation, you would use your actual API key
    const apiKey = process.env.WEATHER_API_KEY || "demo_key"

    // For demo purposes, return mock data
    if (apiKey === "demo_key") {
      return getMockForecastData(location, days)
    }

    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(location)}&days=${days}&aqi=no&alerts=no`,
    )

    return response.data
  } catch (error) {
    console.error("Error fetching forecast data:", error)
    throw new Error("Failed to fetch forecast data")
  }
}

// Mock weather data for demo purposes
function getMockWeatherData(location: string): WeatherData {
  return {
    location: {
      name: location.split(",")[0] || "Orlando",
      region: "Florida",
      country: "United States of America",
      lat: 28.54,
      lon: -81.38,
    },
    current: {
      temp_f: 85.6,
      temp_c: 29.8,
      condition: {
        text: "Partly cloudy",
        icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
        code: 1003,
      },
      wind_mph: 8.1,
      wind_kph: 13.0,
      wind_degree: 90,
      wind_dir: "E",
      pressure_mb: 1015.0,
      pressure_in: 29.97,
      precip_mm: 0.0,
      precip_in: 0.0,
      humidity: 62,
      cloud: 25,
      feelslike_f: 92.1,
      feelslike_c: 33.4,
      vis_miles: 10.0,
      vis_km: 16.1,
      uv: 6.0,
      gust_mph: 10.5,
      gust_kph: 16.9,
    },
  }
}

// Mock forecast data for demo purposes
function getMockForecastData(location: string, days: number): WeatherData {
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

  return {
    location: {
      name: location.split(",")[0] || "Orlando",
      region: "Florida",
      country: "United States of America",
      lat: 28.54,
      lon: -81.38,
    },
    current: {
      temp_f: 85.6,
      temp_c: 29.8,
      condition: {
        text: "Partly cloudy",
        icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
        code: 1003,
      },
      wind_mph: 8.1,
      wind_kph: 13.0,
      wind_degree: 90,
      wind_dir: "E",
      pressure_mb: 1015.0,
      pressure_in: 29.97,
      precip_mm: 0.0,
      precip_in: 0.0,
      humidity: 62,
      cloud: 25,
      feelslike_f: 92.1,
      feelslike_c: 33.4,
      vis_miles: 10.0,
      vis_km: 16.1,
      uv: 6.0,
      gust_mph: 10.5,
      gust_kph: 16.9,
    },
    forecast: {
      forecastday: forecastDays,
    },
  }
}
