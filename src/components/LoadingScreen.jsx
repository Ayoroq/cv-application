import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <h1 className="logo loading-logo">Vitae</h1>
        <DotLottieReact
          className="loading-animation"
          src="/src/assets/loading.lottie"
          autoplay
          loop
        />
      </div>
    </div>
  );
}