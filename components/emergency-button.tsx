"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Phone, MessageSquare, MapPin } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function EmergencyButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  const handleEmergencyCall = () => {
    setIsConnecting(true)
    // Simulate emergency call connection
    setTimeout(() => {
      setIsConnecting(false)
      setIsOpen(false)
      // In real implementation, this would connect to emergency services
      alert("Emergency services contacted. Help is on the way.")
    }, 2000)
  }

  const emergencyContacts = [
    { name: "Emergency Hotline", number: "911", icon: Phone },
    { name: "Crisis Text Line", number: "741741", icon: MessageSquare },
    { name: "Mental Health Crisis", number: "988", icon: Phone },
  ]

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-red-600 hover:bg-red-700 text-white shadow-lg rounded-full w-14 h-14 p-0 animate-pulse"
        size="lg"
      >
        <AlertTriangle className="h-6 w-6" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Emergency Support
            </DialogTitle>
            <DialogDescription>
              If you're in immediate danger or having thoughts of self-harm, please reach out for help immediately.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h3 className="font-semibold text-red-800 mb-2">Immediate Crisis Support</h3>
              <Button
                onClick={handleEmergencyCall}
                disabled={isConnecting}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                {isConnecting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Connecting...
                  </>
                ) : (
                  <>
                    <Phone className="h-4 w-4 mr-2" />
                    Connect to Crisis Counselor
                  </>
                )}
              </Button>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">Emergency Contacts</h3>
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <contact.icon className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium">{contact.name}</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => window.open(`tel:${contact.number}`)}>
                    {contact.number}
                  </Button>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span className="font-semibold text-blue-800">Find Nearby Help</span>
              </div>
              <Button
                variant="outline"
                className="w-full border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent"
                onClick={() => {
                  // In real implementation, this would open maps with nearby mental health facilities
                  window.open("https://maps.google.com/search/mental+health+crisis+center+near+me")
                }}
              >
                Locate Crisis Centers
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
