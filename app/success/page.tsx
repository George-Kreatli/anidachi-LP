import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Chrome } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Welcome to AnimeApp!</CardTitle>
          <CardDescription className="text-lg">
            Your subscription has been activated successfully. Start your anime journey now!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Button asChild className="h-12">
              <Link href="/app">
                <Download className="mr-2 h-4 w-4" />
                Launch App
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-12 bg-transparent">
              <Link href="/extension">
                <Chrome className="mr-2 h-4 w-4" />
                Get Extension
              </Link>
            </Button>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Next Steps:</h3>
            <ul className="text-blue-800 space-y-1 text-sm">
              <li>• Download and install the Chrome extension</li>
              <li>• Create your first watchroom</li>
              <li>• Invite friends to join your anime sessions</li>
              <li>• Explore our extensive anime library</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
