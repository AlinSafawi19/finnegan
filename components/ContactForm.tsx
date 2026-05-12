"use client";

import {
  type FormEvent,
  type FormHTMLAttributes,
  useCallback,
  useRef,
  useState,
} from "react";

type SubmitStatus = "idle" | "loading" | "success" | "error";

export function ContactForm({
  className,
  onInput: formOnInput,
  ...formProps
}: FormHTMLAttributes<HTMLFormElement>) {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [formValid, setFormValid] = useState(false);
  const submittingRef = useRef(false);

  const syncValidity = useCallback((form: HTMLFormElement | null) => {
    if (!form) return;
    setFormValid(form.checkValidity());
  }, []);

  const handleInvalid = useCallback(() => {
    setFormValid(false);
  }, []);

  const handleInput: FormHTMLAttributes<HTMLFormElement>["onInput"] = (e) => {
    formOnInput?.(e);
    const form = e.currentTarget;
    if (form instanceof HTMLFormElement) {
      syncValidity(form);
      setStatus((s) => (s === "error" ? "idle" : s));
    }
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity() || submittingRef.current) return;

    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    submittingRef.current = true;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  }

  const disabled = !formValid || status === "loading";

  const stateAttr =
    status === "loading"
      ? "loading"
      : status === "success"
        ? "success"
        : status === "error"
          ? "error"
          : "idle";

  return (
    <form
      {...formProps}
      className={className}
      onSubmit={handleSubmit}
      onInput={handleInput}
      ref={(el) => {
        syncValidity(el);
      }}
    >
      <input
        className="contact-page__input"
        type="text"
        name="name"
        placeholder="Name"
        autoComplete="name"
        required
        onInvalid={handleInvalid}
      />
      <div className="contact-page__field-row">
        <input
          className="contact-page__input"
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          required
          onInvalid={handleInvalid}
        />
        <input
          className="contact-page__input"
          type="tel"
          name="phone"
          placeholder="Phone"
          autoComplete="tel"
          onInvalid={handleInvalid}
        />
      </div>
      <textarea
        className="contact-page__textarea"
        name="message"
        placeholder="Enter your Messsage"
        rows={4}
        required
        onInvalid={handleInvalid}
      />
      <div className="contact-page__submit-wrap">
        <button
          type="submit"
          className="contact-page__submit"
          data-state={stateAttr}
          disabled={disabled}
          {...(status === "loading" ? { "aria-busy": true as const } : {})}
        >
          {status === "loading" ? (
            <>
              <span className="contact-page__submit-spinner" aria-hidden />
              <span className="contact-page__sr-only">Sending</span>
            </>
          ) : status === "success" ? (
            <span className="contact-page__submit-label">Thank you</span>
          ) : status === "error" ? (
            <span className="contact-page__submit-label contact-page__submit-label--error">
              Something went wrong
            </span>
          ) : (
            <span className="contact-page__submit-label">Submit</span>
          )}
        </button>
      </div>
    </form>
  );
}
