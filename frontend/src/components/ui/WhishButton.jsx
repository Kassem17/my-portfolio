import React from "react";

/**
 * WhishDonateButton – renders a "Support Me" button that opens a Whish Money payment link.
 *
 * The public channel ID is taken from the environment variable REACT_APP_WHISH_CHANNEL_ID.
 * Whish expects a URL of the form:
 *   https://pay.whish.money/link/<CHANNEL_ID>?ref=portfolio
 * (you can add an `amount` query param if you want a fixed amount).
 *
 * The component can receive optional `label`, `amount`, and `className` props.
 */
export default function WhishDonateButton({
  amount,
  label = "Support Me",
  className = "",
  showQr = false
}) {
  const channelId = import.meta.env.VITE_WHISH_CHANNEL_ID;
  if (!channelId) {
    console.warn("WhishDonateButton: REACT_APP_WHISH_CHANNEL_ID is not set");
    return null;
  }
  const url = new URL(`https://pay.whish.money/link/${channelId}`);
  if (amount) url.searchParams.set("amount", amount.toString());
  url.searchParams.set("ref", "portfolio");

  return (
    showQr ? (
      <img
        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url.toString())}`}
        alt="Whish QR Code"
        className={`rounded-lg ${className}`}
      />
    ) : (
      <button
        type="button"
        onClick={() => window.open(url.toString(), "_blank", "noopener noreferrer")}
        className={`flex-1 py-2.5 rounded-xl text-center text-xs font-extrabold uppercase tracking-wider bg-[var(--gradient-electric)] text-white hover:opacity-90 transition-all hover:shadow-md flex items-center justify-center gap-1.5 ${className}`}
      >
        <i className="bx bx-wallet text-base" /> {label}
      </button>
    )
  );
}

