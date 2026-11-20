"use client";

import { useState } from "react";
import type { ContactFormData } from "@/types/templates.types";
import { useDummySubmit } from "@/components/ui/useDummySubmit";
import { Icon } from "@/components/ui/Icon";
import { FormSuccess, Spinner } from "@/components/ui/FormSuccess";
import { buttonArrow, buttonArrowBox, buttonClass, buttonText } from "@/components/ui/buttonStyles";

/** White fields with a soft grey border and a gold icon in front of the text */
const fieldClass =
  "peer h-14 w-full rounded-[0.3rem] border-[0.1rem] border-[var(--color-border-field)] bg-[var(--color-white)] pl-[3.4rem] pr-4 font-sans text-[1.05rem] text-[var(--color-text-dark)] outline-none transition-colors placeholder:text-[var(--color-text-dark)] focus:border-[var(--color-gold-bright)] lg:h-[3.28rem] lg:pl-[4.13rem] lg:text-[1.22rem]";
const iconClass = "pointer-events-none absolute left-[0.9rem] size-[1.7rem] text-[var(--color-gold)] lg:left-[1.05rem] lg:size-[2.05rem]";

type FieldProps = { name: string; label: string; icon: string; type?: string; autoComplete?: string };

const Field = ({ name, label, icon, type = "text", autoComplete }: FieldProps) => (
  <label className="relative flex items-center">
    <Icon name={icon} className={iconClass} strokeWidth={1.5} />
    <input name={name} type={type} required placeholder={label} aria-label={label} autoComplete={autoComplete} className={fieldClass} />
  </label>
);

/** The check-in date: shows its label like the other fields, and the date picker once it is focused */
const DateField = ({ name, label, icon }: { name: string; label: string; icon: string }) => {
  const [picking, setPicking] = useState(false);
  return (
    <label className="relative flex items-center">
      <Icon name={icon} className={iconClass} strokeWidth={1.5} />
      <input
        name={name}
        type={picking ? "date" : "text"}
        placeholder={label}
        aria-label={label}
        onFocus={() => setPicking(true)}
        onBlur={(event) => setPicking(event.currentTarget.value !== "")}
        className={`${fieldClass} lg:!pl-[4.36rem]`}
      />
    </label>
  );
};

/** The message form; dummy submit, then a thank-you message in place of the send button */
export const ContactForm = ({ data }: { data?: ContactFormData }) => {
  const submit = useDummySubmit();
  if (!data) return null;
  const { fields, fieldIcons } = data;

  // remounting the form (via key) after each send clears every field
  return (
    <form key={submit.round} onSubmit={submit.onSubmit} onInput={submit.onInput} aria-busy={submit.sending} className="grid gap-x-[1.55rem] gap-y-4 sm:grid-cols-2 lg:gap-y-[1.31rem]">
      <Field name="name" label={fields.name} icon={fieldIcons.name} autoComplete="name" />
      <Field name="email" type="email" label={fields.email} icon={fieldIcons.email} autoComplete="email" />
      <Field name="phone" type="tel" label={fields.phone} icon={fieldIcons.phone} autoComplete="tel" />
      <DateField name="checkIn" label={fields.checkIn} icon={fieldIcons.checkIn} />
      <label className="relative block sm:col-span-2">
        <Icon name={fieldIcons.message} className={`${iconClass} top-[0.8rem] lg:top-[0.75rem]`} strokeWidth={1.5} />
        <textarea
          name="message"
          required
          rows={5}
          placeholder={fields.message}
          aria-label={fields.message}
          className={`${fieldClass} h-40 resize-none py-[0.9rem] lg:h-[9.05rem] lg:!pl-[4.45rem] lg:pt-[0.95rem]`}
        />
      </label>
      {submit.showMessage ? (
        <FormSuccess
          name={submit.name}
          title={data.successTitle}
          message={data.success}
          leaving={submit.status === "leaving"}
          visibleFor={submit.visibleFor}
          onClose={submit.dismiss}
          closeLabel={data.closeLabel}
          className="sm:col-span-2"
        />
      ) : (
        // navy with a gold border and the gold arrow box, like the hero button
        <button
          type="submit"
          disabled={submit.sending}
          className={`${buttonClass} disabled:cursor-wait disabled:opacity-80 sm:col-span-2 lg:h-[3.6rem]`}
        >
          <span className={`flex flex-1 justify-center gap-3 ${buttonText} text-[0.95rem] sm:text-[1.05rem] lg:text-[1.15rem]`}>
            {submit.sending && <Spinner className="size-5" />}
            {submit.sending ? data.sending : data.button}
          </span>
          <span className={`${buttonArrowBox} lg:w-[5.06rem]`}>
            <Icon name="LuArrowUpRight" className={buttonArrow} strokeWidth={2} />
          </span>
        </button>
      )}
    </form>
  );
};
