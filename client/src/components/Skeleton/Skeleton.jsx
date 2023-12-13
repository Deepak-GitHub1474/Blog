import "./Skeleton.css";

import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonComp() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulated data loading delay for demonstration
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Adjust as needed or replace with actual data fetching logic
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="skeleton-container">
        {isLoading && <div className="skeleton-card">
            <div className="name-edit-delete-container">
                <div className="user-container">
                    <Skeleton width={150} height={25} />
                    <Skeleton width={8} height={8} />
                </div>
                <Skeleton width={40} height={8} />
            </div>
            <div className="skeleton-card-cover">
                <Skeleton width={250} height={160} />
            </div>
            <div className="skeleton-card-title">
                <Skeleton height={25} />
            </div>
            <div className="skeleton-card-description">
                <Skeleton width={100} height={8} />
                <Skeleton width={60} height={8} />
                <Skeleton width={40} height={8} />
                <Skeleton width={60} height={8} />
                <Skeleton width={125} height={8} />
                <Skeleton width={80} height={8} />
                <Skeleton width={100} height={8} />
                <Skeleton width={60} height={8} />
                <Skeleton width={85} height={8} />
                <Skeleton width={60} height={8} />
                <Skeleton width={125} height={8} />
                <Skeleton width={40} height={8} />
                <Skeleton width={100} height={8} />
                <Skeleton width={60} height={8} />
                <Skeleton width={60} height={8} />
                <Skeleton width={60} height={8} />
                <Skeleton width={125} height={8} />
                <Skeleton width={40} height={8} />
                <Skeleton width={100} height={8} />
                <Skeleton width={60} height={8} />
            </div>
            <div className="skeleton-icons-container">
                <div className="skeleton-like-comment-share-container">
                    <Skeleton width={40} height={30} />
                    <Skeleton width={40} height={30} />
                    <Skeleton width={40} height={30} />
                </div>
                <Skeleton width={40} height={30} className="save-icon"/>
            </div>
            <div className="skeleton-read-btn">
                <Skeleton height={25} />
            </div>
        </div>}
    </div>
  );
}

export default SkeletonComp;
