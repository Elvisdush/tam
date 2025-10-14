import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="py-16 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Three columns layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Menu Column */}
          <div>
            <h3 className="text-muted-foreground text-sm font-display mb-4 tracking-wider">
              Menu
            </h3>
            <div className="space-y-3">
              <Link
                to="#work"
                className="block text-foreground hover:text-primary transition-smooth text-base font-display"
              >
                Work
              </Link>
              <Link
                to="#gallery"
                className="block text-foreground hover:text-primary transition-smooth text-base font-display"
              >
                Gallery
              </Link>
              <Link
                to="#services"
                className="block text-foreground hover:text-primary transition-smooth text-base font-display"
              >
                Services
              </Link>
            </div>
          </div>

          {/* Social Column */}
          <div>
            <h3 className="text-muted-foreground text-sm font-display mb-4 tracking-wider">
              Social
            </h3>
            <div className="space-y-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-foreground hover:text-primary transition-smooth text-base font-display"
              >
                Instagram
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-foreground hover:text-primary transition-smooth text-base font-display"
              >
                LinkedIn
              </a>
              <a
                href="https://vimeo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-foreground hover:text-primary transition-smooth text-base font-display"
              >
                Vimeo
              </a>
            </div>
          </div>

          {/* Business enquiries Column */}
          <div>
            <h3 className="text-muted-foreground text-sm font-display mb-4 tracking-wider">
              Business enquiries
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:hello@mitchellmullins.com"
                className="block text-foreground hover:text-primary transition-smooth text-base font-display"
              >
                hello@mitchellmullins.com
              </a>
              <div className="mt-6">
                <p className="text-muted-foreground text-sm font-display mb-2 tracking-wider">
                  Collaborations
                </p>
                <a
                  href="mailto:collab@mitchellmullins.com"
                  className="block text-foreground hover:text-primary transition-smooth text-base font-display"
                >
                  collab@mitchellmullins.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Large Logo */}
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display text-foreground tracking-tighter leading-none">
            Norf Cre8ions
            <span className="text-lg align-top ml-2">™</span>
          </h1>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-border/10 mt-16 pt-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p className="font-display">
              © {new Date().getFullYear()} Norf Cre8ions. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className="hover:text-foreground transition-smooth font-display"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="hover:text-foreground transition-smooth font-display"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
