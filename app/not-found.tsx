import { Heading1 } from "@/components/Heading1";
import { ParagraphS } from "@/components/ParagraphS";
import {
  StrokeButton,
  StrokeSplitIconInner,
  StrokeSplitLabel,
} from "@/components/StrokeButton";
import { Icon } from "@/components/phosphor_1";
import "./not-found.css";

const NOT_FOUND_BODY =
  "Whoops! It seems this page took a wrong turn somewhere in cyberspace. It's probably off asking for directions. In the meantime, why not explore elsewhere on our site? There are no lost pages there – we promise!";

export default function NotFound() {
  return (
    <main className="not-found" id="main-content">
      <div className="not-found__heading">
        <div className="not-found__stack">
          <Heading1 size="large" className="not-found__code">
            404
          </Heading1>
          <ParagraphS className="not-found__body">
            {NOT_FOUND_BODY}
          </ParagraphS>
        </div>
        <StrokeButton href="/" variant="split" tone="outline">
          <StrokeSplitLabel>Back to Home</StrokeSplitLabel>
          <span className="btn-stroke__icon">
            <StrokeSplitIconInner>
              <Icon
                name="ArrowUpRight"
                width={20}
                height={22}
                weight="regular"
                mirrored={false}
                color="currentColor"
                aria-hidden
              />
            </StrokeSplitIconInner>
          </span>
        </StrokeButton>
      </div>
    </main>
  );
}
