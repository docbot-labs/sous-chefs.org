import { useRouter } from "next/router";
import { DislikeButton, LikeButton, Provider } from "@doclabs/react";
import { ThumbsDown, ThumbsUp } from "./icons/thumbs";

export function Feedback() {
  const { route } = useRouter();

  return (
    <Provider
      siteId={process.env.NEXT_PUBLIC_DOCLABS_SITE_ID}
      identifier={{
        lvl1: route,
      }}
    >
      <div className="flex items-center justify-between bg-gray-50 p-8 rounded-lg">
        <div className="text-lg">Was this helpful?</div>
        <div className="flex items-center gap-3">
          <LikeButton className="active:scale-75 transition-all">
            <ThumbsUp className="h-6 w-6 hover:scale-125 transition-all hover:-rotate-6" />
          </LikeButton>
          <DislikeButton className="active:scale-75 transition-all">
            <ThumbsDown className="h-6 w-6 hover:scale-125 transition-all hover:rotate-6" />
          </DislikeButton>
        </div>
      </div>
    </Provider>
  );
}
