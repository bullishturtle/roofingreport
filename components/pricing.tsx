import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "$99",
      description: "Perfect for single-family homes",
      features: [
        "Comprehensive roof inspection",
        "Detailed digital report",
        "1 year of report access",
        "Basic repair recommendations",
      ],
    },
    {
      name: "Premium",
      price: "$199",
      description: "Ideal for homeowners who want ongoing protection",
      features: [
        "Everything in Basic",
        "Priority scheduling",
        "3 years of report access",
        "Detailed repair cost estimates",
        "Annual reminder for follow-up inspections",
      ],
      popular: true,
    },
    {
      name: "Professional",
      price: "$499",
      description: "For property managers and real estate professionals",
      features: [
        "Everything in Premium",
        "Multiple property management",
        "Lifetime report access",
        "Dedicated account manager",
        "Custom reporting options",
        "Bulk inspection discounts",
      ],
    },
  ]

  return (
    <section id="pricing" className="bg-slate-50 py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Simple, Transparent Pricing</h2>
          <p className="mt-4 text-lg text-muted-foreground">Choose the plan that works for you</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Card key={index} className={`flex flex-col h-full ${plan.popular ? "border-primary shadow-lg" : ""}`}>
              {plan.popular && (
                <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                  {plan.price}
                  <span className="ml-1 text-xl font-medium text-muted-foreground">/inspection</span>
                </div>
                <CardDescription className="mt-4">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex">
                      <Check className="h-5 w-5 text-primary shrink-0" />
                      <span className="ml-3 text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
