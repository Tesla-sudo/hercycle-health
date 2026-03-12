import hercycleLogo from "@/assets/hercycle-logo.png";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src={hercycleLogo} alt="HerCycle" className="h-6 w-6" />
              <span className="font-bold text-gradient">HerCycle</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered reproductive health insights accessible via WhatsApp and USSD.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Platform</h4>
            <div className="space-y-2">
              <Link to="/doctors" className="block text-sm text-muted-foreground hover:text-foreground">Doctor Dashboard</Link>
              <Link to="/maps" className="block text-sm text-muted-foreground hover:text-foreground">Health Map</Link>
              <Link to="/insights" className="block text-sm text-muted-foreground hover:text-foreground">Insights</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Integration</h4>
            <p className="text-sm text-muted-foreground">WhatsApp • USSD • FastAPI • Twilio</p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © 2026 HerCycle. Built for women's health equity.
        </div>
      </div>
    </footer>
  );
}
