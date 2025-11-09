import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <h1 className="logo loading-logo">Vitae</h1>
        <Lottie
          className="loading-animation"
          animationData={loadingAnimation}
          loop
        />
      </div>
    </div>
  );
}