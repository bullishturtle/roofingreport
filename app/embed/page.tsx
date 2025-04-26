import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code } from "lucide-react"

export default function EmbedPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-black to-blue-950">
      <header className="container flex h-16 items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center shadow-glow">
            <span className="text-xl font-bold text-black">R</span>
          </div>
          <span className="text-xl font-bold text-white">Roofus API & Widget Integration</span>
        </div>
      </header>

      <main className="container flex-1 py-10">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">Integrate Roofus Into Your Platform</h1>
            <p className="text-gray-400">
              Easily embed Roofus data and functionality into your CRM, website, or application.
            </p>
          </div>

          <Tabs defaultValue="widget">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="widget">Widget Embed</TabsTrigger>
              <TabsTrigger value="api">API Integration</TabsTrigger>
            </TabsList>

            <TabsContent value="widget" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Embed Roofus Widget</CardTitle>
                  <CardDescription>
                    Drop this code into your website or CRM to display the Roofus widget.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md bg-slate-950 p-4">
                      <pre className="text-sm text-gray-300">
                        <code>{`<iframe 
  src="https://roofus.ai/embed/widget?apiKey=YOUR_API_KEY" 
  width="100%" 
  height="600" 
  frameborder="0"
></iframe>`}</code>
                      </pre>
                    </div>
                    <Button className="gap-2">
                      <Code size={16} />
                      Copy Embed Code
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>React Component</CardTitle>
                  <CardDescription>For React applications, use our component library.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md bg-slate-950 p-4">
                      <pre className="text-sm text-gray-300">
                        <code>{`// Install the package
npm install @roofus/react-components

// Import and use the component
import { RoofusWidget } from '@roofus/react-components';

function MyApp() {
  return (
    <RoofusWidget 
      apiKey="YOUR_API_KEY"
      address="123 Main St"
      theme="dark"
    />
  );
}`}</code>
                      </pre>
                    </div>
                    <Button className="gap-2">
                      <Code size={16} />
                      Copy Code
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="rounded-lg border border-gray-800 p-6">
                <h3 className="mb-4 text-xl font-bold text-white">Widget Preview</h3>
                <div className="aspect-video rounded-lg bg-slate-900 flex items-center justify-center">
                  <p className="text-gray-400">Widget preview would appear here</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="api" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>API Documentation</CardTitle>
                  <CardDescription>Access Roofus data directly through our RESTful API.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">Authentication</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        All API requests require an API key passed in the header.
                      </p>
                      <div className="mt-2 rounded-md bg-slate-950 p-3">
                        <code className="text-sm text-gray-300">Authorization: Bearer YOUR_API_KEY</code>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium">Endpoints</h3>
                      <div className="mt-2 space-y-3">
                        <div className="rounded-md bg-slate-950 p-3">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 text-xs font-medium rounded bg-green-900 text-green-300">
                              GET
                            </span>
                            <code className="text-sm text-gray-300">/api/weather?address=123+Main+St</code>
                          </div>
                        </div>
                        <div className="rounded-md bg-slate-950 p-3">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 text-xs font-medium rounded bg-green-900 text-green-300">
                              GET
                            </span>
                            <code className="text-sm text-gray-300">/api/measure?address=123+Main+St</code>
                          </div>
                        </div>
                        <div className="rounded-md bg-slate-950 p-3">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 text-xs font-medium rounded bg-blue-900 text-blue-300">
                              POST
                            </span>
                            <code className="text-sm text-gray-300">/api/quote</code>
                          </div>
                        </div>
                        <div className="rounded-md bg-slate-950 p-3">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 text-xs font-medium rounded bg-blue-900 text-blue-300">
                              POST
                            </span>
                            <code className="text-sm text-gray-300">/api/docs/generate</code>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button className="gap-2">
                      <Code size={16} />
                      View Full API Documentation
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>Manage your API keys for integration.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-md border border-gray-800 p-3">
                      <div>
                        <p className="font-medium text-white">Production Key</p>
                        <p className="text-sm text-gray-400">Last used: 2 hours ago</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Reveal Key
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-md border border-gray-800 p-3">
                      <div>
                        <p className="font-medium text-white">Development Key</p>
                        <p className="text-sm text-gray-400">Last used: 5 days ago</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Reveal Key
                      </Button>
                    </div>
                    <Button>Generate New API Key</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
