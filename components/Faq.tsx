"use client";

import {
  useCallback,
  useId,
  useState,
  type KeyboardEvent,
} from "react";
import { Body3 } from "@/components/Body3";
import { ParagraphS } from "@/components/ParagraphS";
import { Icon } from "@/components/phosphor_1";
import { FAQ_ITEMS, type FaqEntry } from "@/data/faq";

function FaqSingle({ item }: { item: FaqEntry }) {
  const baseId = useId();
  const contentId = `${baseId}-content`;
  const questionId = `${baseId}-question`;
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  const onKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  }, [toggle]);

  return (
    <div
      role="button"
      tabIndex={0}
      className={`faq__single${open ? " faq__single--open" : ""}`}
      data-open={open ? "true" : "false"}
      aria-expanded={open}
      aria-controls={contentId}
      aria-labelledby={questionId}
      onClick={toggle}
      onKeyDown={onKeyDown}
    >
      <div className="faq__stack faq__stack--header">
        <Body3 id={questionId} className="faq__q" size="large">
          {item.question}
        </Body3>
        <span className="faq__icon-shell" aria-hidden>
          <Icon
            name="X"
            width={14}
            height={14}
            weight="regular"
            mirrored={false}
            className="faq__icon"
            color="currentColor"
            aria-hidden
          />
        </span>
      </div>
      <div
        id={contentId}
        className="faq__single-body"
        data-open={open ? "true" : "false"}
      >
        <div className="faq__single-body-inner" aria-hidden={!open}>
          <div className="faq__stack faq__stack--answer">
            <ParagraphS className="faq__a">{item.answer}</ParagraphS>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <section
      id="faq"
      className="faq"
      aria-labelledby="faq-heading"
    >
      <div className="faq__container">
        <div className="faq__heading-spacer" aria-hidden />
        <div className="faq__heading-wrap">
          <h2 id="faq-heading" className="faq__headline">
            <span className="heading-2-l faq__title-l">FAQ Frenzy:</span>
            <span className="heading-2-s faq__title-s">
              All your answers here
            </span>
          </h2>
        </div>
        <div className="faq__wrapper">
          {FAQ_ITEMS.map((item) => (
            <FaqSingle key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
