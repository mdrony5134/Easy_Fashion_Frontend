import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:py-24 max-w-4xl">
      <div className="text-center mb-12 border-b border-border pb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
          <Shield className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4 text-foreground">
          Privacy Policy
        </h1>
        <p className="text-lg text-muted-foreground">
          Last updated: August 8, 2026
        </p>
      </div>

      <div className="space-y-10 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
          <p>
            Welcome to EASY Fashion. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">2. The Data We Collect About You</h2>
          <p className="mb-4">
            Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul className="list-disc pl-6 space-y-2 marker:text-primary">
            <li><strong className="text-foreground">Identity Data</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong className="text-foreground">Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
            <li><strong className="text-foreground">Financial Data</strong> includes payment card details (processed securely by our payment providers).</li>
            <li><strong className="text-foreground">Transaction Data</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Personal Data</h2>
          <p className="mb-4">
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2 marker:text-primary">
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal obligation.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">5. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at:
            <br />
            <br />
            <strong className="text-foreground">Email:</strong> support@easyfashion.com
            <br />
            <strong className="text-foreground">Address:</strong> 123 Fashion Ave, Style City, SC 12345
          </p>
        </section>
      </div>
    </div>
  );
}
