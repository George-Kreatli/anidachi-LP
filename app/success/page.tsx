import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Thanks for subscribing to AniDachi!
          </CardTitle>
          <CardDescription className="text-lg">
            I am still building the app, so you will not be able to use it yet.
            If you want to cancel your subscription, write me a short email at{" "}
            <a
              href="mailto:goshan.tolochko@gmail.com"
              className="text-blue-500 underline"
            >
              goshan.tolochko@gmail.com
            </a>
            . I will cancel your subscription and refund you the money.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Button asChild className="h-12">
              <Link href="/">Sure, I&apos;ll wait!</Link>
            </Button>
            <Button variant="outline" asChild className="h-12 bg-transparent">
              <Link href="/">I want to cancel</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
