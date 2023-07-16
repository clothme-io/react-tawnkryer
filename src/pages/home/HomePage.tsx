import { HomeFeatureComponent } from './components/homeFeatureComponent';
import { HomeHeroComponent } from './components/homeHeroComponent';

export function HomePage() {
  return (
    <div className="lg:max-w-screen-2xl mx-auto">
      <div className="mt-14 mb-20">
        <HomeHeroComponent />
      </div>
      <div className="mb-20">
        <HomeFeatureComponent />
      </div>
    </div>
  );
}
