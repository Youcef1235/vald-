"use client"

import Image from "next/image"
import { Menu, Instagram, Youtube, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TiktokIcon } from "@/components/icons/tiktok-icon"
import { useEffect, useState } from "react"
import { getConcerts } from "./services/concerts"
import { Concert } from "./types/concert"
import { Skeleton } from "@/components/ui/skeleton"

export default function HomePage() {
  const [concerts, setConcerts] = useState<Concert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const concertData = await getConcerts()
        // Sort concerts by date (newest first)
        const sortedConcerts = concertData.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        setConcerts(sortedConcerts)
      } catch (err) {
        console.error("Error fetching concerts:", err)
        setError("Failed to load concerts. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchConcerts()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Skull border at top */}
      <div className="h-16 w-full relative">
        <Image
          src="/images/skull-border.jpeg"
          alt="Skull border decoration"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Header */}
      <header className="flex justify-between items-center p-4 relative z-20">
        <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
          <Menu className="h-6 w-6" />
        </Button>
        <div className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold">LOGO</div>
      </header>

      {/* Main content */}
      <main className="px-4 py-8 relative z-10">
        <div className="flex flex-row gap-4 items-start">
          {/* Artist section */}
          <div className="flex-shrink-0">
            <div className="relative w-48 h-64">
              {/* Red neon outline effect */}
              <div className="absolute inset-0 border-2 border-red-500 rounded-full blur-sm opacity-80"></div>
              <div className="absolute inset-1 border border-red-400 rounded-full"></div>

              {/* Artist placeholder */}
              <div className="relative w-full h-full rounded-full bg-gradient-to-b from-gray-800 to-black overflow-hidden flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-32 bg-gray-700 rounded-t-full mx-auto mb-2 relative">
                    <div className="w-12 h-12 bg-gray-600 rounded-full mx-auto mb-1"></div>
                    <div className="w-8 h-2 bg-black rounded-full mx-auto absolute top-4 left-1/2 transform -translate-x-1/2"></div>
                    <div className="w-16 h-20 bg-gray-800 mx-auto rounded-t-lg"></div>
                  </div>
                  <div className="w-2 h-8 bg-gray-400 mx-auto rounded-full"></div>
                  <div className="w-4 h-4 bg-gray-500 mx-auto rounded-full -mt-1"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Concerts list */}
          <div className="flex-1 space-y-2">
            {loading ? (
              Array(4).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full bg-gray-800 rounded-lg" />
              ))
            ) : error ? (
              <div className="text-red-500 p-4 bg-gray-900 rounded-lg">
                {error}
                <Button 
                  variant="outline" 
                  className="mt-2 text-white"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </Button>
              </div>
            ) : (
              concerts.map((concert) => (
                <div
                  key={concert.id}
                  className="border border-gray-600 rounded-lg p-2 bg-black/80 backdrop-blur-sm relative overflow-hidden hover:border-red-500 transition-colors duration-300"
                >
                  <div className="absolute top-0 right-0 w-16 h-full pointer-events-none z-0">
                    <Image
                      src="/images/smoke-effect.png"
                      alt="Smoke effect"
                      fill
                      className="object-cover opacity-25"
                    />
                  </div>

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="text-sm font-bold text-white">{concert.venue}</h3>
                        {concert.location && (
                          <div className="text-xs text-gray-300">{concert.location}</div>
                        )}
                      </div>
                      <div className="text-white font-mono text-xs whitespace-nowrap ml-2">
                        {new Date(concert.date).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                    {concert.description && (
                      <p className="text-gray-400 text-xs leading-tight">{concert.description}</p>
                    )}
                    {concert.ticketLink && (
                      <a 
                        href={concert.ticketLink} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full transition-colors"
                      >
                        Get Tickets
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Ticket section */}
        <div className="mt-12 flex justify-center">
          <div className="relative">
            <Image
              src="/images/hell-ticket.png"
              alt="Hell Admit One Ticket"
              width={320}
              height={180}
              className="object-contain"
            />
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="text-white font-bold text-xl tracking-wider" style={{ fontFamily: "serif" }}>
                Pandemonium Way
              </div>
            </div>
          </div>
        </div>

        {/* Tracklist section */}
        <div className="mt-24 pt-12">
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-wider" style={{ fontFamily: "serif" }}>
              PANDEMONIUM
            </h1>
            <h2 className="text-2xl md:text-3xl font-light tracking-[0.3em] text-gray-300">TRACKLIST</h2>
          </div>

          {/* Tracks grid */}
          <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              { title: "DIEU MERCI", image: "/images/tracks/dieu-merci.jpeg", available: true },
              // ... other tracks
            ].map((track, index) => (
              <TrackCard key={index} track={track} />
            ))}
          </div>
        </div>

        {/* Merch/Vinyl Section */}
        <div className="mt-24 pt-12 border-t border-gray-800">
          <div className="flex flex-row items-center justify-center gap-4 max-w-4xl mx-auto px-4">
            <div className="w-3/5 flex-shrink-0 flex justify-center">
              <Image
                src="/images/vinyl.png"
                alt="Pandemonium Vinyl/CD"
                width={300}
                height={300}
                className="object-contain rounded-lg"
              />
            </div>
            <div className="w-2/5 text-left">
              <h2 className="text-base font-bold uppercase tracking-wider text-white">Exclusive Vinyl</h2>
              <p className="mt-2 text-xs text-gray-400">
                Limited edition Pandemonium vinyl with bonus content. Includes digital download and exclusive artwork.
              </p>
              <div className="mt-4">
                <a 
                  href="#" 
                  className="inline-block transition-transform hover:scale-110"
                >
                  <Image
                    src="/images/buy-now.png"
                    alt="Buy It button"
                    width={90}
                    height={45}
                    className="object-contain"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

// Component for individual track cards
function TrackCard({ track }: { track: { title: string; image: string; available: boolean } }) {
  return (
    <div className="relative group cursor-pointer transition-all duration-300 hover:scale-105">
      <div className="relative aspect-[2/1] overflow-hidden rounded-lg bg-gray-900">
        <Image
          src={track.image}
          alt={`${track.title} cover`}
          fill
          className="object-cover transition-all duration-300 group-hover:brightness-75"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-white font-bold text-xl md:text-2xl text-center px-4 drop-shadow-lg">
            {track.title}
          </h3>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-red-600 rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
            <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Extracted Footer component
function Footer() {
  return (
    <footer className="relative overflow-hidden w-full border-t border-gray-800 py-12 mt-16">
      <Image src="/images/footer-background.jpeg" alt="Footer background" fill className="object-cover z-0" />
      <div className="absolute inset-0 bg-black/70 z-0" />
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <FooterSection 
            title="VALD" 
            links={[
              { label: "About", href: "#" },
              { label: "Services", href: "#" },
              { label: "Privacy Policy", href: "#" }
            ]} 
          />
          <FooterSection 
            title="Information" 
            links={[
              { label: "FAQ", href: "#" },
              { label: "Contact", href: "#" },
              { label: "Venues", href: "#" }
            ]} 
          />
        </div>
        <SocialLinks />
      </div>
    </footer>
  )
}

function FooterSection({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="col-span-1">
      <h3 className="font-bold text-white uppercase tracking-wider mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link, i) => (
          <li key={i}>
            <a href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SocialLinks() {
  return (
    <div className="flex justify-center gap-6">
      <SocialIcon 
        href="https://www.youtube.com/channel/UC4__f_3-i_i0G3gS5B-bBwA" 
        icon={<Youtube className="h-6 w-6" />} 
        label="YouTube"
      />
      <SocialIcon 
        href="https://www.tiktok.com/@valdsued" 
        icon={<TiktokIcon className="h-6 w-6" />} 
        label="TikTok"
      />
      <SocialIcon 
        href="https://twitter.com/vald_ld" 
        icon={<X className="h-6 w-6" />} 
        label="X"
      />
      <SocialIcon 
        href="https://www.instagram.com/valdsued/" 
        icon={<Instagram className="h-6 w-6" />} 
        label="Instagram"
      />
    </div>
  )
}

function SocialIcon({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="bg-white text-black p-2 rounded-full hover:bg-gray-300 transition-colors"
    >
      {icon}
    </a>
  )
}