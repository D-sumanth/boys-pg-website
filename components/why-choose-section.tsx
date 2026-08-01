import { ArrowUpDown, BusFront, KeyRound, ShieldCheck, UtensilsCrossed, UserRoundCheck } from "lucide-react"

const reasons = [
  {
    icon: ShieldCheck,
    text: "Clean and disciplined boys PG with CCTV security in key areas",
  },
  {
    icon: UtensilsCrossed,
    text: "Homely food with breakfast, lunch and dinner included",
  },
  {
    icon: KeyRound,
    text: "Attached washrooms, personal lockers and almirah storage",
  },
  {
    icon: ArrowUpDown,
    text: "Lift access, drinking water filters and hot water support",
  },
  {
    icon: BusFront,
    text: "Transport support available at reasonable prices",
  },
  {
    icon: UserRoundCheck,
    text: "Managed by an on-site hostel in-charge for daily support",
  },
]

export function WhyChooseSection() {
  return (
    <section className="relative overflow-hidden bg-primary py-14 text-primary-foreground md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid text-primary-foreground/8" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-16 top-10 size-72 rounded-full bg-accent/15 blur-3xl" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl sm:mx-auto sm:text-center">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-accent sm:text-sm">
            For Parents
          </span>
          <h2 className="mt-2 text-balance font-heading text-2xl font-bold leading-tight sm:text-3xl">
            Why parents prefer Prince Deluxe PG
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
          {reasons.map((reason) => (
            <div
              key={reason.text}
              className="flex min-h-40 flex-col items-start gap-3 rounded-xl border border-primary-foreground/10 bg-primary-foreground/10 p-4 shadow-sm backdrop-blur sm:min-h-0 sm:flex-row sm:rounded-2xl sm:p-5"
            >
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <reason.icon className="size-5" />
              </span>
              <p className="text-xs leading-5 text-primary-foreground/90 sm:text-sm sm:leading-relaxed">
                {reason.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
