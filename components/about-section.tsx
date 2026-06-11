import Image from "next/image"

export function AboutSection() {
  return (
    <section id="about" className="bg-secondary py-14 md:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
          {/* Replace /images/room.png with your real room photo */}
          <Image
            src="/images/room.png"
            alt="Clean shared room at Prince Deluxe PG for Boys"
            width={640}
            height={460}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            About Us
          </span>
          <h2 className="text-balance font-heading text-2xl font-bold text-primary sm:text-3xl">
            A safe, clean and homely boys hostel in Shamshabad
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Prince Deluxe PG for Boys is a newly opening boys hostel in Shamshabad,
            designed for students and working professionals looking for safe, clean
            and convenient accommodation. Located near Commissioner of Police,
            Shamshabad Zone, the hostel provides comfortable 3-sharing and 4-sharing
            rooms with food, Wi-Fi, CCTV, housekeeping and essential facilities.
          </p>
          <ul className="grid grid-cols-2 gap-3 pt-2">
            {[
              "Family-managed",
              "No brokerage",
              "Disciplined environment",
              "Hygienic homely food",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <span className="size-1.5 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
