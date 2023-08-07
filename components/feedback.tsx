import { useRouter } from "next/router";
import { DislikeButton, LikeButton, Provider, Comments } from "@doclabs/react";
import { ThumbsDown, ThumbsUp } from "./icons/thumbs";
import { PropsWithChildren, useCallback, useState } from "react";

function Wrapper({ children }: PropsWithChildren) {
  const { route } = useRouter();

  return (
    <Provider
      siteId={process.env.NEXT_PUBLIC_DOCLABS_SITE_ID}
      identifier={{
        lvl1: route,
      }}
    >
      <div className="flex items-center justify-between bg-gray-50 p-8 rounded-lg">
        {children}
      </div>
    </Provider>
  );
}

export function Feedback() {
  const [step, setStep] = useState(0);
  const handleSuccess = useCallback(() => {
    setStep((step) => step + 1);
  }, []);

  if (step === 0) {
    return (
      <Wrapper>
        <div className="text-lg">Was this helpful?</div>
        <div className="flex items-center gap-3">
          <LikeButton
            onSuccess={handleSuccess}
            className="active:scale-75 transition-all"
          >
            <ThumbsUp className="h-6 w-6 hover:scale-125 transition-all hover:-rotate-6" />
          </LikeButton>
          <DislikeButton
            onSuccess={handleSuccess}
            className="active:scale-75 transition-all"
          >
            <ThumbsDown className="h-6 w-6 hover:scale-125 transition-all hover:rotate-6" />
          </DislikeButton>
        </div>
      </Wrapper>
    );
  }

  if (step === 1) {
    return (
      <Wrapper>
        <Comments
          onSuccess={handleSuccess}
          className="w-full flex flex-row items-stretch gap-4"
        >
          <Comments.Input
            className="flex-1 rounded p-2 border border-gray-700"
            placeholder="Your feedback..."
          />
          <button className="px-2 py-1 bg-gray-700 text-white hover:bg-gray-800 transition-colors text-lg rounded">
            Submit
          </button>
        </Comments>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="text-lg w-full text-center">Thank you 😊</div>
    </Wrapper>
  );
}
