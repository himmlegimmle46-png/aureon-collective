import { GlowCard, PageTitle } from "@/components/ui";

export const metadata = {
  title: "Terms of Service • Aureon Collective",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
      <div className="text-sm font-semibold text-yellow-200">{title}</div>
      <div className="mt-2 text-sm text-white/70 leading-relaxed">{children}</div>
    </div>
  );
}

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="flex flex-col gap-6">
        <PageTitle title="Terms of Service" subtitle="Last updated: 2026-02-14" />

        <GlowCard className="p-6">
          <div className="text-sm text-white/70 leading-relaxed">
            These Terms of Service (“Terms”) govern your access to and use of Aureon Collective (“we”, “us”, “our”),
            including purchases made through this site. By using the site or placing an order, you agree to these Terms.
          </div>

          <div className="mt-6 grid gap-3">
            <Section title="1) What we provide">
              <p>
                We provide digital goods and/or services as described on product pages. Each listing may have its own
                requirements and delivery method (typically through Discord ticket support).
              </p>
            </Section>

            <Section title="2) Order IDs and verification">
              <p>
                You may be asked to generate an Order ID and include it in your payment note/memo where possible. Orders
                are fulfilled only after we can reasonably verify payment and match it to your order.
              </p>
            </Section>

            <Section title="3) Payments">
              <p>
                We may accept payments via Cash App and/or cryptocurrency (e.g., TRON/USDT) as shown on the Payment page.
                You are responsible for sending the correct amount, to the correct address, and for any network fees.
                Crypto transactions are irreversible.
              </p>
            </Section>

            <Section title="4) Refunds and chargebacks">
              <p>
                Because delivery may be digital and/or immediate, all sales are generally final once fulfillment begins.
                If you believe an error occurred (wrong amount, wrong address, duplicate payment), contact support in
                Discord as soon as possible. Unauthorized chargebacks or payment disputes may result in a permanent ban
                from service.
              </p>
            </Section>

            <Section title="5) Customer responsibilities">
              <p>
                You agree to provide accurate contact information and any required details for delivery. You are
                responsible for ensuring your purchase and use complies with any third-party rules, platform terms, or
                applicable law.
              </p>
            </Section>

            <Section title="6) Third-party platforms and disclaimers">
              <p>
                We are not affiliated with Roblox or any game developers. Third-party platforms may change rules,
                features, or enforcement at any time. We are not responsible for actions taken by third parties,
                including account restrictions, bans, rollbacks, or similar outcomes.
              </p>
            </Section>

            <Section title="7) Prohibited use">
              <p>
                You may not use this site for unlawful activity, fraud, or harassment. We may refuse service, cancel
                orders, or decline fulfillment if we reasonably suspect fraud or policy violations.
              </p>
            </Section>

            <Section title="8) Limitation of liability">
              <p>
                To the maximum extent permitted by law, we are not liable for indirect or consequential damages. Our
                total liability for any claim related to an order will not exceed the amount you paid for that specific
                order.
              </p>
            </Section>

            <Section title="9) Changes to these Terms">
              <p>We may update these Terms from time to time. Changes apply when posted to this page.</p>
            </Section>

            <Section title="10) Contact">
              <p>
                For support and disputes, contact us through the Discord link listed on the site’s Contact/Support
                sections.
              </p>
            </Section>
          </div>
        </GlowCard>
      </div>
    </div>
  );
}