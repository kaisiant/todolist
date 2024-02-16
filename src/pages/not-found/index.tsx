import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/common";
import { AUTO_REDIRECT_DELAY } from "@/constants";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [remainingSecs, setRemainingSecs] = useState(AUTO_REDIRECT_DELAY);
  const intervalTimerRef = useRef<number>();

  const handleBackToHome = () => navigate("/", { replace: true });

  useEffect(() => {
    intervalTimerRef.current = setInterval(() => {
      setRemainingSecs((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(intervalTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!remainingSecs) {
      clearInterval(intervalTimerRef.current);
      handleBackToHome();
    }
  }, [remainingSecs]);

  return (
    <div className="my-40 grid place-items-center">
      <div className="mb-20">
        <h1 className="text-3xl">Page Not Found</h1>
      </div>
      <Button onClick={handleBackToHome}>
        Back to Home in ({remainingSecs})
      </Button>
    </div>
  );
};

export default NotFoundPage;
