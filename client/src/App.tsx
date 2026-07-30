import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "@/pages/Home";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import Accessibility from "@/pages/Accessibility";
import { StandardPage } from "@/components/StandardPage";
import { CityPage } from "@/components/CityPage";
import ServiceAreas from "@/pages/ServiceAreas";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/accessibility" component={Accessibility} />

      {/* Phase 1: Core product pages */}
      <Route path="/window-treatments">{() => <StandardPage pageKey="window-treatments" />}</Route>
      <Route path="/roller-shades">{() => <StandardPage pageKey="roller-shades" />}</Route>
      <Route path="/motorized-shades">{() => <StandardPage pageKey="motorized-shades" />}</Route>
      <Route path="/draperies-curtains">{() => <StandardPage pageKey="draperies-curtains" />}</Route>
      <Route path="/plantation-shutters">{() => <StandardPage pageKey="plantation-shutters" />}</Route>
      <Route path="/cellular-honeycomb-shades">{() => <StandardPage pageKey="cellular-honeycomb-shades" />}</Route>
      <Route path="/roman-shades">{() => <StandardPage pageKey="roman-shades" />}</Route>
      <Route path="/blinds">{() => <StandardPage pageKey="blinds" />}</Route>

      {/* Phase 2: Supporting pages */}
      <Route path="/wallpaper-interior-design">{() => <StandardPage pageKey="wallpaper-interior-design" />}</Route>
      <Route path="/commercial-window-treatments">{() => <StandardPage pageKey="commercial-window-treatments" />}</Route>
      <Route path="/about">{() => <StandardPage pageKey="about" />}</Route>
      <Route path="/visualizer">{() => <StandardPage pageKey="visualizer" />}</Route>
      <Route path="/window-treatment-repairs">{() => <StandardPage pageKey="window-treatment-repairs" />}</Route>

      {/* Service Areas hub */}
      <Route path="/service-areas" component={ServiceAreas} />

      {/* Phase 3: City pages */}
      <Route path="/locations/gulf-shores-al">{() => <CityPage pageKey="gulf-shores-al" />}</Route>
      <Route path="/locations/foley-al">{() => <CityPage pageKey="foley-al" />}</Route>
      <Route path="/locations/fairhope-al">{() => <CityPage pageKey="fairhope-al" />}</Route>
      <Route path="/locations/pensacola-fl">{() => <CityPage pageKey="pensacola-fl" />}</Route>
      <Route path="/locations/gulf-breeze-fl">{() => <CityPage pageKey="gulf-breeze-fl" />}</Route>
      <Route path="/locations/navarre-fl">{() => <CityPage pageKey="navarre-fl" />}</Route>

      {/* 404 */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
