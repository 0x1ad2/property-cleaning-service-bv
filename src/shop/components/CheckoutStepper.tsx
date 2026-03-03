import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  MapPin,
  Truck,
  ClipboardCheck,
  ArrowRight,
  ArrowLeft,
  Check,
  Package,
  PartyPopper,
} from "lucide-react";
import type {
  CustomerDetails,
  AddressDetails,
  DeliveryChoice,
  OrderConfirmation,
} from "../types";
import { DELIVERY_OPTIONS, TAX_RATE } from "../data";
import { formatPrice, generateOrderNumber } from "../utils";
import { useCartStore } from "../cartStore";
import { useShopStore } from "../shopStore";
import Modal from "./Modal";

const STEPS = [
  { id: 1, label: "Gegevens", icon: User },
  { id: 2, label: "Adres", icon: MapPin },
  { id: 3, label: "Bezorging", icon: Truck },
  { id: 4, label: "Overzicht", icon: ClipboardCheck },
];

export default function CheckoutStepper() {
  const isOpen = useShopStore((s) => s.isCheckoutOpen);
  const closeCheckout = useShopStore((s) => s.closeCheckout);
  const items = useCartStore((s) => s.items);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const clearCart = useCartStore((s) => s.clearCart);

  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState<CustomerDetails>({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [address, setAddress] = useState<AddressDetails>({
    street: "",
    zip: "",
    city: "",
    country: "Nederland",
  });
  const [delivery, setDelivery] = useState<DeliveryChoice>(DELIVERY_OPTIONS[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmation, setConfirmation] = useState<OrderConfirmation | null>(
    null,
  );

  const subtotal = getSubtotal();
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + delivery.cost;

  function validateStep(s: number): boolean {
    const errs: Record<string, string> = {};
    if (s === 1) {
      if (!customer.name.trim()) errs.name = "Naam is verplicht";
      if (!customer.email.trim()) errs.email = "E-mail is verplicht";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email))
        errs.email = "Ongeldig e-mailadres";
      if (!customer.phone.trim()) errs.phone = "Telefoonnummer is verplicht";
    }
    if (s === 2) {
      if (!address.street.trim()) errs.street = "Straatnaam is verplicht";
      if (!address.zip.trim()) errs.zip = "Postcode is verplicht";
      if (!address.city.trim()) errs.city = "Stad is verplicht";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function next() {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, 4));
    }
  }

  function prev() {
    setStep((s) => Math.max(s - 1, 1));
  }

  function placeOrder() {
    const order: OrderConfirmation = {
      orderNumber: generateOrderNumber(),
      order: {
        customer,
        address,
        delivery,
        items,
        subtotal,
        tax,
        deliveryCost: delivery.cost,
        total,
      },
      placedAt: new Date().toISOString(),
    };
    setConfirmation(order);
    clearCart();
  }

  function handleClose() {
    closeCheckout();
    setTimeout(() => {
      setStep(1);
      setCustomer({ name: "", email: "", phone: "", company: "" });
      setAddress({ street: "", zip: "", city: "", country: "Nederland" });
      setDelivery(DELIVERY_OPTIONS[0]);
      setErrors({});
      setConfirmation(null);
    }, 300);
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      title={confirmation ? undefined : "Afrekenen"}
      size="lg"
    >
      {confirmation ? (
        <ConfirmationScreen confirmation={confirmation} onClose={handleClose} />
      ) : (
        <div className="p-6">
          {/* Step indicator */}
          <div className="flex items-center justify-between mb-8">
            {STEPS.map((s, idx) => (
              <div key={s.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      step > s.id
                        ? "bg-success text-white"
                        : step === s.id
                          ? "bg-blue-700 text-white"
                          : "bg-background text-muted border border-border"
                    }`}
                  >
                    {step > s.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <s.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span
                    className={`text-xs mt-1.5 font-medium hidden sm:block ${
                      step >= s.id ? "text-strong" : "text-muted"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {idx < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-3 rounded-full transition-colors ${
                      step > s.id ? "bg-success" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {step === 1 && (
                <StepCustomer
                  customer={customer}
                  setCustomer={setCustomer}
                  errors={errors}
                />
              )}
              {step === 2 && (
                <StepAddress
                  address={address}
                  setAddress={setAddress}
                  errors={errors}
                />
              )}
              {step === 3 && (
                <StepDelivery delivery={delivery} setDelivery={setDelivery} />
              )}
              {step === 4 && (
                <StepReview
                  customer={customer}
                  address={address}
                  delivery={delivery}
                  items={items}
                  subtotal={subtotal}
                  tax={tax}
                  total={total}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <button
              onClick={step === 1 ? handleClose : prev}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-muted hover:text-strong border border-border rounded-lg hover:border-strong transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {step === 1 ? "Annuleren" : "Vorige"}
            </button>
            {step < 4 ? (
              <button
                onClick={next}
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors shadow-sm"
              >
                Volgende
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={placeOrder}
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold bg-success text-white rounded-lg hover:bg-green-600 transition-colors shadow-sm"
              >
                Bestelling Plaatsen
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}

/* ---------- Sub-components ---------- */

function FieldInput({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-strong mb-1.5"
      >
        {label} {required && <span className="text-error">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 text-sm rounded-lg border-2 outline-none transition-all ${
          error
            ? "border-error focus:border-error focus:ring-2 focus:ring-red-100"
            : "border-border focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
        }`}
      />
      {error && <p className="text-xs text-error mt-1">{error}</p>}
    </div>
  );
}

function StepCustomer({
  customer,
  setCustomer,
  errors,
}: {
  customer: CustomerDetails;
  setCustomer: (c: CustomerDetails) => void;
  errors: Record<string, string>;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-strong mb-1">Uw gegevens</h3>
      <p className="text-sm text-muted mb-4">
        Vul uw contactgegevens in voor de bestelling
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        <FieldInput
          label="Naam"
          name="name"
          value={customer.name}
          onChange={(v) => setCustomer({ ...customer, name: v })}
          error={errors.name}
          placeholder="Uw volledige naam"
          required
        />
        <FieldInput
          label="Bedrijf"
          name="company"
          value={customer.company}
          onChange={(v) => setCustomer({ ...customer, company: v })}
          placeholder="Bedrijfsnaam (optioneel)"
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <FieldInput
          label="E-mail"
          name="email"
          type="email"
          value={customer.email}
          onChange={(v) => setCustomer({ ...customer, email: v })}
          error={errors.email}
          placeholder="uw@email.nl"
          required
        />
        <FieldInput
          label="Telefoon"
          name="phone"
          type="tel"
          value={customer.phone}
          onChange={(v) => setCustomer({ ...customer, phone: v })}
          error={errors.phone}
          placeholder="+31 6 ..."
          required
        />
      </div>
    </div>
  );
}

function StepAddress({
  address,
  setAddress,
  errors,
}: {
  address: AddressDetails;
  setAddress: (a: AddressDetails) => void;
  errors: Record<string, string>;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-strong mb-1">Bezorgadres</h3>
      <p className="text-sm text-muted mb-4">
        Waar moeten wij uw bestelling bezorgen?
      </p>
      <FieldInput
        label="Straat + huisnummer"
        name="street"
        value={address.street}
        onChange={(v) => setAddress({ ...address, street: v })}
        error={errors.street}
        placeholder="Keizersgracht 123"
        required
      />
      <div className="grid sm:grid-cols-3 gap-4">
        <FieldInput
          label="Postcode"
          name="zip"
          value={address.zip}
          onChange={(v) => setAddress({ ...address, zip: v })}
          error={errors.zip}
          placeholder="1234 AB"
          required
        />
        <FieldInput
          label="Stad"
          name="city"
          value={address.city}
          onChange={(v) => setAddress({ ...address, city: v })}
          error={errors.city}
          placeholder="Amsterdam"
          required
        />
        <FieldInput
          label="Land"
          name="country"
          value={address.country}
          onChange={(v) => setAddress({ ...address, country: v })}
          placeholder="Nederland"
        />
      </div>
    </div>
  );
}

function StepDelivery({
  delivery,
  setDelivery,
}: {
  delivery: DeliveryChoice;
  setDelivery: (d: DeliveryChoice) => void;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-strong mb-1">Bezorgoptie</h3>
      <p className="text-sm text-muted mb-4">Kies uw gewenste bezorgmethode</p>
      <div className="space-y-3">
        {DELIVERY_OPTIONS.map((opt) => (
          <button
            key={opt.option}
            onClick={() => setDelivery(opt)}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
              delivery.option === opt.option
                ? "border-blue-700 bg-blue-50"
                : "border-border hover:border-blue-300"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                delivery.option === opt.option
                  ? "border-blue-700"
                  : "border-border"
              }`}
            >
              {delivery.option === opt.option && (
                <div className="w-2.5 h-2.5 rounded-full bg-blue-700" />
              )}
            </div>
            <Truck
              className={`w-5 h-5 shrink-0 ${
                delivery.option === opt.option ? "text-blue-700" : "text-muted"
              }`}
            />
            <div className="flex-1">
              <p className="font-semibold text-strong text-sm">{opt.label}</p>
              <p className="text-xs text-muted">{opt.estimate}</p>
            </div>
            <span className="font-bold text-strong text-sm">
              {formatPrice(opt.cost)}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-background rounded-xl border border-border">
        <p className="text-xs font-semibold text-strong mb-1">Betaalmethode</p>
        <p className="text-sm text-muted">
          Factuur — Betaling na ontvangst (netto 30 dagen)
        </p>
      </div>
    </div>
  );
}

function StepReview({
  customer,
  address,
  delivery,
  items,
  subtotal,
  tax,
  total,
}: {
  customer: CustomerDetails;
  address: AddressDetails;
  delivery: DeliveryChoice;
  items: {
    product: { name: string; image: string; price: number };
    quantity: number;
    variantId?: string;
  }[];
  subtotal: number;
  tax: number;
  total: number;
}) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-strong">Besteloverzicht</h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-4 bg-background rounded-xl">
          <p className="text-xs font-semibold text-muted mb-2 uppercase tracking-wider">
            Contactgegevens
          </p>
          <p className="text-sm font-medium text-strong">{customer.name}</p>
          {customer.company && (
            <p className="text-sm text-muted">{customer.company}</p>
          )}
          <p className="text-sm text-muted">{customer.email}</p>
          <p className="text-sm text-muted">{customer.phone}</p>
        </div>
        <div className="p-4 bg-background rounded-xl">
          <p className="text-xs font-semibold text-muted mb-2 uppercase tracking-wider">
            Bezorgadres
          </p>
          <p className="text-sm text-strong">{address.street}</p>
          <p className="text-sm text-muted">
            {address.zip} {address.city}
          </p>
          <p className="text-sm text-muted">{address.country}</p>
          <p className="text-xs text-blue-700 mt-1 font-medium">
            {delivery.label} ({delivery.estimate})
          </p>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-muted mb-3 uppercase tracking-wider">
          Producten ({items.length})
        </p>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {items.map((item) => (
            <div
              key={`${item.product.name}-${item.variantId ?? ""}`}
              className="flex items-center gap-3 p-2 bg-background rounded-lg"
            >
              <div className="w-10 h-10 rounded-md overflow-hidden bg-slate-800 shrink-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-strong truncate">
                  {item.product.name}
                </p>
              </div>
              <span className="text-xs text-muted">×{item.quantity}</span>
              <span className="text-sm font-semibold text-strong">
                {formatPrice(item.product.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted">Subtotaal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">BTW (21%)</span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Bezorging ({delivery.label})</span>
          <span className="font-medium">{formatPrice(delivery.cost)}</span>
        </div>
        <div className="flex justify-between text-base font-bold pt-2 border-t border-border">
          <span>Totaal</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}

function ConfirmationScreen({
  confirmation,
  onClose,
}: {
  confirmation: OrderConfirmation;
  onClose: () => void;
}) {
  return (
    <div className="p-8 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 15 }}
        className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center"
      >
        <PartyPopper className="w-10 h-10 text-success" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-strong mb-2">
          Bestelling Geplaatst!
        </h2>
        <p className="text-muted mb-6">
          Bedankt voor uw bestelling. U ontvangt een bevestiging per e-mail.
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-background rounded-lg border border-border mb-8">
          <Package className="w-4 h-4 text-muted" />
          <span className="text-sm font-mono font-bold text-strong">
            {confirmation.orderNumber}
          </span>
        </div>

        <div className="max-w-sm mx-auto text-left space-y-3 mb-8">
          <div className="flex justify-between text-sm">
            <span className="text-muted">Klant</span>
            <span className="font-medium text-strong">
              {confirmation.order.customer.name}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted">Bezorging</span>
            <span className="font-medium text-strong">
              {confirmation.order.delivery.label}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted">Betaling</span>
            <span className="font-medium text-strong">Factuur (netto 30)</span>
          </div>
          <div className="flex justify-between text-base font-bold pt-2 border-t border-border">
            <span>Totaal</span>
            <span>{formatPrice(confirmation.order.total)}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors shadow-md"
        >
          Verder Winkelen
        </button>
      </motion.div>
    </div>
  );
}
