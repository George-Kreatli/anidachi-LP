"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Users, Share2, Chrome, Check, Volume2, Settings, Maximize, Search } from "lucide-react"

export function ChromeExtensionDemo() {
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showExtension, setShowExtension] = useState(false)
  const [watchroomCreated, setWatchroomCreated] = useState(false)
  const [friendsJoined, setFriendsJoined] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showDetectButton, setShowDetectButton] = useState(false)
  const [animeDetected, setAnimeDetected] = useState(false)
  const [showEpisodeList, setShowEpisodeList] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [episodesWatched, setEpisodesWatched] = useState(0)
  const [showNewMessagesPopup, setShowNewMessagesPopup] = useState(false)

  const steps = [
    "User logs into the app",
    "Clicks 'Detect Anime' button",
    "Creates a watchroom",
    "Marks episodes as watched",
    "Interacts with chat and reactions",
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < steps.length - 1) {
        setStep(step + 1)

        // Trigger specific animations based on step
        switch (step) {
          case 0:
            setTimeout(() => {
              setShowExtension(true)
            }, 500) // Reduced from 1000ms
            setTimeout(() => {
              setIsLoggedIn(true)
            }, 1500) // Reduced from 3000ms
            break
          case 1:
            setTimeout(() => {
              setShowDetectButton(true)
              setAnimeDetected(true)
            }, 800) // Reduced from 1500ms
            break
          case 2:
            setTimeout(() => setWatchroomCreated(true), 800) // Reduced from 1500ms
            break
          case 3:
            setTimeout(() => {
              setShowEpisodeList(true)
              setEpisodesWatched(1)
            }, 500) // Reduced from 1000ms
            setTimeout(() => setEpisodesWatched(2), 1000) // Reduced from 2000ms
            break
          case 4:
            setTimeout(() => {
              setShowChat(true)
              setIsPlaying(true)
            }, 500) // Reduced from 1000ms
            setTimeout(() => setShowNewMessagesPopup(true), 1000) // Reduced from 2000ms
            break
        }
      } else {
        // Reset animation after completion
        setTimeout(() => {
          setStep(0)
          setShowExtension(false)
          setWatchroomCreated(false)
          setIsLoggedIn(false)
          setShowDetectButton(false)
          setAnimeDetected(false)
          setShowEpisodeList(false)
          setShowChat(false)
          setShowNewMessagesPopup(false)
          setEpisodesWatched(0)
          setFriendsJoined(0)
          setIsPlaying(false)
        }, 1500) // Reduced from 3000ms
      }
    }, 2000) // Changed from 4000ms to 2000ms

    return () => clearTimeout(timer)
  }, [step])

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See It In Action</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Watch how seamlessly our Chrome extension integrates with Crunchyroll to create shared viewing experiences
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4 bg-gray-800/50 rounded-full px-6 py-3">
              {steps.map((stepName, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full transition-all duration-500 ${
                      index <= step ? "bg-purple-500" : "bg-gray-600"
                    }`}
                  />
                  {index < steps.length - 1 && (
                    <div
                      className={`w-8 h-0.5 mx-2 transition-all duration-500 ${
                        index < step ? "bg-purple-500" : "bg-gray-600"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mock Browser Window */}
          <div className="bg-gray-100 rounded-lg overflow-hidden shadow-2xl">
            {/* Browser Header */}
            <div className="bg-gray-200 px-4 py-3 flex items-center space-x-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 bg-white rounded px-3 py-1 mx-4 text-sm text-gray-600">
                https://crunchyroll.com/watch/attack-on-titan
              </div>
              <Chrome className="w-5 h-5 text-gray-600" />
            </div>

            {/* Mock Crunchyroll Interface */}
            <div className="relative bg-black aspect-video">
              {/* Video Player */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 to-red-900/20">
                <img
                  src="/placeholder.svg?height=400&width=800"
                  alt="Anime Episode"
                  className="w-full h-full object-cover opacity-80"
                />

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-4">
                      <Button
                        size="sm"
                        variant="ghost"
                        className={`text-white hover:bg-white/20 transition-all duration-300 ${
                          isPlaying ? "scale-110" : ""
                        }`}
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </Button>
                      <span className="text-sm">12:34 / 24:16</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Volume2 className="w-4 h-4" />
                      <Settings className="w-4 h-4" />
                      <Maximize className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-1 mt-2">
                    <div
                      className={`bg-orange-500 h-1 rounded-full transition-all duration-1000 ${
                        isPlaying ? "w-1/2" : "w-5/12"
                      }`}
                    ></div>
                  </div>
                </div>

                {/* Episode Info */}
                <div className="absolute top-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Attack on Titan</h3>
                  <p className="text-sm opacity-80">Season 4, Episode 16 - "Above and Below"</p>
                </div>
              </div>

              {/* Chrome Extension Overlay */}
              <div
                className={`absolute top-4 right-4 transition-all duration-700 transform ${
                  showExtension ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
                }`}
              >
                <Card className="w-80 bg-white/95 backdrop-blur-sm shadow-xl border-0">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Chrome className="w-4 h-4 text-purple-600" />
                        </div>
                        <CardTitle className="text-sm font-semibold text-gray-900">AnimeApp Extension</CardTitle>
                      </div>
                      {step >= 1 && animeDetected && (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                          Detected
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Login Interface - Step 0 */}
                    {step === 0 && (
                      <div className="space-y-3">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-3">Sign in to start watching together</p>
                          <Button className="w-full bg-purple-600 hover:bg-purple-700">
                            <Users className="w-4 h-4 mr-2" />
                            Login to AnimeApp
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Detect Anime Button - Step 1 */}
                    {step >= 1 && !animeDetected && (
                      <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setAnimeDetected(true)}>
                        <Search className="w-4 h-4 mr-2" />
                        Detect Anime
                      </Button>
                    )}

                    {/* Anime Detection Result - Step 1+ */}
                    {animeDetected && (
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-gray-900">Anime Detected</span>
                        </div>
                        <p className="text-xs text-gray-600">Attack on Titan S4E16</p>
                      </div>
                    )}

                    {/* Create Watchroom - Step 2 */}
                    {step >= 2 && animeDetected && (
                      <Button
                        className={`w-full transition-all duration-500 ${
                          watchroomCreated ? "bg-green-600 hover:bg-green-700" : "bg-purple-600 hover:bg-purple-700"
                        }`}
                      >
                        {watchroomCreated ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Watchroom Created!
                          </>
                        ) : (
                          <>
                            <Users className="w-4 h-4 mr-2" />
                            Create Watchroom
                          </>
                        )}
                      </Button>
                    )}

                    {/* Episode List - Step 3 */}
                    {step >= 3 && watchroomCreated && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-900">Mark Episodes Watched</h4>
                        <div className="space-y-1 max-h-32 overflow-y-auto">
                          {[
                            "S4E14 - Savagery",
                            "S4E15 - Sole Salvation",
                            "S4E16 - Above and Below",
                            "S4E17 - Judgment",
                          ].map((episode, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs"
                            >
                              <span>{episode}</span>
                              <Button
                                size="sm"
                                variant={index <= episodesWatched ? "default" : "outline"}
                                className="h-6 px-2"
                              >
                                {index <= episodesWatched ? <Check className="w-3 h-3" /> : "Mark"}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Chat Interface - Step 4 */}
                    {step >= 4 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">Watchroom Chat</span>
                          <Badge variant="secondary" className="text-xs">
                            3 online
                          </Badge>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3 max-h-32 overflow-y-auto space-y-2">
                          <div className="text-xs">
                            <span className="font-medium text-purple-600">Alex:</span>
                            <span className="ml-1">This episode is insane! 🤯</span>
                          </div>
                          <div className="text-xs">
                            <span className="font-medium text-blue-600">Sarah:</span>
                            <span className="ml-1">I can't believe what just happened</span>
                          </div>
                          <div className="text-xs">
                            <span className="font-medium text-green-600">You:</span>
                            <span className="ml-1">❤️ Best episode so far!</span>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1 h-8 text-xs bg-transparent">
                            😱 React
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 h-8 text-xs bg-transparent">
                            💬 Chat
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sync Notification */}
              {isPlaying && (
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce">
                  <div className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    🎬 Synced with {friendsJoined} friends
                  </div>
                </div>
              )}
            </div>

            {/* Step Description */}
            <div className="bg-gray-50 px-6 py-4 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Step {step + 1}: {steps[step]}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {step === 0 && "User logs into the main app through the extension while browsing Crunchyroll"}
                    {step === 1 && "User manually clicks the 'Detect Anime' button to scan the current page"}
                    {step === 2 && "After successful detection, user clicks 'Create a Watchroom' to start a session"}
                    {step === 3 && "User enters the watchroom and marks episodes as 'watched' to track progress"}
                    {step === 4 &&
                      "User opens chat, leaves reactions, and reads messages from friends in the watchroom"}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">{step + 1}</div>
                  <div className="text-xs text-gray-500">of {steps.length}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="bg-gray-800/50 border-gray-700 text-white">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Chrome className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Automatic Detection</h3>
                <p className="text-sm text-gray-300">Instantly recognizes anime content without manual input</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700 text-white">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">One-Click Setup</h3>
                <p className="text-sm text-gray-300">Create watchrooms instantly with a single click</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700 text-white">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Share2 className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Perfect Sync</h3>
                <p className="text-sm text-gray-300">Stay perfectly synchronized with all your friends</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
