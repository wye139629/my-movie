"use client";

import { useState } from "react";

type MovieDetailsProps = {
  introContent: React.ReactElement;
  videosContent: React.ReactElement;
  reviewsContent: React.ReactElement;
};

type TabLabel = "intro" | "videos" | "reviews";

export default function MovieDetails({
  introContent,
  videosContent,
  reviewsContent,
}: MovieDetailsProps) {
  const [currentTab, setCurrentTab] = useState<TabLabel>("intro");
  const isIntroActive = currentTab === "intro";
  const isVideosActive = currentTab === "videos";
  const isReviewsActive = currentTab === "reviews";

  function handleTabSwitch(tabLabel: TabLabel) {
    setCurrentTab(tabLabel);
  }

  return (
    <section>
      <div className="text-sm font-medium text-center text-white border-b border-white mb-4">
        <ul className="flex" data-tabs-toggle="#tabContent">
          <li className="mr-2">
            <button
              data-tabs-target="#intro"
              className={`movie-tab-link ${isIntroActive && "border-white"}`}
              onClick={() => handleTabSwitch("intro")}
            >
              Intro
            </button>
          </li>
          <li className="mr-2">
            <button
              data-tabs-target="#reviews"
              className={`movie-tab-link ${isReviewsActive && "border-white"}`}
              onClick={() => handleTabSwitch("reviews")}
            >
              Reviews
            </button>
          </li>
          {/* 
          <li className="mr-2">
            <button
              data-tabs-target="#videos"
              className={`movie-tab-link ${isVideosActive && "border-white"}`}
              onClick={() => handleTabSwitch("videos")}
            >
              Videos
            </button>
          </li>
               */}
        </ul>
      </div>
      <div>
        <div
          className={`${isIntroActive ? "block" : "hidden"}`}
          id="intro"
          role="tabpanel"
        >
          {introContent}
        </div>
        <div
          className={`${isReviewsActive ? "block" : "hidden"}`}
          id="reviews"
          role="tabpanel"
        >
          {reviewsContent}
        </div>
        <div
          className={`${isVideosActive ? "block" : "hidden"}`}
          id="videos"
          role="tabpanel"
        >
          {videosContent}
        </div>
      </div>
    </section>
  );
}
